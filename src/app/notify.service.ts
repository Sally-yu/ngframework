import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {UrlService} from './url.service';
import {reject} from 'q';
import {limitToSingleClasses} from '@angular/core/src/render3/styling/class_and_style_bindings';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private http:HttpClient,
    private message:NzMessageService,
    private url:UrlService,
  ) { }

  allNotif():any{
    let list=[];
    return new Promise((resolve ,reject )=>{
      this.http.get(this.url.allNotif).toPromise().then(res=>{
        if(res["status"]){
          list=res["data"];
          list.forEach(e=>{
            e["time"]=e["time"].slice(0,e["time"].indexOf('.')).replace('T',' '); //去T 去毫秒及末尾时区
          })
        }
        else{
          this.message.error(res["msg"]);
        }
        resolve(list)
      },error=>{
        reject(list)
      })
    })
  }

  removeNotif(key:string):any{
    return new Promise((resolve,reject)=>{
      this.http.post(this.url.removeNotif,{key:key}).toPromise().then(res=>{
        if(!res["status"]){
          this.message.error(res["msg"]);
        }
        this.message.success(res["msg"]);
        resolve(res["status"]);
      },error =>{
        this.message.error(error["msg"]);
        reject(false);
      })
    })
  }


}
