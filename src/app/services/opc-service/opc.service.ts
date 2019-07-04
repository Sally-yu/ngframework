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

    startServer(serveraddress:string,serviceList,influxlist):any {
      var saveobj=serviceList.filter(d => d.serveraddress === serveraddress);
      var servername=JSON.parse(saveobj[0].servergroup)[0];
      var influx=influxlist.filter(d => d.servername === servername)
      var opcaction = 'startcollect';
      var data = new FormData();
      data.append('opctype', saveobj[0].opctype);
      data.append('opcip', saveobj[0].opchost)
      data.append('serverurl', saveobj[0].serverurl);
      data.append('frequency', saveobj[0].interval);
      data.append('opcaction', opcaction);
      data.append('inhost', influx[0].serverip);
      data.append('inport', influx[0].serverport);
      data.append('username', influx[0].username);
      data.append('password', influx[0].password);
      data.append('database', influx[0].database);
      var opcHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.opchandleUrl;
      var influxHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.influxhandleUrl;
      this.http.post(influxHandleUrl, data, {responseType: 'text'}).subscribe(res => {
        var state=res.search("连接错误") != -1 ;
        if(state){
          this.message.info(res);
         return true;
        }else{
          this.http.post(opcHandleUrl, data, {responseType: 'text'}).subscribe(res => {
                if (res.indexOf('Error') > -1 || res.indexOf('Exception') > -1) {   //后端代码内部报错也返回200，会在请求成功的结果中
                  this.message.warning('启动失败');
                  return true;
                } else {
                  this.message.success(res);
                  saveobj[0].opcstate="true";//应设置状态变化
                  this.updateService(saveobj[0]).then(res => {
                    //this.message.success(res);
                  }, err => {
                    this.message.warning("写入失败");
                  });   
                }
              }, error1 => { 
                this.message.warning('启动失败', error1.error);
                return true;
              });
        }
    
      }, error1 => {
        this.message.warning('数据库连接出错');
        return true;
      }); 
    }
    stopServer(serveraddress:string,serviceList) {
      var saveobj=serviceList.filter(d => d.serveraddress === serveraddress);
      var opcaction = 'stopcollect';
      var data = new FormData();
      data.append('opcaction', opcaction);
      var opcHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.opchandleUrl;
      this.http.post(opcHandleUrl, data, {responseType: 'text'}).subscribe(res => {
        if (res.indexOf('Error') > -1 || res.indexOf('Exception') > -1) {   //后端代码内部报错也返回200，会在请求成功的结果中
          this.message.warning('停止失败');
        } else {
          this.message.success(res);
          saveobj[0].opcstate="false";//应设置状态变化
          this.updateService(saveobj[0]).then(res => {
            //this.message.success(res);
          }, err => {
            this.message.warning("写入失败");
          });   
        }
      }, error1 => {
        this.message.warning('停止失败', error1.error);
      });
    }

}
