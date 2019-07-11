import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { AjaxService } from '../../../services/ajax/ajax.service';
import { DbMgrService } from 'src/app/services/db-mgr/db-mgr.service';

@Component({
  selector: 'app-data-manage',
  templateUrl: './data-manage.component.html',
  styleUrls: ['./data-manage.component.less']
})
export class DataManageComponent implements OnInit,OnChanges {

  @Input() change;
  dataAll= [];   // 所有数据
  data = [];//数组列表信息
  searchValue = '';  // 搜索条件
  selectData ;  // 被选择的数据
  addFlag = false;  //添加功能的标志位
  loading = false;

  option = '';  //查看、新增和编辑的标志位

  nullData = {
    servername: "",
    serverip: "",
    serverport: "",
    state:0,
    database: "",
    databasetype: "",
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
  edit(serverip: string, state) {
    if(state>0){
      this.message.warning('数据库使用中，禁止编辑！');
    }else{
      this.addFlag = !this.addFlag;
      this.option = 'edit';
      this.selectData = this.dataAll.filter(d => d.serverip === serverip)[0];
    }
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
  ngOnChanges(changes: SimpleChanges): void {
    this.getDatabaselist();
  }
  getDatabaselist() {
    this.loading = true;
    this.dbMgrService.dbMgrList().then(res => {
      this.dataAll = res;
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
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  // 删除
  remove(serverip: string,state) {
    if(state>0){
      this.message.warning('数据库使用中，禁止删除！');
    }else{
      this.dbMgrService.deleteDbMgr(serverip).then(res => {
        this.getDatabaselist();
      }, err => {
      });
      this.getDatabaselist();
    }
  }

  // 测试连接
  connection(data) {
    const messageId = this.message.loading('正在测试连接...', { nzDuration: 0 }).messageId
    if (data.databasetype == '时序数据库') {
      let url_port = data.serverip;
      if (data.serverport) {
        url_port = url_port + `:${data.serverport}`
      }
      let url = `http://${url_port}/ping`;
      if (data.username && data.password) {
        url = url + `?u=${data.username}&p=${data.password}`
      }
      this.http.get(url).toPromise().then(res => {
        this.message.remove(messageId);
        this.message.success('测试连接成功！');
      },
        err => {
          this.message.remove(messageId);
          this.message.error('测试连接失败！');
        }
      );
    }

    if (data.databasetype == '文档数据库') {
      this.dbMgrService.dbMgrPing(data).then(res => {
        this.message.remove(messageId);
        this.message.success('测试连接成功！');
      }, err => {
        this.message.remove(messageId);
        this.message.error('测试连接失败！');
      });
    }
  }


}
