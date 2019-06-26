import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../../url.service';
import {RsaService} from '../../../rsa.service';
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  loading = false;
  user = {};

  changePwd= false;
  changePhone= false;
  @Input() key:string;

  constructor(private rsa: RsaService,
              private http: HttpClient,
              private message: NzMessageService,
              private url: UrlService,
              private userSrv:UserService,
  ) {
  }

  getUser() {
    this.loading=true;
    this.userSrv.getUser(this.key).then(user=>{
      this.user=user;
      this.loading=false;
    });
  }

  ngOnInit() {
    this.getUser();
  }

  cancel($event: any) {
    if(event){
      this.changePhone=false;
      this.changePwd=false;
    }
    this.getUser();
  }
}
