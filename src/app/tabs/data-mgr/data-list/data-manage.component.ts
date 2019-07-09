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
  dataAll;   // 所有数据
  data = [];//数组列表信息
  searchValue = '';  // 搜索条件
  selectData = '';  // 被选择的数据
  addFlag = false;  //添加功能的标志位
  loading = false;

  option = '';  //查看、新增和编辑的标志位
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
 
  //编辑
  edit(serverip: string) {
    this.addFlag = !this.addFlag;
    this.option = 'edit';
    this.selectData = this.dataAll.filter(d => d.serverip === serverip)[0];
  }

  
  //刷新
  getList() {
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

  // 删除
  remove(serverip: string) {
    this.dbMgrService.deleteDbMgr(serverip).then(res => {
      this.getDatabaselist();
    }, err => {
    });
    this.getDatabaselist();
  }

  // 测试连接
  connection(data) {
    // this.dropdown.close();  //右键菜单关闭
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
        this.message.remove(messageId);
        this.message.success('测试连接成功！');
        // data["ping"] = true;
      },
        err => {
          // console.log('err = ', err)
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


}
