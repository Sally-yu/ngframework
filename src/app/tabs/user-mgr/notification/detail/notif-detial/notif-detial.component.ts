import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotifyService} from '../../../../../notify.service';

@Component({
  selector: 'app-notif-detial',
  templateUrl: './notif-detial.component.html',
  styleUrls: ['./notif-detial.component.less']
})
export class NotifDetialComponent implements OnInit {

  @Input() notif:any;
  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor(
    private notifyService:NotifyService,
  ) { }

  ngOnInit() {
    if (this.notif.new){
      this.notif.new=false;
      console.log(this.notif);
      this.notifyService.updateNotif(this.notif).then(res=>{

      },err=>{

      })
    }
  }

  close() {
    this.result.emit(true);
  }


}
