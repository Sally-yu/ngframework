import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  hostname='http://10.24.20.71';
  port=':9090';
  location=this.hostname+this.port;

  authUrl=this.location+'/auth';

  constructor() { }
}
