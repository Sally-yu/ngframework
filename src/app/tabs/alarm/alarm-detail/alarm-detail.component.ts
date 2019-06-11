import { Component, OnInit } from '@angular/core';
import {AlarmService} from '../../../alarm.service';
@Component({
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.less']
})
export class AlarmDetailComponent implements OnInit {
  alarmList = [];
  alarmLists;
  loading = false;
  pageSize=8; //起始每页条数
  currentIndex=1;
  searchValue;

  //其实页数

  constructor(
    private alarmService :AlarmService
  ) { }

   //获取list数据
   getAlarmList() {
      this.loading = true;
      this.alarmService.alarmList().then(res => {
        this.alarmList = res;
        this.spliceViewList(this.alarmList);
        this.loading = false;
      }, err => {
        this.spliceViewList(this.alarmList);
        this.loading = false;
      });
  }
   //切换页码
   indexChange(n:number){
    this.currentIndex=n;
    this.spliceViewList(this.alarmList);
  }

  //切换每页条数
  sizeChange(n: number) {
    this.pageSize=n;
    this.spliceViewList(this.alarmList);
  }

  spliceViewList(list){
    this.alarmLists=JSON.parse(JSON.stringify(list)).splice((this.currentIndex-1)*this.pageSize,this.pageSize);
    console.log(this.alarmLists);
  }
  //查询
  rowSelected(name,attribute){
      console.log(name+attribute);
  }
  ngOnInit() {
    this.getAlarmList();
  }

}
