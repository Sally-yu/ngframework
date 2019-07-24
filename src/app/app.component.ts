import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
  ) {

  }
  // //同步设备列表
  // keepAlive(){
  //   console.log("12121212121")
  //   this.OpcService.getserviceList().then(res => {
  //     var serviceList = res;
  //     serviceList.forEach(element => {
  //       if(element.opcstate=="true"){
  //         this.OpcService.keepServerAlive(element).then(res => {
  //          if(res=="False"){
  //           element.opcstate=="false";
  //           this.OpcService.updateService(element);
  //          }
  //         },err => {
  //           element.opcstate=="false";
  //           this.OpcService.updateService(element);
  //         });;
  //       }
  //     });
  //
  //   },err => {
  //   });
  // }
}
