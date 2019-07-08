import { Component, OnInit, OnChanges,SimpleChanges,Input,TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService,NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { DbMgrService } from '../../../services/db-mgr/db-mgr.service';
import {OpcService} from '../../../services/opc-service/opc.service';
import {Observable} from 'rxjs';
import {MonitorService} from '../../../services/monitor-service/monitor.service';

@Component({
  selector: 'app-cloud-image',
  templateUrl: './cloud-image.component.html',
  styleUrls: ['./cloud-image.component.less']
})
export class CloudImageComponent implements OnInit,OnChanges {

  @Input() refresh;

  cloudDetail = false;
  option;
  currentIndex = 1;
  pageSize = 5;
  sizeOption = [5, 10, 25, 20];
  dropdown: NzDropdownContextComponent;
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
    private nzDropdownService: NzDropdownService,
    private http: HttpClient,
    private message: NzMessageService,
    private DbMgrService: DbMgrService,
    private OpcService:OpcService,
    private MonitorService: MonitorService,
  ) {
  }
 // 右键创建菜单
 contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
  this.dropdown = this.nzDropdownService.create($event, template);
}
//启动
 startOPCServer(serveraddress:string) {
    this.dropdown.close();  //右键菜单关闭
    this.OpcService.startServer(serveraddress,this.serviceList,this.influxlist).then(res => {
      if(res){
        this.OpcService.updateService(res).then(res => {
          this.reFresh();
        }, err => {
        });
      }
    }); 
  }

  //停止
  stopOPCServer(serveraddress:string) {  
    this.dropdown.close();  //右键菜单关闭
    this.OpcService.stopServer(serveraddress,this.serviceList).then(res => {
      if(res){
        this.OpcService.updateService(res).then(res => {
          this.reFresh();
        }, err => {
        });
      }
    }); 
  }

  edit(serveraddress: string) {
    this.dropdown.close();  //右键菜单关闭
    let data = JSON.parse(JSON.stringify(this.serviceList)).filter(t => t.serveraddress === serveraddress)[0];
    if(this.toBoolean(data.opcstate)){
      this.message.info('该服务在启动状态下禁止编辑');
      return 0;
    }else{
      this.service=this.toEditableobj(this.service,data);
      this.option = 'edit';
      this.cloudDetail = true;
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
  add(){  
     this.option = 'new';
     this.cloudDetail = true;
  }
  cancel($event: any) {
    if (event) {
      this.cloudDetail = false;
      this.reFresh();
    }
  }

  search(){
    this.loading = true;
      if (this.searchValue) {
        this.serviceList = JSON.parse(JSON.stringify(this.serviceList)).filter(d => {
          return d.servername.indexOf(this.searchValue) >= 0 || d.servername.indexOf(this.searchValue) >= 0;
        });
        this.loading = false;
      }  
  }
  //刷新
  reFresh(){
    this.getServicelist();
    this.getDatabaselist();
  }

  //获取influx数据库配置信息列表
  getDatabaselist() {
    this.loading = true;
    this.DbMgrService.dbMgrList().then(res => {
      this.influxlist = JSON.parse(JSON.stringify(res)).filter(t => t.databasetype === "InfluxDB");
      this.loading = false;
    },err => {
      this.loading = false;
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
    // this.getDatabaselist();
    // this.getServicelist();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.dropdown.close();  //右键菜单关闭
    // this.ngOnInit();    
  }


}
