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
  deviceList = [];
  searchValue;

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
    attrs: [],
  };
  option;
  currentIndex = 1;
  pageSize = 5;
  sizeOption = [5, 10, 25, 20];

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

  search() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      if (this.searchValue) {
        this.deviceList = JSON.parse(JSON.stringify(this.deviceList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.code.indexOf(this.searchValue) >= 0 || d.type.indexOf(this.searchValue) >= 0;
        });
      }
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
      this.getList();
    }
  }
}
