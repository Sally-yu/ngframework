import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../../device.service';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.less']
})
export class DeviceCardComponent implements OnInit {


  deviceList=[];
  loading=false;
  searchValue;
  group;
  pageSize=8; //起始每页条数
  currentIndex=1; //其实页数

  viewList;
  deviceDetail=false;
  option;
  device;

  nullDevice = {
    key: null,
    code: null,
    type: null,
    group: null,
    name: null,
    template: null,
    connect: null,
    interval: null,
    model: null,
    gps: null,
    phone: null,
    manufacturer: null,
    status: null,
    note: null,
    time: null,
    attrs:[],
  };

  //绑定list用，从deviceList中截取

  constructor(
    private deviceService:DeviceService,
  ) { }

  getList(){
    this.loading=true;
    this.deviceService.deviceList().then(res=>{
      this.deviceList=res;
      this.spliceViewList(this.deviceList);
      this.loading=false;
    },err=>{
      this.spliceViewList(this.deviceList);
      this.loading=false;
    })
  }

  //切换页码
  indexChange(n:number){
    this.currentIndex=n;
    this.spliceViewList(this.deviceList);
  }

  //切换每页条数
  sizeChange(n: number) {
    this.pageSize=n;
    this.spliceViewList(this.deviceList);
  }

  spliceViewList(list){
    this.viewList=JSON.parse(JSON.stringify(list)).splice((this.currentIndex-1)*this.pageSize,this.pageSize);
  }

  ngOnInit() {
    this.getList();
  }

  cancel($event: any) {
    if(event){
      this.deviceDetail=false;
      this.getList();
    }
  }

  add(){
    this.device=JSON.parse(JSON.stringify(this.nullDevice));
    this.option='new';
    this.deviceDetail=true;
  }

  edit(key:string){
    this.device=JSON.parse(JSON.stringify(this.deviceList)).filter(d=>d.key===key)[0];
    this.option='edit';
    this.deviceDetail=true;
  }
}
