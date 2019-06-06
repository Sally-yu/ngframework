import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import * as uuid from 'uuid';
import {DeviceService} from '../../../../device.service';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.less']
})
export class TemplateDetailComponent implements OnInit {

  @Input() option: string;
  @Input() template;

  @Output() result: EventEmitter<any> = new EventEmitter();
  loading = false;

  newAtt = {
    key: null,
    name: null,
    code: null,
    unit: null,
    description: null,
    valuetype: null,
    sum: false
  };

  constructor(
    private message: NzMessageService,
    private deviceService: DeviceService,
  ) {
  }

  close() {
    this.result.emit(true);
  }

  ngOnInit() {
  }

  addAttr() {
    this.template.attrs = [...this.template.attrs, {
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
    this.template.attrs = this.template.attrs.filter(a => a.key != key);
  }

  submit() {
    let data=JSON.parse(JSON.stringify(this.template));
    switch (this.option) {
      case 'new':
        this.deviceService.newDeviceTemp(data).then(res => {
          if (res) {
            this.close();
          }
        }, err => {

        });
        break;
      case 'edit':
        this.deviceService.updateTemplate(data).then(res => {
          if (res) {
            this.close();
          }
        }, err => {

        });
        break;
      default:
        break;
    }

  }
}
