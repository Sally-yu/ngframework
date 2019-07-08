import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import {NzMessageService, toBoolean} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SubscribeService} from '../../../services/subscribe-service/subscribe.service';

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
  loading = false;

  searchValue:string;

  cloud= {
      id: null,
      name: null,
      destination: 'MQTT_TOPIC',
      encryption: {},
      format: 'JSON',
      enable: false,
      address: null,
      port: 0,
      path: null,
      publisher: null,
      user: null,
      password: null,
      topic: null,
      baseURL: null,
      url: null,
      filter: {
          device: null,
          attribute:null
      }
  };
  cloudList = [];//订阅客户端数组列表信息            


  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private SubscribeService:SubscribeService,
  ) {
  }


  edit(id: string) {
    let data = JSON.parse(JSON.stringify(this.cloudList)).filter(t => t.id === id)[0];
    if(data.enable){
      this.message.info('该服务在启动状态下禁止编辑');
      return 0;
    }else{
      this.cloud=data;
      this.option = 'edit';
      this.cloudDetail = true;
    }    
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
        this.cloudList = JSON.parse(JSON.stringify(this.cloudList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.name.indexOf(this.searchValue) >= 0;
        });
        this.loading = false;
      }  
  }
  //刷新
  reFresh(){
    this.getCloudlist();
  }

  getCloudlist() {
    this.SubscribeService.getsubscribeList().then(res => {
      this.cloudList = res;
    },err => {
    });
  }
  // 删除
  remove(id: string) {
    this.SubscribeService.deleteSubscribe(id).then(res => {
      this.getCloudlist();
    },err => {
      this.getCloudlist();
    });  
  }
 

  ngOnInit() {
     this.getCloudlist();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }



}
