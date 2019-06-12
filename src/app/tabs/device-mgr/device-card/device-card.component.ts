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
  pageSize=9; //起始每页条数
  currentIndex=1; //其实页数

  viewList;
  deviceDetail=false;
  deviceTable=false;
  option;
  device;

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
      this.deviceTable=false;
      this.getList();
    }
  }

  search(){
    this.loading=true;
    this.deviceService.deviceList().then(res=>{
      this.deviceList=res;
      if (this.searchValue){
        this.deviceList=JSON.parse(JSON.stringify(this.deviceList)).filter(d=>{
          return d.name.indexOf(this.searchValue)>=0||d.code.indexOf(this.searchValue)>=0||d.model.indexOf(this.searchValue)>=0||d.manufacturer.indexOf(this.searchValue)>=0||d.note.indexOf(this.searchValue)>=0
        })
      }
      this.spliceViewList(this.deviceList);
      this.loading=false;
    },err=>{
      this.spliceViewList(this.deviceList);
      this.loading=false;
    })

  }

  add(){
    // this.device=JSON.parse(JSON.stringify(this.nullDevice));
    this.option='new';
    this.deviceDetail=true;
  }

  edit(key:string){
    this.device=JSON.parse(JSON.stringify(this.deviceList)).filter(d=>d.key===key)[0];
    this.option='edit';
    this.deviceDetail=true;
  }

  toTable(key:string){
    this.device=JSON.parse(JSON.stringify(this.deviceList)).filter(d=>d.key===key)[0];
    this.deviceTable=true;
  }

  //控制显示属性参数
  display(item: any) {
    return item.attrs.filter(a=>a.display);
  }
}
