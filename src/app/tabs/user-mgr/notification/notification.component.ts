import { Component, OnInit} from '@angular/core';
import {NotifyService} from '../../../notify.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

  ws: WebSocket;
  notifList = [];

  loading = false;
  detail = false;
  notify = {};
  searchValue;

  constructor(
    private notifyService: NotifyService,
    private message: NzMessageService
  ) {
    this.ws=null;
  }

  closeWs() {
    if (this.ws && this.ws.readyState == WebSocket.CONNECTING) {
      this.ws.close();
    }
  }

  //消息通知ws
  connectWs() {
    this.closeWs();
    this.ws = new WebSocket('ws://10.24.20.71:7777/notify');
    this.ws.onmessage = (event) => {
      console.log('update');
      if (JSON.stringify(this.notifList) != event.data) {
        this.notifList = JSON.parse(event.data);
      }
    };
    this.ws.onerror=event=>{
      this.ws.close()
    }
  }

  ngOnInit() {
    this.connectWs();
  }

  remove(key: any) {
    this.loading = true;
    this.notifyService.removeNotif(key).then(res => {
    }, error => {
    });
  }

  view(key: any) {
    this.notify = this.notifList.filter(n => n['key'] == key)[0];
    this.detail = true;
  }

  cancel(event: any) {
    if (event) {
      this.detail = false;
    }
  }

  search() {
    this.loading = true;
    this.notifyService.allNotif().then(res => {
      this.notifList = res;
      if (this.searchValue) {
        this.notifList = JSON.parse(JSON.stringify(this.notifList)).filter(d => {
          return d.title.indexOf(this.searchValue) >= 0;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

}
