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
          data.forEach(e => {
            e['time'] = e['time'].slice(0, e['time'].indexOf('.')).replace('T', ' '); //去T 去毫秒及末尾时区
          });
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
          data.forEach(e => {      //不处理template时间戳
            if (e['time'].indexOf('.') > 0) {
              e['time'] = e['time'].slice(0, e['time'].indexOf('.')+1); //去T 去毫秒及末尾时区
            }
            e['time'] = e['time'].slice(0, e['time'].indexOf('+')).replace('T', ' ');//无毫秒情况

            if (e['device']['time'].indexOf('.') > 0) {
              e['device']['time'] = e['device']['time'].slice(0, e['device']['time'].indexOf('.')+1); //去T 去毫秒及末尾时区
            }
            e['device']['time'] = e['device']['time'].slice(0, e['device']['time'].indexOf('+')).replace('T', ' ');//无毫秒情况

            if (e['device']['template']['time'].indexOf('.') > 0) {
              e['device']['template']['time'] = e['device']['template']['time'].slice(0, e['device']['template']['time'].indexOf('.')+1); //去T 去毫秒及末尾时区
            }
            e['device']['template']['time'] = e['device']['template']['time'].slice(0, e['device']['template']['time'].indexOf('+')).replace('T', ' ');//无毫秒情况
          });
        }
        resolve(data);
      }, res => {
        this.message.error(res.error['msg']);
        reject(data);
      });
    });
  }

  addAlarmStg(data):any{
    data['device']['time'] = data['device']['time'].replace(' ', 'T') + '+08:00';
    data['device']['template']['time'] = data['device']['template']['time'].replace(' ', 'T') + '+08:00';
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

  updateAlarmStg(data:any):any{
    data['time'] = data['time'].replace(' ', 'T') + '+08:00';
    data['device']['time'] = data['device']['time'].replace(' ', 'T') + '+08:00';
    data['device']['template']['time'] = data['device']['template']['time'].replace(' ', 'T') + '+08:00';
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
