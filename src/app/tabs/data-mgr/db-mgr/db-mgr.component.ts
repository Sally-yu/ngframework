import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { AjaxService } from '../../../services/ajax/ajax.service';
import { DbMgrService } from '../../../services/db-mgr/db-mgr.service';

@Component({
  selector: 'app-db-mgr',
  templateUrl: './db-mgr.component.html',
  styleUrls: ['./db-mgr.component.less']
})


export class DbMgrComponent implements OnInit {
  getinfluxUrl = this.ajax.getinfluxUrl;
  dataAll;   // 所有数据
  data = [];//数组列表信息
  searchValue = '';  // 搜索条件
  selectData = '';  // 被选择的数据
  addFlag = false;  //添加功能的标志位
  loading = false;

  option = '';  //查看、新增和编辑的标志位

  dropdown: NzDropdownContextComponent;
  // actived node
  // activedNode: NzTreeNode;

  nullData = {
    servername: "",
    serverip: "",
    serverport: "",
    database: "",
    databasetype: "",
    username: "",
    password: "",
    description: ""
  };

  // 模拟数据
  // dataAll = [
  //   {
  //     servername: "服务器 1",
  //     serverip: "10.25.12.11",
  //     serverport: "8000",
  //     database: "mySQL",
  //     databasetype: "时序数据库",
  //     username: "admin",
  //     password: "admin",
  //     description: ""
  //   },
  //   {
  //     servername: "服务器 2",
  //     serverip: "10.25.12.12",
  //     serverport: "8001",
  //     database: "mySQL",
  //     databasetype: "关系数据库",
  //     username: "test",
  //     password: "test",
  //     description: ""
  //   },
  //   {
  //     servername: '服务器 3',
  //     serverip: "10.25.12.13",
  //     database: "Oracle",
  //     serverport: "8002",
  //     databasetype: "文档数据库",
  //     username: "admin",
  //     password: "admin",
  //     description: ""
  //   },
  //   {
  //     servername: '服务器 4',
  //     serverip: "10.25.12.14",
  //     database: "瀚高",
  //     serverport: "4000",
  //     databasetype: "时序数据库",
  //     username: "admin",
  //     password: "admin",
  //     description: ""
  //   },
  //   {
  //     servername: '服务器 5',
  //     serverip: "10.25.12.15",
  //     database: "Postgres",
  //     serverport: "8080",
  //     databasetype: "关系数据库",
  //     username: "wzq",
  //     password: "wzq",
  //     description: ""
  //   },
  //   {
  //     servername: '服务器 6',
  //     serverip: "10.25.12.16",
  //     database: "MySQL",
  //     serverport: "8000",
  //     databasetype: "文档数据库",
  //     username: "test",
  //     password: "test",
  //     description: ""
  //   }, {
  //     servername: '服务器 7',
  //     serverip: "10.25.12.17",
  //     database: "MySQL",
  //     serverport: "9001",
  //     databasetype: "时序数据库",
  //     username: "admin1",
  //     password: "admin1",
  //     description: ""
  //   },
  //   {
  //     servername: '服务器 8',
  //     serverip: "10.25.12.18",
  //     database: "Oracle",
  //     serverport: "8002",
  //     databasetype: "关系数据库",
  //     username: "admin2",
  //     password: "admin2",
  //     description: ""
  //   },
  //   {
  //     servername: "服务器 9",
  //     serverip: "10.25.12.19",
  //     database: "Oracle",
  //     serverport: "4040",
  //     databasetype: "文档数据库",
  //     username: "admin3",
  //     password: "admin3",
  //     description: ""
  //   },
  //   {
  //     servername: "服务器 10",
  //     serverip: "10.25.12.20",
  //     database: "PostgreSQL",
  //     serverport: "8000",
  //     databasetype: "时序数据库",
  //     username: "admin4",
  //     password: "admin4",
  //     description: ""
  //   },

  // ];

  constructor(
    private nzDropdownService: NzDropdownService,
    private ajax: AjaxService,
    private http: HttpClient,
    private message: NzMessageService,
    private dbMgrService: DbMgrService,
    ) { }

  // 初始化
  ngOnInit() {
    this.getDatabaselist();
  }
  getDatabaselist() {
    this.loading = true;
    this.dbMgrService.dbMgrList().then(res => {
      this.dataAll = res;
      // console.log('1、',this.dataAll)
      this.loading = false;
    },err => {
      this.loading = false;
    });

  }
  // 搜索
  search() {
    this.loading = true;
    this.dbMgrService.dbMgrList().then(res => {
      this.dataAll = res;
      if(this.searchValue){
        this.dataAll = JSON.parse(JSON.stringify(this.dataAll)).filter(d => {
          return d.servername.indexOf(this.searchValue) >= 0;
        });
      }
      console.log(this.dataAll)
      this.loading = false;
    },err => {
      this.loading = false;
    });
  }
  // 刷新
  getList() {
    this.searchValue = ''; // 搜索条件清空
    this.getDatabaselist();
  }


  // 创建
  add() {
    this.addFlag = !this.addFlag;
    this.option = 'add';
    this.selectData = JSON.parse(JSON.stringify(this.nullData));
  }

  // 返回
  cancel($event: any) {
    if (event) {
      this.addFlag = false;
    }
    this.getDatabaselist();
  }

  // 右键创建菜单
  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    // console.log('event = ',$event,'template = ',template);
    this.dropdown = this.nzDropdownService.create($event, template);
    // console.log('dropdown =', this.dropdown)
  }


  // 查看
  preview(e) {
    // console.log('查看 e = ', e);
    this.dropdown.close();  //右键菜单关闭
    this.addFlag = !this.addFlag;
    this.option = 'preview';
    this.selectData = e;
  }

  // 编辑
  edit(serverip: string) {
    this.dropdown.close();  //右键菜单关闭
    this.addFlag = !this.addFlag;
    this.option = 'edit';
    this.selectData = this.dataAll.filter(d => d.serverip === serverip)[0];
  }

  // 删除
  remove(serverip: string) {
    this.dbMgrService.deleteDbMgr(serverip).then(res => {
      // console.log('删除后res = ',res);
      if(res['message'] == '1'){
        this.message.success('删除成功！')
      }else if(res['message'] == '-1'){
        this.message.error('删除失败！')
      }
    },err => {
    });
    this.getDatabaselist();   
  }


}
