import {Component, OnInit} from '@angular/core';
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

  login = false;
  loading = false;

  user = {};

  pwdOK=true;
  pwdStatus;

  confirm;
  confirmOK = true;
  confirmStatus ;

  constructor(private rsa: RsaService,
              private http: HttpClient,
              private message: NzMessageService,
              private url: UrlService,
              private userSrv:UserService,
  ) {
  }



  //验证
  valide() {
    if(this.user["password"]!=this.confirm){
      this.confirmOK=false;
      this.confirmStatus="error";
    }else{
      this.confirmOK=true;
      this.confirmStatus="success";
    }
  }

  getUser() {
    this.loading=true;
    this.userSrv.getUser(document.cookie).then(user=>{
      this.user=user;
      this.loading=false;
    });
  }

  //提交更新用户
  submit() {
    this.loading = true;
    this.userSrv.update(this.user).then(msg=>{
      this.loading=false;
    });
  }

  //重置，重新获取user
  reset(){
    this.getUser()
  }

  ngOnInit() {
    this.getUser();
  }


}
