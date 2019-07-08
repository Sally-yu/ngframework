import {Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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


  //获取user完整信息
  getUser(key: string): any {
    let user = {};
    return new Promise((resolve, reject) => {
      this.http.post(this.userUrl, {key: key},{headers:this.url.header()}).toPromise().then(res => {
          if (res['status']) {
            user = res['data'];
          } else {
            this.message.error(res['msg']);
          }
          resolve(user);
        },
        msg => {
          this.message.error(msg.error['msg']);
          this.url.logout(msg);
          reject(user);
        });
    });
  }

  //获取user完整信息
  userPhone(phone: string): any {
    let user = {};
    return new Promise((resolve, reject) => {
      this.http.post(this.url.userPhone, {phone: phone}).toPromise().then(res => {
          if (res['status']) {
            user = res['data'];
          } else {
            this.message.error(res['msg']);
          }
          resolve(user);
        },
        msg => {
          this.message.error(msg.error['msg']);
          this.url.logout(msg);
          reject(user);
        });
    });
  }

  //全部用户
  getList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.listUrl,{headers:this.url.header()}).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, error1 => {
        this.message.error(error1.error["msg"]);
        this.url.logout(error1);
        reject(data);
      });
    });
  }

  //新增用户
  newUser(user: any): any {
    return new Promise((resolve, reject) => {
      this.rsa.Encrypt(JSON.stringify(user)).then(encrypt => {
        if (!encrypt) {
          reject(false);
        }
        this.http.post(this.addUrl, {user: encrypt},{headers:this.url.header()}).toPromise().then(res => {
          if (!res['status']) {
            this.message.error(res['msg']);
          } else {
            this.message.success(res['msg']);
          }
          resolve(res['status']);
        }, error1 => {
          this.message.error(error1.error['msg']);
          this.url.logout(error1);
          reject(false);
        });
      }, err => {
        reject(false);
      });
    });
  }

  //更新用户信息
  update(user: any): any {
    console.log(user)
    return new Promise((resolve, reject) => {
      this.rsa.Encrypt(JSON.stringify(user)).then(encrypt => {
        if (!encrypt) {
          reject(false);
        }
        this.http.post(this.updateUrl, {user: encrypt},{headers:this.url.header()}).toPromise().then(res => {
          if (!res['status']) {
            this.message.error(res['msg']);
          } else {
            this.message.success(res['msg']);
          }
          resolve(res['status']);
        }, error1 => {
          this.message.error(error1.error['msg']);
          this.url.logout(error1);
          reject(false);
        });
      }, err => {
        reject(false);
      });
    });

  }

  //修改密码
  public newPwd(key: string, pwd: string): any {
    return new Promise((resolve, reject) => {
      this.rsa.Encrypt(pwd).then(encrypt => {
        if (!encrypt) {
          reject(false);
        }
        this.http.post(this.url.newPwd, {key: key, pwd: encrypt}).toPromise().then(res => {
          if (!res['status']) {
            this.message.error(res['msg']);
            reject(false);
          } else {
            resolve(res['status']);
          }
        }, error1 => {
          this.message.error(error1.error['msg']);
          reject(false);
        });
      }, err => {
        this.message.error('用户加密验证出错');
      });
    });
  }

  //验证用户key与密码匹配
  public authKey(key: string, pwd: string): any {
    return new Promise((resolve, reject) => { //promise嵌套，注意调用次序
      this.rsa.Encrypt(pwd).then(encrypt => {
        if (!encrypt) {
          reject(false);
        }
        this.http.post(this.url.authKey, {key: key, pwd: encrypt},{headers:this.url.header()}).toPromise().then(res => {
          if (!res['status']) {
            this.message.error(res['msg']);
            reject(false);
          } else {
            resolve(res);
          }
        }, error1 => {
          this.message.error(error1.error['msg']);
          this.url.logout(error1);
          reject(false);
        });
      }, err => {
        reject(false);
      });
    });
  }

  //验证用户key与密码匹配  pubic有奇效，toLowerCase报错时请找。url，方法等
  public login(name: string, pwd: string): any {
    return new Promise((resolve, reject) => { //promise嵌套，注意调用次序
      this.rsa.Encrypt(pwd).then(res => {
        if (!res) {
          reject(false);
        }
        let data = {name: name, pwd: res};
        this.http.post(this.url.loginUrl, data).toPromise().then(res => {
          if (!res['status']) {
            this.message.error(res['msg']);
            reject(false);
          } else {
            resolve(res);
          }
        }, error1 => {
          this.message.error(error1.error["msg"]);
          reject(false);
        });
      }, err => {
        this.message.error(err.error["msg"]);
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
      this.http.post(this.removeUrl, {key: key},{headers:this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          this.message.success(res['msg']);
        } else {
          this.message.error(res['msg']);
        }
        resolve(res['status']);
      }, error1 => {
        this.message.error(error1.error['msg']);
        this.url.logout(error1)
        resolve(false);
      });
    });
  }
}


