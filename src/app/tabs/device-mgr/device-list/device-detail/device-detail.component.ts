import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DeviceService} from '../../../../device.service';
import * as uuid from 'uuid';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {NzMessageService} from 'ng-zorro-antd';

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

  nullDevice = {
    key: null,
    code: null,
    type: null,
    group: null,
    name: null,
    template: null,
    connect: null,
    interval: null,
    model: null,
    gps: null,
    phone: null,
    manufacturer: null,
    status: null,
    note: null,
    time: null,
    attrs:[],
  };

  timeUint = 'ms';
  t = 0;
  codeRequire = true;
  nameRequire = true;
  templateRequire = true;

  constructor(
    private message:NzMessageService,
    private deviceService: DeviceService,
  ) {
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.key === o2.key : o1 === o2);

  close() {
    this.result.emit(true);
  }

  //计算时间间隔显示值
  parseInterval() {
    this.t = this.device['interval'] ? JSON.parse(JSON.stringify(this.device))['interval'] : 0;
    if (this.t >= 1000 && this.t % 1000 == 0) {
      this.timeUint = 's';
      this.t = this.t / 1000;
      if (this.t >= 60 && this.t % 60 == 0) {
        this.timeUint = 'min';
        this.t = this.t / 60;
        if (this.t >= 60 && this.t % 60 == 0) {
          this.timeUint = 'h';
          this.t = this.t / 60;
          if (this.t >= 24 && this.t % 24 == 0) {
            this.timeUint = 'd';
            this.t = this.t / 24;
          }
        }
      }
    }
  }

  //提交前验证
  validate() {
    if (this.device.code) {
      this.codeRequire = true;
    } else {
      this.codeRequire = false;
    }
    if (this.device.name) {
      this.nameRequire = true;
    } else {
      this.nameRequire = false;
    }
    if (this.device.template) {
      this.templateRequire = true;
    } else {
      this.templateRequire = false;
    }
  }

  //提交保存
  submit() {
    this.loading = true;
    this.validate();
    if (this.codeRequire && this.nameRequire && this.templateRequire) {
      let data = JSON.parse(JSON.stringify(this.device));
      data.interval = JSON.parse(JSON.stringify(this.t));
      switch (this.timeUint) {
        case 'ms':
          break;
        case 's':
          data.interval = data.interval * 1000;
          break;
        case 'min':
          data.interval = data.interval * 1000 * 60;
          break;
        case 'h':
          data.interval = data.interval * 1000 * 60 * 60;
          break;
        case 'd':
          data.interval = data.interval * 1000 * 60 * 60 * 24;
          break;
        default:
          break;
      }
      data.interval = data.interval.toString();
      data.attrs=data.attrs.filter(a=>a.key!='null'); //去除添加尾行
      switch (this.option) {
        case 'new': //新增
          this.deviceService.newDevice(data).then(res => {
            this.close();
            this.loading = false;
          }, err => {
            this.loading = false;
          });
          break;
        case 'edit':  //编辑
          this.deviceService.updateDevice(data).then(res => {
            this.close();
            this.loading = false;
          }, err => {
            this.loading = false;
          });
          break;
        default:
          this.loading = false;
          break;
      }
    } else {
      this.loading = false;
    }
  }

  //重置设备属性
  reset() {
    if (this.option == 'new') {
      this.device = JSON.parse(JSON.stringify(this.nullDevice));
      this.addNullAtt();
    }
    if (this.option == 'edit') {
      this.loading = true;
      this.deviceService.findDeviceCode(this.device.code).then(res => {
        if (res['status']) {
          this.device = res['data'];
          this.loading = false;
          this.addNullAtt();
        }
        else {
          this.message.error('重置设备信息出错');
          this.loading=false;
          this.addNullAtt();
        }
      },err=>{
        this.message.error('重置设备信息出错');
        this.loading=false;
        this.addNullAtt();
      });
    }
    this.parseInterval();
  }

  //添加设备属性
  addAttr() {
    this.device.attrs = [...this.device.attrs.filter(a=>a.key!='null'), {
      key: uuid.v4(),
      name: null,
      code: null,
      unit: null,
      description: null,
      valuetype: null,
      sum: false
    }];
    this.addNullAtt();
  }

  addNullAtt(){
    this.device.attrs = [...this.device.attrs, {
      key: 'null',
      name: null,
      code: null,
      unit: null,
      description: null,
      valuetype: null,
      sum: false
    }];
  }

  //删除设备属性
  remove(key: any) {
    this.device.attrs = this.device.attrs.filter(a => a.key != key);
  }

  //获取模板列表
  getTemplate() {
    this.loading = true;
    this.deviceService.deviceTempList().then(res => {
      this.templateList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }


  templateChanged() {
    this.device.template ? this.templateRequire = true : this.templateRequire = false;
    this.device.attrs = this.device.template.attrs;
    this.addNullAtt();
  }

  //切换时间单位，计算显示值，暂时未处理尾差
  calcTime() {
    this.t = this.device['interval'] ? JSON.parse(JSON.stringify(this.device))['interval'] : 0;
    switch (this.timeUint) {
      case 'ms':
        break;
      case 's':
        this.t /= 1000;
        break;
      case 'min':
        this.t /= 60000;
        break;
      case 'h':
        this.t /= 3600000;
        break;
      case 'd':
        this.t /= 86400000;
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.getTemplate();
    this.parseInterval();
    this.addNullAtt();
  }

}
