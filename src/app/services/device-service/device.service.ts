import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {AjaxService} from '../ajax/ajax.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EdgeDeviceService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private url: AjaxService,
  ) {
  }

  //设备模板list
  deviceTempList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.tempList).toPromise().then(res => {
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

  //设备list
  deviceList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.deviceList).toPromise().then(res => {
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

  //新增设备模板
  newDeviceTemp(template: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addTemp, template).toPromise().then(res => {
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

  //新增设备
  newDevice(device: any): any {
    if (device['template']) {
      device['template']['time'] = device['template']['time'].replace(' ', 'T') + '+08:00';
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addDevice, device).toPromise().then(res => {
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

  //删除设备模板
  removeTemp(key: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeTemp, {key: key}).toPromise().then(res => {
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

  //删除设备
  removeDevice(key: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeDevice, {key: key}).toPromise().then(res => {
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

  //更新设备，注意时间时区
  updateDevice(device: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateDevice, device).toPromise().then(res => {
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

  //更新设备模板，注意时间时区
  updateTemplate(temp: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateTemp, temp).toPromise().then(res => {
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


  findDeviceCode(code: string): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.post(this.url.deviceCode, {code: code}).toPromise().then(res => {
        resolve(res);  //status为true时 data为设备信息，为false时msg为错误信息
      }, res => {
        reject(res);
      });
    });
  }

  deviceValue(codes:any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.deviceValue, {keys: codes}).toPromise().then(res => {
        if (res['status'] && res['data']) {
          resolve(res['data']);  //status为true时 data为设备信息，为false时msg为错误信息
        } else {
          reject(res['msg']);
        }
      }, res => {
        reject(res['msg']);
      });
    });
  }

}
