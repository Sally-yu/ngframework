import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DeviceService} from '../../../../device.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
export class DeviceDetailComponent implements OnInit {

  @Input() option: string;
  @Input() device;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();

  @ViewChild('inputElement') inputElement: ElementRef;

  loading = false;
  templateList;
  tempLoading = false;

  timeUint = 'ms';
  t=0;

  constructor(
    private deviceService: DeviceService,
  ) {
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.key === o2.key : o1 === o2);


  close() {
    this.result.emit(true);
  }

  ngOnInit() {
    this.getTemplate();
    this.t = JSON.parse(JSON.stringify(this.device))['interval'];
    if (this.t > 1000&&this.t%1000==0) {
      this.timeUint = 's';
      this.t = this.t / 1000;
      if (this.t > 60&&this.t%60==0) {
        this.timeUint = 'min';
        this.t = this.t / 60;
        if (this.t > 60&&this.t%60==0) {
          this.timeUint = 'h';
          this.t = this.t / 60;
          if (this.t > 24&&this.t%24==0) {
            this.timeUint = 'd';
            this.t = this.t / 24;
          }
        }
      }
    }
  }

  submit() {
    let data = JSON.parse(JSON.stringify(this.device));
    data.attrs = data.template['attrs'];
    switch (this.timeUint) {
      case 'ms':
        data.interval = this.t;
        break;
      case 's':
        data.interval = this.t * 10000;
        break;
      case 'min':
        data.interval = this.t * 1000 * 60;
        break;
      case 'h':
        data.interval = this.t * 1000 * 60 * 60;
        break;
      case 'd':
        data.interval = this.t * 1000 * 60 * 60 * 24;
        break;
      default:
        data.interval = this.t;
        break;
    }
    // data.interval = data.interval.toString();
    switch (this.option) {
      case 'new': //新增
        this.deviceService.newDevice(data).then(res => {
          this.close();
        }, err => {

        });
        break;
      case 'edit':  //编辑
        this.deviceService.updateDevice(data).then(res => {
          this.close();
        }, err => {

        });
        break;
      default:
        break;
    }

  }

  reset() {
    this.device.template.attrs = JSON.parse(JSON.stringify(this.device.attrs));
  }

  addAttr() {
    this.device.template.attrs = [...this.device.template.attrs, {
      key: uuid.v4(),
      name: null,
      code: null,
      unit: null,
      description: null,
      valuetype: null,
      sum: false
    }];
  }

  remove(key: any) {
    this.device.template.attrs = this.device.template.attrs.filter(a => a.key != key);
  }

  getTemplate() {
    this.tempLoading = true;
    this.deviceService.deviceTempList().then(res => {
      this.templateList = res;
      this.tempLoading = false;
    }, err => {
      this.tempLoading = false;
    });
  }

  getGroup() {

  }
}
