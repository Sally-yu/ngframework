import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {UrlService} from './url.service';
import {Injectable} from '@angular/core';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private url: UrlService,
  ) {
  }


  //设备模板list
  deviceTempList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.tempList, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(data);
      });
    });
  }

  //新增设备模板
  newDeviceTemp(template: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addTemp, template, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //删除设备模板
  removeTemp(key: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeTemp, {key: key}, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //更新设备模板，注意时间时区
  updateTemplate(temp: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateTemp, temp, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }


  // 上边是模板
  //
  // 分割线
  //
  // 下边是设备


  //新增设备
  newDevice(device: any): any {
    if (device['template']) {
      device['template']['time'] = device['template']['time'].replace(' ', 'T') + '+08:00';
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addDevice, device, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //删除设备
  removeDevice(key: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeDevice, {key: key}, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //更新设备，注意时间时区
  updateDevice(device: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateDevice, device, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //设备list
  deviceList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.deviceList, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, res => {
        this.message.error(res.error['msg']);
        this.url.logout(res);
        reject(data);
      });
    });
  }

  //查找设备
  findDeviceCode(code: string): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.post(this.url.deviceCode, {code: code}, {headers: this.url.header()}).toPromise().then(res => {
        resolve(res);  //status为true时 data为设备信息，为false时msg为错误信息
      }, res => {
        reject(res);
        this.url.logout(res);
      });
    });
  }

  //获取设备数值
  deviceValue(codes: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.deviceValue, {keys: codes}, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status'] && res['data']) {
          resolve(res['data']);  //status为true时 data为设备信息，为false时msg为错误信息
        } else {
          reject(res['msg']);
        }
      }, res => {
        reject(res['msg']);
        this.url.logout(res);
      });
    });
  }

}
