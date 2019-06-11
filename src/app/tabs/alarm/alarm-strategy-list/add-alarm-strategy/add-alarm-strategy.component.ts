import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AlarmService} from '../../../../alarm.service';
import {DeviceService} from '../../../../device.service';

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
  codeError = {
    unique: true,
    required: true,
  };
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.key === o2.key : o1 === o2);
  constructor(
    private deviceService: DeviceService,
    private alarmService :AlarmService
  ) { }
  submit() {
    if (this.codeError.required && this.codeError.unique) {
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

}
