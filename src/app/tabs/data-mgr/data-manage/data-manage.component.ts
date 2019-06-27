import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { AjaxService } from '../../../services/ajax/ajax.service';
import { DbMgrService } from 'src/app/services/db-mgr/db-mgr.service';

@Component({
  selector: 'app-data-manage',
  templateUrl: './data-manage.component.html',
  styleUrls: ['./data-manage.component.less']
})
export class DataManageComponent implements OnInit {
  searchValue = ''; // 搜索框中的数据
  dataAll;  //获得的所有数据

  getinfluxUrl = this.ajax.getinfluxUrl;
  insertinfluxUrl = this.ajax.insertinfluxUrl;
  updateinfluxUrl = this.ajax.updateinfluxUrl;
  deleteinfluxUrl = this.ajax.deleteinfluxUrl;
  getopcUrl = this.ajax.getopcUrl;
  influxhandleUrl = this.ajax.influxhandleUrl;

  show: boolean = false;//不显示编辑界面
  dataSet = [];//数组列表信息
  editData = {
    "servername": "",
    "serverip": "",
    "database": "",
    "serverport": "",
    "databasetype": "时序数据库",
    "username": "admin",
    "password": "admin",
    "description": ""
  };//正在编辑的信息
  isAddnewRow: boolean;//是否是在添加新行
  indexOfdataSet: number;//数组索引号

  addNewDatabase() {
    this.editData = {
      "servername": "",
      "serverip": "",
      "database": "",
      "serverport": "",
      "databasetype": "时序数据库",
      "username": "admin",
      "password": "admin",
      "description": ""
    };//正在编辑的信息
    this.isAddnewRow = true;
    this.show = true;//显示抽屉
  }
  goback() {
    this.show = false;//显示列表主界面
    this.reFresh();
  }
  save() {
    var repeats = this.dataSet.filter(d => d.serverip === this.editData.serverip);
    if (this.isAddnewRow) {       //增加新行
      if (repeats.length !== 0) {   //检查IP地址唯一性
        this.message.create("error", `服务器IP与已存在重复`);
      } else {
        this.dataSet.push(this.editData);
        this.addDatabaselist(this.editData);
      }
    } else {                      //编辑已有行
      if (repeats.length > 1) {     //检查IP地址唯一性
        this.message.create("error", `服务器IP与已存在重复`);
      } else {
        this.dataSet[this.indexOfdataSet] = this.editData;
        this.editDatabaselist(this.dataSet[this.indexOfdataSet]);
      }
    }
  }
  //编辑
  editRow(serverip: string) {
    var cx = this.dataSet.filter(d => d.serverip === serverip);
    this.editData = cx[0];
    this.indexOfdataSet = this.dataSet.indexOf(this.editData);
    this.show = true;//显示抽屉界面
    this.isAddnewRow = false;
  }

  //删除
  deleteRow(serverip: string) {
    this.dataSet = this.dataSet.filter(d => d.serverip !== serverip);
    this.delDatabaselist(serverip);
  }
  //刷新
  reFresh() {
    this.searchValue = '';  // 搜索框内容清空
    this.getDatabaselist();
  }
  constructor(
    private ajax: AjaxService,
    private http: HttpClient,
    private message: NzMessageService,

    private dbMgrService: DbMgrService,
  ) { }

  ngOnInit() {
    this.getDatabaselist();
    // this.getDataconfig();
  }

  // 获取列表数据
  getDatabaselist() {
    // this.http.get(this.getinfluxUrl)
    //   .subscribe(data => {
    //     this.dataSet=JSON.parse(JSON.stringify(data));
    //   });

    // this.loading = true;
    this.dbMgrService.dbMgrList().then(res => {
      this.dataSet = res;
      this.dataAll = res;
      // this.loading = false;
    }, err => {
      // this.loading = false;
    });
  }

  // 搜索
  search(): any {
    this.dataSet = JSON.parse(JSON.stringify(this.dataAll)).filter(d => {
      return d.servername.indexOf(this.searchValue) >= 0;
    });
  }

  addDatabaselist(addData) {
    // this.http.post(this.insertinfluxUrl,addData)
    //   .subscribe(res => {
    //     this.goback();//显示列表主界面
    //   });

    this.dbMgrService.addDbMgr(addData).then(res => {
      this.goback();//显示列表主界面
    }, err => {
    })
  }
  editDatabaselist(addData) {
    // this.http.post(this.updateinfluxUrl,addData)
    //   .subscribe(res => {
    //     this.goback();//显示列表主界面
    //   });
    this.dbMgrService.updateDbMgr(addData).then(res => {
      this.goback();//显示列表主界面
    }, err => { })
  }
  delDatabaselist(serverip: string) {
    // console.log(serverip);
    // this.http.post(this.deleteinfluxUrl,{"serveraddress":serverip}).
    // subscribe(res => {
    //   this.goback();//显示列表主界面
    // });
    this.dbMgrService.deleteDbMgr(serverip).then(res => {
      this.goback();//显示列表主界面
    }, err => {

    })
  }


}
