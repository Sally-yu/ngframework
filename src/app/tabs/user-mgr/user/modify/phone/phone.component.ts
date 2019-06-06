import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.less']
})
export class PhoneComponent implements OnInit {

  @Input() key:string;

  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.result.emit(true);
  }
}
