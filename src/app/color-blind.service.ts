import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorBlindService {

  public most={
    color1:'#1ab768',
    color2:'#ff2222'
  }

  public rew={
    color1:'#0987fe',
    color2:'#ff2222'
  }

  constructor() { }
}
