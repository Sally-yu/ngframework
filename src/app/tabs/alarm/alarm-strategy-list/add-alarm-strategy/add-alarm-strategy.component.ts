import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AlarmService} from '../../../../alarm.service';
import {DeviceService} from '../../../../device.service';
import {NgZorroAntdModule, NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-add-alarm-strategy',
  templateUrl: './add-alarm-strategy.component.html',
  styleUrls: ['./add-alarm-strategy.component.less']
})
export class AddAlarmStrategyComponent implements OnInit {
  @Input() option: string;
  @Input() alarmStg;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputElement') inputElement: ElementRef;

  loading = false;
  deviceList;
  tempLoading = false;
  codeRequired = true;
  nameRequired = true;
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.key === o2.key : o1 === o2);

  constructor(
    private deviceService: DeviceService,
    private alarmService: AlarmService,
    private message: NzMessageService,
  ) {
  }

  submit() {
    this.valide();
    if (this.codeRequired && this.nameRequired) {
      let data = JSON.parse(JSON.stringify(this.alarmStg));

      switch (this.option) {
        case 'new': //新增
          this.alarmService.addAlarmStg(data).then(res => {
            this.close();
          }, err => {

          });
          break;
        case 'edit':  //编辑
          this.alarmService.updateAlarmStg(data).then(res => {
            this.close();
          }, err => {

          });
          break;
        default:
          break;
      }
    } else {
      this.message.warning("请完善表单信息");
    }
  }

  getDevice() {
    this.tempLoading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      this.tempLoading = false;
    }, err => {
      this.tempLoading = false;
    });
  }

  close() {
    this.result.emit(true);
  }

  ngOnInit() {
    this.getDevice();
  }

  valide() {
    if (this.alarmStg.code) {
      this.codeRequired = true;
    } else {
      this.codeRequired = false;
    }
    if (this.alarmStg.name) {
      this.nameRequired = true;
    } else {
      this.nameRequired = false;
    }
  }
}
