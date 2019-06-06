import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.less']
})
export class EmailComponent implements OnInit {

  @Input() key:string;

  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.result.emit(true);
  }
}
