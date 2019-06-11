import { Component, OnInit } from '@angular/core';
import {AlarmService} from '../../../alarm.service';
@Component({
  selector: 'app-alarm-strategy-list',
  templateUrl: './alarm-strategy-list.component.html',
  styleUrls: ['./alarm-strategy-list.component.less']
})
export class AlarmStrategyListComponent implements OnInit {

  alarmStgDetail = false;
  loading = false;
  alarmStg;
  alarmStgList=[];

  nullAlarmStg = {
    key: null,
    name: null,
    code: null,
    time: null,
    device: null,
    attribute: null,
    conditiona: {"key":null,"value":null},
    conditionb: {"key":null,"value":null},
    level: null,
    interval: null,
    note: null
  };
  option;

  constructor(
    private alarmService :AlarmService
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.alarmService.alarmStgList().then(res => {
      this.alarmStgList = res;
      console.log(this.alarmStgList);
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  add() {
    this.alarmStg = JSON.parse(JSON.stringify(this.nullAlarmStg));
    this.option = 'new';
    this.alarmStgDetail = true;
  }

  remove(key: any) {
    this.alarmService.removeAlarmStg(key).then(res => {
      this.getList();
    }, err => {
      this.getList();
    });

  }

  edit(key: any) {
    this.alarmStg = JSON.parse(JSON.stringify(this.alarmStgList)).filter(t => t.key === key)[0];
    this.option = 'edit';
    this.alarmStgDetail = true;
  }

  cancel($event: any) {
    if (event) {
      this.alarmStgDetail = false;
    }
    this.getList();
  }
}
