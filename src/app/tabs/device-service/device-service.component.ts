import { Component, OnInit } from '@angular/core';
import {NzMessageService, toBoolean} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DbMgrService } from '../../services/db-mgr/db-mgr.service';
import {OpcService} from '../../services/opc-service/opc.service';
declare var $:any;
@Component({
  selector: 'app-device-service',
  templateUrl: './device-service.component.html',
  styleUrls: ['./device-service.component.less']
})
export class DeviceServiceComponent implements OnInit {

  serviceDetail = false;
  option;
  currentIndex = 1;
  pageSize = 5;
  sizeOption = [5, 10, 25, 20];

  show:boolean = true;//显示列表主界面
  loading = false;
  servername:string;
  searchValue:string;
  removestate:boolean=false;//判断是否显示删除数据库按钮
  addstate:boolean=false;//判断是否显示添加数据库按钮
  opchandleUrl=this.OpcService.opchandleUrl;
  influxhandleUrl=this.OpcService.influxhandleUrl;
  collectFrq = [
    '100', '300', '500', '800', '1000', '1500'
  ];
  servernames = ["opcda://10.25.11.197/KEPware.KEPServerEx.V4"];
  influxlist = [];//时序数据库数组列表信息
  service= {
    id: null,
    servername: "",
    serveraddress: "", 
    serverlocation: "", 
    serverport: "",
    description:"",
    opcstate:   "false",
    opctype:    "DA",
    opchost:    "",
    serverurl:  "",
    interval:     "100",
    savestrategy:  "单机版部署",
    servergroup:   [],
    login:         []   
  };;
  serviceList = [];//opc客户端数组列表信息            

  isAddnewRow:boolean;//是否是在添加新行
  indexOfdataSet:number;//数组索引号

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private DbMgrService: DbMgrService,
    private OpcService:OpcService,
  ) {
  }
  //为a标签禁止 or 开启 点击事件
  attrDisability(id:string,state){
    if(state){
      $("#"+id).attr("disabled",false).css("pointer-events","auto"); 
      $("#"+id).css({ opacity: 1});
    }else{
      $("#"+id).attr("disabled",true).css("pointer-events","none");
      $("#"+id).css({ opacity: 0.2});
    }
  }
 // //启动
 startOPCServer(id:string,serveraddress:string) {
    this.attrDisability(id,false);
    var saveobj=this.serviceList.filter(d => d.serveraddress === serveraddress);
    var servername=JSON.parse(saveobj[0].servergroup)[0];
    var influx=this.influxlist.filter(d => d.servername === servername)
    var opcaction = 'startcollect';
    var data = new FormData();
    data.append('opctype', saveobj[0].opctype);
    data.append('opcip', saveobj[0].opchost)
    data.append('serverurl', saveobj[0].serverurl);
    data.append('frequency', saveobj[0].interval);
    data.append('opcaction', opcaction);
    data.append('inhost', influx[0].serverip);
    data.append('inport', influx[0].serverport);
    data.append('username', influx[0].username);
    data.append('password', influx[0].password);
    data.append('database', influx[0].database);
    var opcHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.opchandleUrl;
    var influxHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.influxhandleUrl;
    this.http.post(influxHandleUrl, data, {responseType: 'text'}).subscribe(res => {
      var state=res.search("连接错误") != -1 ;
      if(state){
        this.message.info(res);
        this.attrDisability(id,true);
      }else{
        this.http.post(opcHandleUrl, data, {responseType: 'text'}).subscribe(res => {
              if (res.indexOf('Error') > -1 || res.indexOf('Exception') > -1) {   //后端代码内部报错也返回200，会在请求成功的结果中
                this.message.warning('启动失败');
                this.attrDisability(id,true);
              } else {
                this.message.success(res);
                saveobj[0].opcstate="true";//应设置状态变化
                this.OpcService.updateService(saveobj[0]).then(res => {
                  //this.message.success(res);
                }, err => {
                  this.message.warning("写入失败");
                });   
              }
            }, error1 => {
              this.attrDisability(id,true);
              this.message.warning('启动失败', error1.error);
            });
      }
  
    }, error1 => {
      this.message.warning('数据库连接出错');
      this.attrDisability(id,true);
    });
   
  }

  //停止
  stopOPCServer(serveraddress:string) {
    $(this).removeAttr("onclick");
    var saveobj=this.serviceList.filter(d => d.serveraddress === serveraddress);
    var opcaction = 'stopcollect';
    var data = new FormData();
    data.append('opcaction', opcaction);
    var opcHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.opchandleUrl;
    this.http.post(opcHandleUrl, data, {responseType: 'text'}).subscribe(res => {
      if (res.indexOf('Error') > -1 || res.indexOf('Exception') > -1) {   //后端代码内部报错也返回200，会在请求成功的结果中
        this.message.warning('停止失败');
      } else {
        this.message.success(res);
        saveobj[0].opcstate="false";//应设置状态变化
        this.OpcService.updateService(saveobj[0]).then(res => {
          //this.message.success(res);
        }, err => {
          this.message.warning("写入失败");
        });   
      }
    }, error1 => {
      this.message.warning('停止失败', error1.error);
    });
  }
  editRow(serveraddress: string) {
    
    let data = JSON.parse(JSON.stringify(this.serviceList)).filter(t => t.serveraddress === serveraddress)[0];
    if(this.toBoolean(data.opcstate)){
      this.message.info('该服务在启动状态下禁止编辑');
      return 0;
    }else{
      this.service=this.toEditableobj(this.service,data);
      this.option = 'edit';
      this.serviceDetail = true;
    }    
  }
    //将数据库取出对象转化为可编辑对象
    toEditableobj(reobj,obj){
      Object.keys(obj).forEach(function(key){
        if(key==="servergroup"|| key==="login"){
          reobj[key]=JSON.parse(obj[key]);
        }else{
          reobj[key]=obj[key];
        }
      });
      return reobj;
    }
  addNewOpcRow(){  
     this.option = 'new';
     this.serviceDetail = true;
  }
  cancel($event: any) {
    if (event) {
      this.serviceDetail = false;
      this.reFresh();
    }
  }

  search(){
    this.loading = true;
      if (this.searchValue) {
        this.serviceList = JSON.parse(JSON.stringify(this.serviceList)).filter(d => {
          return d.servername.indexOf(this.searchValue) >= 0 || d.serveraddress.indexOf(this.searchValue) >= 0;
        });
        this.loading = false;
      }  
  }
  //刷新
  reFresh(){
    this.getServicelist();
  }

  getDatabaselist() {
    this.DbMgrService.dbMgrList().then(res => {
      this.influxlist = res;
    },err => {
    });
  }
  getServicelist() {
    this.OpcService.getserviceList().then(res => {
      this.serviceList = res;
    },err => {
    });
  }
  // 删除
  remove(serveraddress: string) {
    this.OpcService.deleteService(serveraddress).then(res => {
      this.getServicelist();
    },err => {
      this.getServicelist();
    });  
  }
 
  //将字符串转为bool变量
  toBoolean(state:string){
    return eval(state.toLowerCase());
  }

  ngOnInit() {
    //this.getDatabaselist();
    this.getServicelist();
  }


}
