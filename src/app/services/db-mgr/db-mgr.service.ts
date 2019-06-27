import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbMgrService {

  constructor(private http: HttpClient) { }

  // 模拟数据
  dataAllServer = [
    {
      servername: "服务器 1",
      serverip: "10.25.12.11",
      serverport: "8000",
      database: "mySQL",
      databasetype: "时序数据库",
      username: "admin",
      password: "admin",
      description: ""
    },
    {
      servername: "服务器 2",
      serverip: "10.25.12.12",
      serverport: "8001",
      database: "mySQL",
      databasetype: "关系数据库",
      username: "test",
      password: "test",
      description: ""
    },
    {
      servername: '服务器 3',
      serverip: "10.25.12.13",
      database: "Oracle",
      serverport: "8002",
      databasetype: "文档数据库",
      username: "admin",
      password: "admin",
      description: ""
    },
    {
      servername: '服务器 4',
      serverip: "10.25.12.14",
      database: "瀚高",
      serverport: "4000",
      databasetype: "时序数据库",
      username: "admin",
      password: "admin",
      description: ""
    },
    {
      servername: '服务器 5',
      serverip: "10.25.12.15",
      database: "Postgres",
      serverport: "8080",
      databasetype: "关系数据库",
      username: "wzq",
      password: "wzq",
      description: ""
    },
    {
      servername: '服务器 6',
      serverip: "10.25.12.16",
      database: "MySQL",
      serverport: "8000",
      databasetype: "文档数据库",
      username: "test",
      password: "test",
      description: ""
    }, {
      servername: '服务器 7',
      serverip: "10.25.12.17",
      database: "MySQL",
      serverport: "9001",
      databasetype: "时序数据库",
      username: "admin1",
      password: "admin1",
      description: ""
    },
    {
      servername: '服务器 8',
      serverip: "10.25.12.18",
      database: "Oracle",
      serverport: "8002",
      databasetype: "关系数据库",
      username: "admin2",
      password: "admin2",
      description: ""
    },
    {
      servername: "服务器 9",
      serverip: "10.25.12.19",
      database: "Oracle",
      serverport: "4040",
      databasetype: "文档数据库",
      username: "admin3",
      password: "admin3",
      description: ""
    },
    {
      servername: "服务器 10",
      serverip: "10.25.12.20",
      database: "PostgreSQL",
      serverport: "8000",
      databasetype: "时序数据库",
      username: "admin4",
      password: "admin4",
      description: ""
    },

  ];


  // 数据列表，返回所有的数据。
  dbMgrList(): any {
    let data = [];
    // return new Promise((resolve, reject) => {
    //   this.http.get(this.url.alarmlist).toPromise().then(res => {
    //     if (res['status'] && res['data']) {
    //       data = res['data'];
    //     }
    //     resolve(data);
    //   }, error1 => {
    //     this.message.error(error1.error['msg']);
    //     reject(data);
    //   });
    // });
    // data = this.dataAll;
    return new Promise((resolve, reject) => {
      // data = ;
      resolve(JSON.parse(JSON.stringify(this.dataAllServer)));
    })
  }

  // 添加一条记录
  addDbMgr(d): any {
    return new Promise((resolve, reject) => {
      let flag = -2;
      for (let index of this.dataAllServer) {
        if (index.serverip == d.serverip) {
          this.dataAllServer['message'] = '-1'
          flag = -1;
          break;
        }
      }
      if (flag == -2) {//不存在
        this.dataAllServer['message'] = '1';
        this.dataAllServer.push(d);
      }
      resolve(this.dataAllServer);
    })
  }
  // 更新一条记录
  updateDbMgr(d): any {
    let nd = JSON.parse(JSON.stringify(d));
    // console.log('nd = ',nd)
    return new Promise((resolve, reject) => {
      for (let keyout of this.dataAllServer) {
        if (keyout.serverip == nd.serverip) {
          keyout = JSON.parse(JSON.stringify(nd));
          break;
        }
      }
      resolve(this.dataAllServer);
    })

  }

  // 删除一条记录
  deleteDbMgr(serverip): any {
    // console.log('service层中接收到的数据 = ', serverip)
    return new Promise((resolve, reject) => {
      // 1.根据‘服务器ip’查找数组中的该元素的索引
      let index = -1;
      for (let i = 0; i < this.dataAllServer.length; i++) {
        if (this.dataAllServer[i].serverip == serverip) {
          index = i;
          break;
        }
      }
      // 2.删除这个元素
      if (index > -1) {
        this.dataAllServer.splice(index, 1);
        this.dataAllServer['message'] = '1';
      } else {
        this.dataAllServer['message'] = '-1';
      }
      resolve(JSON.parse(JSON.stringify(this.dataAllServer)));
    })
  }
}
