import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../../notify.service';
import {NzMessageService} from 'ng-zorro-antd';
import {load} from '@angular/core/src/render3';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
  loading=false;
  notifList=[];
  detail=false;
  notify={};
  searchValue;

  constructor(
    private notifyService:NotifyService,
    private message:NzMessageService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading=true;
    this.notifyService.allNotif().then(res=>{
      this.notifList=res;
      this.loading=false;
    },error=>{
      this.loading=false;
    })
  }

  remove(key: any) {
    this.loading=true;
    this.notifyService.removeNotif(key).then(res=>{
      this.getList();
    },error=>{
      this.getList();
    });
  }

  view(key: any) {
    this.notify=this.notifList.filter(n=>n['key']==key)[0];
    this.detail=true;
  }

  cancel(event: any) {
    if (event) {
      this.detail=false;
      this.getList();
    }
  }

  search() {
    this.loading = true;
    this.notifyService.allNotif().then(res => {
      this.notifList = res;
      if (this.searchValue) {
        this.notifList = JSON.parse(JSON.stringify(this.notifList)).filter(d => {
          return d.title.indexOf(this.searchValue) >= 0 ;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
}
