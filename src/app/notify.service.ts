import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {UrlService} from './url.service';
import {reject} from 'q';
import {limitToSingleClasses} from '@angular/core/src/render3/styling/class_and_style_bindings';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private url: UrlService,
  ) {
  }

  //所有通知
  allNotif(): any {
    let list = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.allNotif,{headers:this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          list = res['data'];
        } else {
          this.message.error(res['msg']);
        }
        resolve(list);
      }, error => {
        this.message.error(error.error['msg']);
        this.url.logout(error);
        reject(list);
      });
    });
  }

  //删除通知
  removeNotif(key: string): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeNotif, {key: key},{headers:this.url.header()}).toPromise().then(res => {
        if (!res['status']) {
          this.message.error(res['msg']);
        }
        this.message.success(res['msg']);
        resolve(res['status']);
      }, error => {
        this.message.error(error['msg']);
        this.url.logout(error);
        reject(false);
      });
    });
  }

  //更新通知，主要是最新状态
  updateNotif(data: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateNotif, data,{headers:this.url.header()}).toPromise().then(res => {
        resolve(true);
      }, err => {
        console.log('更新通知状态失败');
        this.url.logout(err);
        reject(false);
      });
    });
  }

}
