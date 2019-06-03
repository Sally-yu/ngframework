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
  addUser: boolean;
  loading: any;
  notifList:[];

  constructor(
    private notify:NotifyService,
    private message:NzMessageService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading=true;
    this.notify.allNotif().then(res=>{
      this.notifList=res;
      this.loading=false;
    },error=>{
      this.loading=false;
    })
  }

  remove(key: any) {
    this.loading=true;
    this.notify.removeNotif(key).then(res=>{
      this.getList();
    },error=>{
      this.getList();
    });
  }


}
