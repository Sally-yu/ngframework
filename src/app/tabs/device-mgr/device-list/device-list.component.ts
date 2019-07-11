import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeviceService} from '../../../device.service';
import {OpcService} from '../../../services/opc-service/opc.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less']
})
export class DeviceListComponent implements OnInit, OnChanges {

  @Input() flag;
  deviceDetail = false;
  loading = false;
  device;
  deviceList = [];
  searchValue;

  option;
  currentIndex = 1;
  pageSize = 10;
  sizeOption = [5, 10, 20, 50];

  constructor(
    private deviceService: DeviceService,
    private OpcService: OpcService,
    private message: NzMessageService,
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

  //同步设备列表
  synchro() {
    this.loading = true;
    this.OpcService.getserviceList().then(res => {
      var serviceList = res;
      serviceList.forEach(element => {
        this.OpcService.updateDevicelist(element).then(res => {

        }, err => {
          this.message.warning('同步失败');
          this.loading = true;
        });
      });
      this.getList();
      this.message.success('同步成功');
    }, err => {
      this.loading = false;
    });
  }

  add() {
    // this.device = JSON.parse(JSON.stringify(this.nullDevice));
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

  save(data: any) {
    this.loading = true;
    this.deviceService.updateDevice(data).then(res => {
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.deviceDetail) {
      this.getList();
    }
  }
}
