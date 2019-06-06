import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less']
})
export class DeviceListComponent implements OnInit {

  deviceDetail = false;
  loading = false;
  device;
  deviceList=[];

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
  option;

  constructor(
    private deviceService: DeviceService,
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  add() {
    this.device = JSON.parse(JSON.stringify(this.nullDevice));
    this.option = 'new';
    this.deviceDetail = true;
  }

  remove(key: any) {
    this.deviceService.removeDevice(key).then(res => {
      this.getList();
    }, err => {
      this.getList();
    });

  }

  edit(key: any) {
    this.device = JSON.parse(JSON.stringify(this.deviceList)).filter(t => t.key === key)[0];
    this.option = 'edit';
    this.deviceDetail = true;
  }

  cancel($event: any) {
    if (event) {
      this.deviceDetail = false;
    }
    this.getList();
  }
}
