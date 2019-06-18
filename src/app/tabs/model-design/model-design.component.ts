import { Component, OnInit } from '@angular/core';
import {UrlService} from '../../url.service';

@Component({
  selector: 'app-model-design',
  templateUrl: './model-design.component.html',
  styleUrls: ['./model-design.component.less']
})
export class ModelDesignComponent implements OnInit {

  constructor(
    public url:UrlService,
  ) { }

  ngOnInit() {
  }

}
