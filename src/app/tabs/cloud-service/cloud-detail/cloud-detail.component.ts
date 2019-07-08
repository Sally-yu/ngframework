import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SubscribeService} from '../../../services/subscribe-service/subscribe.service';
import { DeviceService } from 'src/app/device.service';

@Component({
  selector: 'app-cloud-detail',
  templateUrl: './cloud-detail.component.html',
  styleUrls: ['./cloud-detail.component.less']
})
export class CloudDetailComponent implements OnInit {

  @Input() option: string;
  @Input() cloud;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();

  loading = false;
  destinationData = ['MQTT_TOPIC', 'ZMQ_TOPIC', 'IOTCORE_MQTT', 'AZURE_MQTT', 'REST_ENDPOINT'];
  fomartData = ['JSON', 'XML', 'CSV', 'SERIALIZED', 'IOTCORE_JSON', 'AZURE_JSON'];

  nullCloud= {
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
  deviceList;
  paramList;
  nameRequire = true;
  addrRequire = true;
  portRequire = true;
  topicRequire = true;
  deviceRequire= true;


  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private SubscribeService:SubscribeService,
    private deviceService: DeviceService,
  ) {
  }

  close() {
    this.result.emit(true);
  }

  //提交前验证
  validate() {
    if (this.cloud.name) {
      this.nameRequire = true;
    } else {
      this.nameRequire = false;
    }
    if (this.cloud.address) {
      this.addrRequire = true;
    } else {
      this.addrRequire = false;
    }
    if (this.cloud.port) {
      this.portRequire = true;
    } else {
      this.portRequire = false;
    }
    if (this.cloud.topic) {
      this.topicRequire = true;
    } else {
      this.topicRequire = false;
    }
    if (this.cloud.filter.device) {
      this.deviceRequire = true;
    } else {
      this.deviceRequire = false;
    }
  }
  //获取设备信息
  getList() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  
  deviceChange(device){
    if(device){
      this.deviceRequire=true;
      this.paramList=device.attrs;
    }else{
      this.deviceRequire=false;
      this.paramList=null;
    }
  }
  //提交保存
  submit() {
    this.loading = true;
    this.validate();
    if (this.nameRequire && this.addrRequire && this.portRequire && this.topicRequire) {

      let data = JSON.parse(JSON.stringify(this.cloud));
      switch (this.option) {
        case 'new': //新增
          this.SubscribeService.addSubscribe(data).then(res => {
            this.close();
            this.loading = false;
          }, err => {
            this.loading = false;
          });
          break;
        case 'edit':  //编辑
          this.SubscribeService.updateSubscribe(data).then(res => {
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

  ngOnInit() {
    if(this.option=='new'){
      this.cloud=JSON.parse(JSON.stringify(this.nullCloud));
    }
  }

}
