import { Injectable } from '@angular/core';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  listUrl = this.url.workUrl;
  grafanaUrl = this.url.gafanaUrl;
  topoUrl = this.url.topoUrl;

  constructor(private url:UrlService) { }
}
