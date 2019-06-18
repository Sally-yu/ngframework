import { Component, OnInit } from '@angular/core';
import {UrlService} from '../../url.service';

@Component({
  selector: 'app-grafana',
  templateUrl: './grafana.component.html',
  styleUrls: ['./grafana.component.less']
})
export class GrafanaComponent implements OnInit {

  constructor(
    public url:UrlService,
  ) { }

  ngOnInit() {
  }

}
