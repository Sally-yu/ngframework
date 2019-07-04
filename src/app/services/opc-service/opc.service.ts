import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class OpcService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    ) { }

  public host='http://10.24.20.71:4000';
  public insertopcUrl=this.host+'/api/v1/opcua/insert';
  public updateopcUrl=this.host+'/api/v1/opcua/update';
  public getopcUrl=this.host+'/api/v1/opcua/get';
  public deleteopcUrl=this.host+'/api/v1/opcua/delete';

   public influxhandleUrl="Api/InfluxHandle.ashx";
  public opchandleUrl="Api/OpcHandle.ashx";
  
   
    // 数据列表，返回所有的数据。
    getserviceList(): any {
      let data = [];
      return new Promise((resolve, reject) => {
        this.http.get(this.getopcUrl).toPromise().then(res => {
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
    addService(addData): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.insertopcUrl, addData).toPromise().then(res => {
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
    updateService(addData): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.updateopcUrl, addData).toPromise().then(res => {
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
  
    // 删除一条记录
    deleteService(serveraddress): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.deleteopcUrl, {"serveraddress":serveraddress}).toPromise().then(res => {
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
