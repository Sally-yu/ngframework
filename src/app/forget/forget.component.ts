import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.less']
})
export class ForgetComponent implements OnInit {
  current = 0;
  phone = '';
  newpwd = '';
  pwdLength = true;
  confirmOK = true;
  confirmStatus = 'success';
  confirm = '';
  lenStatus = 'success';
  user = {};

  constructor(private userSrv: UserService,
  ) {
  }

  ngOnInit() {
  }

  next() {
    this.current += 1;
  }

  authPhone() {
    this.userSrv.userPhone(this.phone).then(res => {
      if (res['key']) {
        this.user = res;
      }
    }, res => {
    });
  }

  //确认新密码
  ensure() {
    this.valideLen();
    if (this.newpwd.length > 0 && this.pwdLength) {
      this.userSrv.newPwd(this.user["key"], this.newpwd).then(res => {
        if (res) {
          this.next();
        }
      }, err => {
      });
    }
  }

  valide() {
    if (this.newpwd != this.confirm) {
      this.confirmOK = false;
      this.confirmStatus = 'error';
    } else {
      this.confirmOK = true;
      this.confirmStatus = 'success';
    }
  }

  valideLen() {
    if (this.newpwd.length < 6 || this.newpwd.length > 16) {
      this.pwdLength = false;
      this.lenStatus = 'error';
    } else {
      this.pwdLength = true;
      this.lenStatus = 'success';
    }
  }

  logout() {
    document.cookie = '';
    window.location.href = '/';
  }
}
