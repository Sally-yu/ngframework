import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../device.service';

@Component({
  selector: 'app-device-template',
  templateUrl: './device-template.component.html',
  styleUrls: ['./device-template.component.less']
})
export class DeviceTemplateComponent implements OnInit {

  loading = false;
  tempDetail = false;
  option = '';
  template;
  nullTemplate = {
    key: null,
    code: null,
    name: null,
    description: null,
    time: null,
    attrs: []
  };
  tempList = [];

  constructor(
    private deviceService: DeviceService,
  ) {
  }


  getList() {
    this.loading = true;
    this.deviceService.deviceTempList().then(res => {
      this.tempList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  add() {
    this.template = JSON.parse(JSON.stringify(this.nullTemplate));
    this.tempDetail = true;
    this.option = 'new';
  }

  remove(key: any) {
    this.loading = true;
    this.deviceService.removeTemp(key).then(res => {
      this.getList();
      this.loading = false;
    }, err => {
      this.getList();
      this.loading = false;
    });
  }

  cancel($event) {
    if (event) {
      this.tempDetail = false;
      this.getList();
    }
  }

  ngOnInit() {
    this.getList();
  }


  edit(key: any) {
    this.tempDetail = true;
    this.option = 'edit';
    this.template = JSON.parse(JSON.stringify(this.tempList.filter(t => t.key === key)[0]));
  }
}
