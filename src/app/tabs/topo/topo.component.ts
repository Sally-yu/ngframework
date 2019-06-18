import { Component, OnInit } from '@angular/core';
import {UrlService} from '../../url.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.less']
})
export class TopoComponent implements OnInit {

  constructor(
    public  url:UrlService
  ) { }

  ngOnInit() {
  }

}
