import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd';
import { DbMgrService } from '../../../../services/db-mgr/db-mgr.service';

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
    if (this.serverIpRequired && this.serverNameRequired && this.databaseNameRequired) {
      let newData = JSON.parse(JSON.stringify(this.selectData));
      switch (this.option) {
        case 'add': //新增
          this.dbMgrService.addDbMgr(newData).then(res => {
            if(res['message'] == '-1'){
              this.message.error('服务器IP已经存在！')
            }else if(res['message'] == '1'){
              this.message.success('添加成功！');
              this.close();
            }
          }, err => {
          });
          // console.log('添加前的 this.dataAll = ', this.dataAll);
          // this.dataAll.push(newData);
          // console.log('添加后的 this.dataAll = ', this.dataAll);
          // this.close();
          break;
        case 'edit':  //编辑
          this.dbMgrService.updateDbMgr(newData).then(res => {
            // console.log('更新后的 this.dataAll = ',this.dataAll)
            this.close();
          }, err => {
          });
          // for (let keyout of this.dataAll) {
          //   if(keyout.servername == newData.servername){
          //     for( let key of keyout){
          //       for(let keyin of newData){
          //         if(key == keyin){
          //           keyout.key = newData.keyin;
          //         }
          //       }
          //     }
          //   }
          // }
          // console.log('*****之后的dataAll =',this.dataAll);
          // this.close();
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
    // 判断输入的“数据库名称”是否为空
    if (this.selectData.database) {
      this.databaseNameRequired = true;
    } else {
      this.databaseNameRequired = false;
    }
  }

  // 返回上一层
  close() {
    this.result.emit(true);
  }
}
