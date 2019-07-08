import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OpcService} from './services/opc-service/opc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  cookie;

  constructor(
    private router: Router,
    private OpcService: OpcService,
  ) {

  }
  //同步设备列表
  keepAlive(){
    this.OpcService.getserviceList().then(res => {
      var serviceList = res;
      serviceList.forEach(element => {
        if(element.opcstate=="true"){
          this.OpcService.keepServerAlive(element).then(res => {
           if(res=="False"){
            element.opcstate=="false";
            this.OpcService.updateService(element);
           }
          },err => {
            element.opcstate=="false";
            this.OpcService.updateService(element);
          });;
        }
      });

    },err => {
    });
  }
  ngOnInit() {
    setInterval(() => { this.keepAlive(); }, 10000);
    // this.cookie = document.cookie;
    // if (!this.cookie) {
    //   this.router.navigate(['/login']);
    // }
  }
}
