import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { AjaxService } from '../../../services/ajax/ajax.service';
import { DbMgrService } from '../../../services/db-mgr/db-mgr.service';
import { UrlService } from '../../../url.service';

@Component({
  selector: 'app-db-mgr',
  templateUrl: './db-mgr.component.html',
  styleUrls: ['./db-mgr.component.less']
})


export class DbMgrComponent implements OnInit {
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
    databasetype: "MongoDB",
    username: "",
    password: "",
    description: "",
  };
  header;


  constructor(
    private nzDropdownService: NzDropdownService,
    private ajax: AjaxService,
    private http: HttpClient,
    private message: NzMessageService,
    private dbMgrService: DbMgrService,
    private url: UrlService,
  ) { this.header = new HttpHeaders({ token: this.url.token(), user: this.url.key() }); }

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
    }, err => {
      this.loading = false;
    });

  }
  // 搜索
  search() {
    this.loading = true;
    this.dbMgrService.dbMgrList().then(res => {
      this.dataAll = res;
      if (this.searchValue) {
        this.dataAll = JSON.parse(JSON.stringify(this.dataAll)).filter(d => {
          return d.servername.indexOf(this.searchValue) >= 0;
        });
      }
      // console.log(this.dataAll)
      this.loading = false;
    }, err => {
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

  // 测试连接
  connection(data) {
    this.dropdown.close();  //右键菜单关闭
    const messageId = this.message.loading('正在测试连接...', { nzDuration: 0 }).messageId
    if (data.databasetype == 'InfluxDB') {
      let url_port = data.serverip;
      if (data.serverport) {
        url_port = url_port + `:${data.serverport}`
      }
      let url = `http://${url_port}/ping`;
      if (data.username && data.password) {
        url = url + `?u=${data.username}&p=${data.password}`
      }
      // console.log('url=', url)
      this.http.get(url).toPromise().then(res => {
        // console.log('res = ', res)
        this.message.remove(messageId);
        this.message.success('测试连接成功！');
        // data["ping"] = true;
      },
        err => {
          this.message.remove(messageId);
          this.message.error('测试连接失败！');
          // data["ping"] = false;
        }
      );
    }

    if (data.databasetype == 'MongoDB') {
      this.dbMgrService.dbMgrPing(data).then(res => {
        this.message.remove(messageId);
        this.message.success('测试连接成功！');
        // data["ping"] = true;
      }, err => {
        // console.log('err=', err.error)
        this.message.remove(messageId);
        this.message.error('测试连接失败！');
        // data["ping"] = false;
      });
    }

    // var url = 'mongodb://admin:123456@10.24.20.71:28081';
    // // Use connect method to connect to the Server passing in
    // // additional options
    // MongoClient.connect(url, {
    //   poolSize: 10, ssl: true
    // }, function (err, db) {
    //   // assert.equal(null, err);
    //   console.log("Connected correctly to server");
    //   db.close();
    // });

    // let url = 'http://10.72.43.193:8086/ping?u=admin&p=admin'
    // let url = 'http://10.72.43.193/ping'
    // let url = 'http://10.25.11.104/ping'
  }

  // 删除
  remove(serverip: string) {
    this.dbMgrService.deleteDbMgr(serverip).then(res => {
      this.getDatabaselist();
    }, err => {
    });
    this.getDatabaselist();
  }

}
