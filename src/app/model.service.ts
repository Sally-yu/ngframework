import { Injectable } from '@angular/core';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(
    private url:UrlService,
    private http:HttpClient,
    private message:NzMessageService,
  ) { }

  all(){
    return new Promise((resolve,reject)=>{
      this.http.get(this.url.modelAll,{headers: this.url.header()}).toPromise().then(res=>{
        if(res["status"]){
          resolve(res)
        }
      },err=>{
        reject(false);
      })
    })
  }

  update(m: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.modelUpdate, m, {headers: this.url.header()}).toPromise().then(res => {
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
}
