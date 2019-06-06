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
}
