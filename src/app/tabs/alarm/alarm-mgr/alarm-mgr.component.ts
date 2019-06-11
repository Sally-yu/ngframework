import { Component, OnInit } from '@angular/core';
import {AlarmService} from '../../../alarm.service';
@Component({
  selector: 'app-alarm-mgr',
  templateUrl: './alarm-mgr.component.html',
  styleUrls: ['./alarm-mgr.component.less']
})
export class AlarmMgrComponent implements OnInit {
  alarmList;
  loading = false;
  constructor(
    private alarmService :AlarmService
  ) { }
   //获取list数据
   getAlarmList() {
      this.loading = true;
      this.alarmService.alarmList().then(res => {
        this.alarmList = res;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }
  //查询
  rowSelected(name,attribute){
      console.log(name+attribute);
  }
  ngOnInit() {
    this.getAlarmList();
  }
}
