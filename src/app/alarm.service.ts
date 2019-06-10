import {Injectable} from '@angular/core';
import {RsaService} from './rsa.service';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(
    private rsa: RsaService,
    private http: HttpClient,
    private message: NzMessageService,
    private url: UrlService,
  ) {
  }

  alarmList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.alarmlist).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, error1 => {
        this.message.error(error1.error['msg']);
        reject(data);
      });
    });
  }

  alarmStgList():any{
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.alarmStgList).toPromise().then(res => {
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

  addAlarmStg(data):any{
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addAlarmStg, data).toPromise().then(res => {
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

  removeAlarmStg(key:string):any{
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeAlarmStg, {key: key}).toPromise().then(res => {
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

  removeAlarm(key:string):any{
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeAlarmStg, {key: key}).toPromise().then(res => {
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

  updateAlarmStg(data:any):any{
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateAlarmStg, data).toPromise().then(res => {
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

  updateAlarm(data:any):any{
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateAlarmStg, data).toPromise().then(res => {
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
