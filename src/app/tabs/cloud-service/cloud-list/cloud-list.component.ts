import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import {NzMessageService, toBoolean} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SubscribeService} from '../../../services/subscribe-service/subscribe.service';


@Component({
  selector: 'app-cloud-list',
  templateUrl: './cloud-list.component.html',
  styleUrls: ['./cloud-list.component.less']
})
export class CloudListComponent implements OnInit,OnChanges {

  @Input() refresh;

  cloudDetail = false;
  option;
  currentIndex = 1;
  pageSize = 5;
  sizeOption = [5, 10, 25, 20];
  loading = false;

  searchValue:string;

  cloud= {
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
  };
  cloudList = [];//订阅客户端数组列表信息            


  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private SubscribeService:SubscribeService,
  ) {
  }


  editRow(serveraddress: string) {
    let data = JSON.parse(JSON.stringify(this.cloudList)).filter(t => t.serveraddress === serveraddress)[0];
    if(this.toBoolean(data.opcstate)){
      this.message.info('该服务在启动状态下禁止编辑');
      return 0;
    }else{
      this.cloud=this.toEditableobj(this.cloud,data);
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
  addNewOpcRow(){  
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
        this.cloudList = JSON.parse(JSON.stringify(this.cloudList)).filter(d => {
          return d.servername.indexOf(this.searchValue) >= 0 || d.servername.indexOf(this.searchValue) >= 0;
        });
        this.loading = false;
      }  
  }
  //刷新
  reFresh(){
    this.getServicelist();
  }

  getServicelist() {
    this.SubscribeService.getsubscribeList().then(res => {
      this.cloudList = res;
    },err => {
    });
  }
  // 删除
  remove(serveraddress: string) {
    this.SubscribeService.deleteSubscribe(serveraddress).then(res => {
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
    this.getServicelist();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }


}
