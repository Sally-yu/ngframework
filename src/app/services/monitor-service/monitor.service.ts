import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor() { }
  
  public storageObj = {};

  set(key, value) {
    this.storageObj[key] = value;
  }

  get(key) {
    return this.storageObj[key];
  }

  remove(key) {
    delete this.storageObj[key]
  }
}
