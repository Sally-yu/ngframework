import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-alarm-mgr',
  templateUrl: './edit-alarm-mgr.component.html',
  styleUrls: ['./edit-alarm-mgr.component.less']
})
export class EditAlarmMgrComponent implements OnInit {
  @Input() selectEditData;
  @Input() option;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  // 取消、关闭
  close() {
    this.result.emit(true);
  }

}
