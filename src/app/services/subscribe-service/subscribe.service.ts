import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(
    // private http: HttpClient,
    // private message: NzMessageService,
    ) { }

  public host='http://10.24.20.71:4000';
  // public insertsubUrl=this.host+'/api/v1/subscribe/insert';
  // public updatesubUrl=this.host+'/api/v1/subscribe/update';
  // public getsubUrl=this.host+'/api/v1/subscribe/get';
  // public deletesubUrl=this.host+'/api/v1/subscribe/delete';
  registrations=[
    {
      id: "00001",
      name: "生产制造部",
      destination: 'MQTT_TOPIC',
      encryption: {},
      format: 'JSON',
      enable: false,
      address: "10.20.11.21",
      port: 3324,
      path: null,
      publisher: null,
      user: "admin",
      password: "admin",
      topic: "U肋组装机",
      baseURL: null,
      url: null,
      filter: {
          device: "U肋组装机",
          attribute:"温度"
      }
    },
    {
      id: "00002",
      name: "结构制造部",
      destination: 'MQTT_TOPIC',
      encryption: {},
      format: 'JSON',
      enable: false,
      address: "10.20.11.22",
      port: 3324,
      path: null,
      publisher: null,
      user: "admin",
      password: "admin",
      topic: "龙门焊机",
      baseURL: null,
      url: null,
      filter: {
          device: "多嘴头龙门焊机",
          attribute:"节拍"
      }
    },
    {
      id: "00003",
      name: "机械产品部",
      destination: 'MQTT_TOPIC',
      encryption: {},
      format: 'JSON',
      enable: false,
      address: "10.20.11.23",
      port: 3324,
      path: null,
      publisher: null,
      user: "admin",
      password: "admin",
      topic: "落地镗铣床",
      baseURL: null,
      url: null,
      filter: {
          device: "落地镗铣床",
          attribute:"转速"
      }
    }
  ];//全部注册的订阅事件

    // 数据列表，返回所有的数据。
    getsubscribeList(): any {
      let data = [];
      // return new Promise((resolve, reject) => {
      //   this.http.get(this.getsubUrl).toPromise().then(res => {
      //     if (res['status'] && res['data']) {
      //       data = res['data'];
      //     }
      //     resolve(data);
      //   }, res => {
      //     this.message.error(res.error['msg']);
      //     reject(data);
      //   });
      // });
      return new Promise((resolve, reject) => {
        data= this.registrations;
        if(data){
          resolve (data);
        }else{
          reject(data);
        }

      });

    }
    // 添加一条记录
    addSubscribe(addData): any {
      // return new Promise((resolve, reject) => {
      //   this.http.post(this.insertsubUrl, addData).toPromise().then(res => {
      //     if (res['status']) {
      //       this.message.success(res['msg']);
      //     } else {
      //       this.message.error(res['msg']);
      //     }
      //     resolve(res['status']);
      //   }, res => {
      //     this.message.error(res.error['msg']);
      //     reject(false);
      //   });
      // });
      return new Promise((resolve, reject) => {
        if(addData){
          resolve (true);
        }else{
          reject(false);
        }

      });
    }
    // 更新一条记录
    updateSubscribe(addData): any {
      // return new Promise((resolve, reject) => {
      //   this.http.post(this.updatesubUrl, addData).toPromise().then(res => {
      //     if (res['status']) {
      //       //this.message.success(res['msg']);
      //     } else {
      //       this.message.error(res['msg']);
      //     }
      //     resolve(res['status']);
      //   }, res => {
      //     this.message.error(res.error['msg']);
      //     reject(false);
      //   });
      // });
      return new Promise((resolve, reject) => {
        if(addData){
          resolve (true);
        }else{
          reject(false);
        }

      });
    }

    // 删除一条记录
    deleteSubscribe(id): any {
      // return new Promise((resolve, reject) => {
      //   this.http.post(this.deletesubUrl, {"serveraddress":serveraddress}).toPromise().then(res => {
      //     if (res['status']) {
      //       this.message.success(res['msg']);
      //     } else {
      //       this.message.error(res['msg']);
      //     }
      //     resolve(res['status']);
      //   }, res => {
      //     this.message.error(res.error['msg']);
      //     reject(false);
      //   });
      // });
      return new Promise((resolve, reject) => {
        if(id){
          resolve (true);
        }else{
          reject(false);
        }
      });
    }
}
