import { Component, OnInit } from '@angular/core';
import {NzMessageService, toBoolean} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DbMgrService } from '../../../services/db-mgr/db-mgr.service';
import {OpcService} from '../../../services/opc-service/opc.service';
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
//启动
 startOPCServer(id:string,serveraddress:string) {
    this.attrDisability(id,false);
    var attrstate=this.OpcService.startServer(serveraddress,this.serviceList,this.influxlist)
    if(attrstate){
      this.attrDisability(id,true);
    }
    this.reFresh();
  }

  //停止
  stopOPCServer(serveraddress:string) {
    $(this).removeAttr("onclick");
    this.OpcService.stopServer(serveraddress,this.serviceList);
    this.reFresh();
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
    this.getDatabaselist();
    this.getServicelist();
  }


}
