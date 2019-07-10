import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd';
import { DbMgrService } from '../../../services/db-mgr/db-mgr.service';

@Component({
  selector: 'app-add-db-mgr',
  templateUrl: './add-db-mgr.component.html',
  styleUrls: ['./add-db-mgr.component.less']
})
export class AddDbMgrComponent implements OnInit {
  @Input() parentCom;
  @Input() option;
  @Input() selectData;
  @Input() dataAll;
  @Output() result: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputElement') inputElement: ElementRef;

  loading = false;

  data = {
    servername: "",
    serverip: "",
    serverport: "",
    database: "",
    databasetype: "",
    username: "",
    password: "",
    description: ""
  }; //本组件的数据
  serverNameRequired = true;  // 服务器名称不为空
  serverIpRequired = true;  // 服务器IP不为空
  databaseNameRequired = true;  //数据库名称不为空
  databaseTypeRequired = true;  //数据库类型不为空


  constructor(
    // private fb: FormBuilder
    private message: NzMessageService,
    private dbMgrService: DbMgrService,
  ) { }

  ngOnInit() {
    // this.data = this.selectData;
  }

  // 保存
  submit() {
    this.valide();
    var repeats = this.dataAll.filter(d => d.serverip === this.selectData.serverip);
    if (this.serverIpRequired && this.serverNameRequired && this.databaseNameRequired && this.databaseTypeRequired) {
      let newData = JSON.parse(JSON.stringify(this.selectData));
      switch (this.option) {
        case 'add': //新增
          if (repeats.length !== 0) {   //检查IP地址唯一性
            this.message.create("error", `服务器IP与已存在重复`);
          } else {
            this.dbMgrService.addDbMgr(newData).then(res => {
              this.close();
              this.loading = false;
            }, err => {
              this.loading = false;
            });
          }
          break;
        case 'edit':  //编辑
          this.dbMgrService.updateDbMgr(newData).then(res => {
            this.close();
          }, err => {
          });
          break;
        default:
          break;
      }
    } else {
      this.message.warning("请完善表单信息");
    }
  }
  valide() {
    // 判断输入的“服务器IP”是否为空
    if (this.selectData.serverip) {
      this.serverIpRequired = true;
    } else {
      this.serverIpRequired = false;
    }
    // 判断输入的“服务器名称”是否为空
    if (this.selectData.servername) {
      this.serverNameRequired = true;
    } else {
      this.serverNameRequired = false;
    }
    // 判断输入的“服务器类型”是否为空
    if (this.selectData.databasetype) {
      this.databaseTypeRequired = true;
    } else {
      this.databaseTypeRequired = false;
    }
    // 判断输入的“数据库名称”是否为空
    // if (this.selectData.database) {
    //   this.databaseNameRequired = true;
    // } else {
    //   this.databaseNameRequired = false;
    // }
  }

  //重置数据库信息
  reset() {
    if (this.option == 'add') {
      this.selectData = JSON.parse(JSON.stringify(this.data));
      this.addNullData('', 'MongoDB');
    }
    if (this.option == 'edit') {
      this.loading = true;
      let ip = this.selectData.serverip;
      this.dbMgrService.findServerIp(this.selectData.serverip).then(res => {
        if (res['status']) {
          this.selectData = res['data'];
          this.loading = false;
          this.addNullData(ip, this.selectData.databasetype);
        } else {
          this.message.error('重置数据库信息出错');
          this.loading = false;
          this.addNullData(ip, this.selectData.databasetype);
        }
      }, err => {
        this.message.error('重置数据库信息出错');
        this.loading = false;
        this.addNullData(ip, this.selectData.databasetype);
      });
    }
  }

  addNullData(ip, dbType) {
    this.selectData = {
      servername: "",
      serverip: ip,
      serverport: "",
      database: "",
      databasetype: dbType,
      username: "",
      password: "",
      description: ""
    };
  }

  // 返回上一层
  close() {
    this.result.emit(true);
  }
}
