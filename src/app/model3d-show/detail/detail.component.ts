import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {container} from '@angular/core/src/render3';
declare var $:any;
@Component({
  selector: 'app-model3d-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class Model3dDetailComponent implements OnInit {

  @Input() url;
  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.result.emit(true);
  }

}
