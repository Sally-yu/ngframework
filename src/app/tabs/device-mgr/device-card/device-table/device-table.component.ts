import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceService} from '../../../../device.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.less']
})
export class DeviceTableComponent implements OnInit {

  @Input() device;
  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor(
    private deviceService:DeviceService,
    private message:NzMessageService,
  ) { }


  //初始化方法
  ngOnInit() {
    console.log(this.device);
  }

  //关闭图表应用
  close(){
    this.result.emit(true);
  }

}
