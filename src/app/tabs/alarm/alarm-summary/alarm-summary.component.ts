import {Component, OnInit} from '@angular/core';
import {AlarmService} from '../../../alarm.service';

@Component({
  selector: 'app-alarm-summary',
  templateUrl: './alarm-summary.component.html',
  styleUrls: ['./alarm-summary.component.less']
})
export class AlarmSummaryComponent implements OnInit {
  alarmList;
  alarmJson;
  deviceidList;
  loading = false;
  searchValue;

  constructor(
    private alarmService: AlarmService
  ) {
  }

  //获取list数据
  getAlarmList() {
    this.alarmJson = new Array;
    this.deviceidList = new Array;
    this.loading = true;
    this.alarmService.alarmList().then(res => {
      this.alarmList = res;
      for (var a of this.alarmList) {
        if (this.deviceidList.indexOf(a.strategy.device.key) == -1) {
          this.alarmJson = [...this.alarmJson, {
            devicename: a.strategy.device.name,
            deviceid: a.strategy.device.key,
            sum: 1,
            timesum: a.duration
          }];
          this.deviceidList = [...this.deviceidList, a.strategy.device.key];
        } else {
          for (var b in this.alarmJson) {
            if (this.alarmJson[b].deviceid == a.strategy.device.key) {
              this.alarmJson[b].sum += 1;
              this.alarmJson[b].timesum += a.duration;
            }
          }
        }
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  //查询
  rowSelected(name, attribute) {
    console.log(name + attribute);
  }


  ngOnInit() {
    this.getAlarmList();
  }

  search() {
    this.alarmJson = new Array;
    this.deviceidList = new Array;
    this.loading = true;
    this.alarmService.alarmList().then(res => {
      this.alarmList = res;
      for (var a of this.alarmList) {
        if (this.deviceidList.indexOf(a.strategy.device.key) == -1) {
          this.alarmJson = [...this.alarmJson, {
            devicename: a.strategy.device.name,
            deviceid: a.strategy.device.key,
            sum: 1,
            timesum: a.duration
          }];
          this.deviceidList = [...this.deviceidList, a.strategy.device.key];
        } else {
          for (var b in this.alarmJson) {
            if (this.alarmJson[b].deviceid == a.strategy.device.key) {
              this.alarmJson[b].sum += 1;
              this.alarmJson[b].timesum += a.duration;
            }
          }
        }
      }
      if(this.searchValue){
        this.alarmJson=this.alarmJson.filter(a=>{
          return a.devicename.indexOf(this.searchValue)>=0;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
}
