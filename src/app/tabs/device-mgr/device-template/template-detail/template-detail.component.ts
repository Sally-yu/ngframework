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

  codeRequired = true;
  nameRequired = true;

  constructor(
    private message: NzMessageService,
    private deviceService: DeviceService,
  ) {
  }

  close() {
    this.result.emit(true);
  }

  ngOnInit() {
    this.addNullAtt();
  }

  //添加设备属性
  addAttr() {
    this.template.attrs = [...this.template.attrs.filter(a => a.key != 'null'), {
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

  addNullAtt() {
    this.template.attrs = [...this.template.attrs, {
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
    this.template.attrs = this.template.attrs.filter(a => a.key != key);
  }

  validate() {
    this.codeRequired = this.template['code'] ? true : false;
    this.nameRequired = this.template['name'] ? true : false;
  }

  submit() {
    this.validate();
    if (this.codeRequired && this.nameRequired) {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.template));
      data['attrs'] = data['attrs'].filter(a => a.key != 'null');

      switch (this.option) {
        case 'new':
          this.deviceService.newDeviceTemp(data).then(res => {
            if (res) {
              this.close();
            }
          }, err => {
            this.loading = false;
          });
          break;
        case 'edit':
          this.deviceService.updateTemplate(data).then(res => {
            if (res) {
              this.close();
            }
          }, err => {
            this.loading = false;
          });
          break;
        default:
          this.loading = false;
          break;
      }
    }
  }
}
