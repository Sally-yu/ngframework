import {Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';
import {RsaService} from './rsa.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = this.url.user;
  updateUrl = this.url.updateUser;
  listUrl = this.url.allUser;
  addUrl = this.url.addUser;
  removeUrl = this.url.removeUser;

  constructor(
    private rsa: RsaService,
    private http: HttpClient,
    private message: NzMessageService,
    private url: UrlService,
  ) {

  }

  sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime) {
        return;
      }
    }
  }

  //获取user完整信息
  getUser(key: string): any {
    let user = {};
    return new Promise((resolve, reject) => {
      this.http.post(this.userUrl, {key: key}).toPromise().then(res => {
          if (res['status']) {
            user = res['data'];
            user["time"]=user["time"].slice(0,user["time"].indexOf('.')).replace('T',' '); //去T 去毫秒及末尾时区
          } else {
            this.message.error(res['msg']);
          }
          resolve(user);
        },
        msg => {
          reject(user);
        });
    });
  }

  //全部用户
  getList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.listUrl).toPromise().then(res => {
        if (res['status']) {
          data = res['data'];
          data.forEach(e=>{
            e["time"]=e["time"].slice(0,e["time"].indexOf('.')).replace('T',' '); //去T 去毫秒及末尾时区
          })
        }
        resolve(data);
      }, error1 => {
        this.message.error(error1.error['msg']);
        reject(data);
      });
    });
  }

  //新增用户
  newUser(user: any): any {
    let encrypt = this.rsa.Encrypt(JSON.stringify(user));//公钥加密 字符串超长 分段加
    return new Promise((resolve, reject) => {
      if (!encrypt) {
        reject(false);
      }
      this.http.post(this.addUrl, {user: encrypt}).subscribe(res => {
        if (!res['status']) {
          this.message.error(res['msg']);
        } else {
          this.message.success(res['msg']);
        }
        resolve(res['status']);
      }, error1 => {
        this.message.error(error1.error['msg']);
        reject(false);
      });
    });
  }

  //更新用户信息
  update(user: any): any {
    let encrypt = this.rsa.Encrypt(JSON.stringify(user));//公钥加密 字符串超长 分段加
    return new Promise((resolve, reject) => {
      if (!encrypt) {
        reject(false);
      }
      this.http.post(this.updateUrl, {user: encrypt}).subscribe(res => {
        if (!res['status']) {
          this.message.error(res['msg']);
        } else {
          this.message.success(res['msg']);
        }
        resolve(res['status']);
      }, error1 => {
        this.message.error(error1.error['msg']);
        reject(false);
      });
    });
  }

  //移除用户
  remove(key: string): any {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject(false);
      }
      this.http.post(this.removeUrl, {key: key}).subscribe(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, error1 => {
        this.message.error(error1.error['msg']);
        resolve(false);
      });
    });
  }
}
