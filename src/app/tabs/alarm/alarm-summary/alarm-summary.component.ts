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
  selectEditData;//选中要编辑的数据
  editFlag = false;//编辑标志
  option;//编辑或者是添加的标记


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

  //编辑or预览
  editOrPreview(deviceid, e) {
    this.selectEditData = JSON.parse(JSON.stringify(this.alarmJson)).filter(t => t.deviceid === deviceid);
    this.editFlag = true;
    if(e === 'edit'){
      this.option = 'edit';
    }else if(e === 'preview'){
      this.option = 'preview';
    }
  }
  // 搜索
  search(){
    this.loading = true;
    this.alarmService.alarmList().then(res => {
      this.alarmList = res;
      for (var a of this.alarmList) {
        if (this.searchValue) {
          
          // this.alarmList = JSON.parse(JSON.stringify(this.alarmList)).filter(d => {
          //   // return d.name.indexOf(this.searchValue) >= 0 || d.strategy.device.name.indexOf(this.searchValue) >= 0||d.strategy.attribute.name.indexOf(this.searchValue) >= 0;
          //   return d.strategy.device.name.indexOf(this.searchValue) >= 0;
          // });
        }
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  
  cancel($event: any) {
    if (event) {
      this.editFlag = false;
    }
    this.getAlarmList();
  }


  ngOnInit() {
    this.getAlarmList();
  }
}
