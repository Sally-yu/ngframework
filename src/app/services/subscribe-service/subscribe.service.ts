import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    ) { }

  public host='http://10.24.20.71:4000';
  public insertsubUrl=this.host+'/api/v1/subscribe/insert';
  public updatesubUrl=this.host+'/api/v1/subscribe/update';
  public getsubUrl=this.host+'/api/v1/subscribe/get';
  public deletesubUrl=this.host+'/api/v1/subscribe/delete';

   
    // 数据列表，返回所有的数据。
    getsubscribeList(): any {
      let data = [];
      return new Promise((resolve, reject) => {
        this.http.get(this.getsubUrl).toPromise().then(res => {
          if (res['status'] && res['data']) {
            data = res['data'];
          }
          resolve(data);
        }, res => {
          this.message.error(res.error['msg']);
          reject(data);
        });
      });
    }
    // 添加一条记录
    addSubscribe(addData): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.insertsubUrl, addData).toPromise().then(res => {
          if (res['status']) {
            this.message.success(res['msg']);
          } else {
            this.message.error(res['msg']);
          }
          resolve(res['status']);
        }, res => {
          this.message.error(res.error['msg']);
          reject(false);
        });
      });
    }
    // 更新一条记录
    updateSubscribe(addData): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.updatesubUrl, addData).toPromise().then(res => {
          if (res['status']) {
            //this.message.success(res['msg']);
          } else {
            this.message.error(res['msg']);
          }
          resolve(res['status']);
        }, res => {
          this.message.error(res.error['msg']);
          reject(false);
        });
      });
    }
  
    // 删除一条记录
    deleteSubscribe(serveraddress): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.deletesubUrl, {"serveraddress":serveraddress}).toPromise().then(res => {
          if (res['status']) {
            this.message.success(res['msg']);
          } else {
            this.message.error(res['msg']);
          }
          resolve(res['status']);
        }, res => {
          this.message.error(res.error['msg']);
          reject(false);
        });
      });
    }
}
