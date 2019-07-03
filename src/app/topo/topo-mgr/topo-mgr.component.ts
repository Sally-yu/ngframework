import { Component, OnInit } from '@angular/core';
import * as go from 'gojs';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {UrlService} from '../../url.service';

declare var $:any;

@Component({
  selector: 'app-topo-mgr',
  templateUrl: './topo-mgr.component.html',
  styleUrls: ['./topo-mgr.component.less']
})
export class TopoMgrComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
