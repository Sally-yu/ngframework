import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../../alarm.service';
@Component({
  // 这个文件对应 -‘实时报警监控’模块
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.less']
})
export class AlarmDetailComponent implements OnInit {
  alarmList = [];
  alarmLists;
  loading = false;
  pageSize = 8; //起始每页条数
  currentIndex = 1;
  searchValue;

  //其实页数

  constructor(
    private alarmService: AlarmService
  ) { }

  //获取list数据
  getAlarmList() {
    // 将搜索框中数据清除
    this.searchValue = '';
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

  // 根据关键字进行搜索
  search() {
    this.loading = true;
    this.alarmService.alarmList().then(res => {
      this.alarmList = res;
      if (this.searchValue) {
        this.alarmList = JSON.parse(JSON.stringify(this.alarmList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.strategy.device.name.indexOf(this.searchValue) >= 0||d.strategy.attribute.name.indexOf(this.searchValue) >= 0;
        });
      }
      this.spliceViewList(this.alarmList);
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  //切换页码
  indexChange(n: number) {
    this.currentIndex = n;
    this.spliceViewList(this.alarmList);
  }

  //切换每页条数
  sizeChange(n: number) {
    this.pageSize = n;
    this.spliceViewList(this.alarmList);
  }

  spliceViewList(list) {
    this.alarmLists = JSON.parse(JSON.stringify(list)).splice((this.currentIndex - 1) * this.pageSize, this.pageSize);
  }

  ngOnInit() {
    this.getAlarmList();
  }

}
