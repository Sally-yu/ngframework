import {Injectable} from '@angular/core';
import * as RSA from 'jsencrypt';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class RsaService {

  constructor(
    private url: UrlService,
    private http: HttpClient,
    private message: NzMessageService
  ) {
  }

  //加密登录信息，后台获取key 异步等待
  Encrypt(obj) {
    let encrypt = new RSA.JSEncrypt();
    let data;
    return new Promise((resolve, reject) => {
      this.http.get(this.url.keyUrl).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
          encrypt.setPublicKey(data);
          resolve(encrypt.encryptLong(obj));
        }
        else {
          reject('')
        }
      }, res => {
        reject('');
      });
    });
  }
}
