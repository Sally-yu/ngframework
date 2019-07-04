import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DbMgrService } from '../../../services/db-mgr/db-mgr.service';
import {OpcService} from '../../../services/opc-service/opc.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.less']
})
export class ServiceDetailComponent implements OnInit {

  @Input() option: string;
  @Input() service;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();

  loading = false;


  nullService = {
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
  };
  servernames = ["opcda://10.25.11.197/KEPware.KEPServerEx.V4"];
  collectFrq = [
    '100', '300', '500', '800', '1000', '1500'
  ];
  influxlist = [];//时序数据库数组列表信息
  removestate:boolean=false;//判断是否显示删除数据库按钮
  addstate:boolean=false;//判断是否显示添加数据库按钮
  nameRequire = true;
  addrRequire = true;
  portRequire = true;
  hostRequire = true;
  opchandleUrl=this.OpcService.opchandleUrl;


  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private DbMgrService: DbMgrService,
    private OpcService:OpcService,
  ) {
  }

  close() {
    this.result.emit(true);
  }
  addInput() {//集群部署时添加从数据库
    var number;
    if(this.service.login==null){
      number=2;
      this.removestate=false;
    }else{
      this.removestate=true;
      number = this.service.login.length + 2;
    }
    this.service.login.push({"name":"从数据库"+number,"id":number});
    if((this.service.login.length+2)<this.influxlist.length){
      this.addstate=true;
    }
    else{
      this.addstate=false;
    }
  }
  removeInput() {//集群部署时删除从数据库
      let i = this.service.login.length-1;
      this.service.servergroup.splice(i-1, 1);
      this.service.login.splice(i, 1);
      if(i>0){
        this.removestate=true;
      }else{
        this.removestate=false;
      }
      if((this.service.login.length+2)<this.influxlist.length){
        this.addstate=true;
      }
      else{
        this.addstate=false;
      }
  }
  isNotSelected(servername,node){//判断下拉选项是否已被选中，排除已选项
    if(servername===node){
      return true;
    }else{
      return this.service.servergroup.indexOf(node) === -1;
    }
  }
  strategyChange(strategy){//时序数据库策略发生改变时
    this.service.servergroup.length=0;
    if(strategy==="集群版部署" && this.influxlist.length>2){
      this.addstate=true;
    }
  }

  //查找服务器名称
  searchopcserver() {
    var data = new FormData();
    var opcHandleUrl;
    data.append('opcip',  this.service.opchost);
    data.append('opctype', this.service.opctype);
    data.append('opcaction', 'recognition');
    opcHandleUrl="http://"+this.service.opchost+":"+this.service.serverport+this.opchandleUrl;
    this.http.post(opcHandleUrl, data, {responseType: 'text'}).subscribe(res => {
      console.log(res);
      this.service.serverurl = '';
      this.servernames = [];
      this.servernames=JSON.parse(res);
      this.service.serverurl = this.servernames[0];
 
    }),error1=>{
      this.message.warning(error1.error);
    };
  }


  //获取influx数据库配置信息列表
  getDatabaselist() {
    this.loading = true;
    this.DbMgrService.dbMgrList().then(res => {
      this.influxlist = res;
      // console.log('1、',this.dataAll)
      this.loading = false;
    },err => {
      this.loading = false;
    });
  }
  //提交前验证
  validate() {
    if (this.service.servername) {
      this.nameRequire = true;
    } else {
      this.nameRequire = false;
    }
    if (this.service.serveraddress) {
      this.addrRequire = true;
    } else {
      this.addrRequire = false;
    }
    if (this.service.serverport) {
      this.portRequire = true;
    } else {
      this.portRequire = false;
    }
    if (this.service.opchost) {
      this.hostRequire = true;
    } else {
      this.hostRequire = false;
    }
  }

  //提交保存
  submit() {
    this.loading = true;
    var saveobj={ 
      servername: "",
      serveraddress: "",
      serverport: "", 
      serverlocation: "", 
      description:"", 
      opcstate: "", 
      opctype: "", 
      opchost: "",
      serverurl: "",
      interval: "",
      savestrategy:"",
      servergroup: "",
      login: ""   };          
    this.validate();
    if (this.nameRequire && this.addrRequire && this.portRequire && this.hostRequire) {
      saveobj=this.toSaveableobj(saveobj,this.service);
      let data = JSON.parse(JSON.stringify(saveobj));
      switch (this.option) {
        case 'new': //新增
          this.OpcService.addService(data).then(res => {
            this.close();
            this.loading = false;
          }, err => {
            this.loading = false;
          });
          break;
        case 'edit':  //编辑
          this.OpcService.updateService(data).then(res => {
            this.close();
            this.loading = false;
          }, err => {
            this.loading = false;
          });
          break;
        default:
          this.loading = false;
          break;
      }
    } else {
      this.loading = false;
    }
  }

  //将可编辑对象转化为可存储到mongo对象
  toSaveableobj(reobj,obj){
    Object.keys(obj).forEach(function(key){
      if(key==="servergroup"|| key==="login"){
        reobj[key]=JSON.stringify(obj[key]);
      }else{
        reobj[key]=obj[key];
      }
    });
    return reobj;
  }
  ngOnInit() {
    if(this.option=='new'){
      this.service=JSON.parse(JSON.stringify(this.nullService));
    }else{
      this.servernames[0]=this.service.serverurl;
      if(this.service.login.length>0){
        this.removestate=true;
      }
      if(this.service.servergroup.length<this.influxlist.length){
        this.addstate=true;
      }  
    }
    this.getDatabaselist();
  }

}
