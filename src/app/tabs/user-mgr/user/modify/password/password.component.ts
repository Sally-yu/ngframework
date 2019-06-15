import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../../user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {RsaService} from '../../../../../rsa.service';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../../../../url.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent implements OnInit {

  @Input() key: string;

  @Output() result: EventEmitter<any> = new EventEmitter();

  pwdLength = true;
  lenStatus;
  confirmOK = true;
  confirmStatus;

  current = 0;
  oldpwd = '';
  newpwd = '';
  confirm = '';

  constructor(
    private userSrv: UserService,
    private rsaService: RsaService,
    private http: HttpClient,
    private url: UrlService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.result.emit(true);
  }

  next() {
    this.current += 1;
  }

  //验证旧密码
  authyKey() {
    this.userSrv.authKey(this.key, this.oldpwd).then(res => {
      if (res) {
        this.next();
      }
    }, msg => {
    });
  }

  //确认新密码
  ensure() {
    this.valideLen();
    if (this.newpwd.length > 0 && this.pwdLength) {
      this.userSrv.newPwd(this.key, this.newpwd).then(res => {
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
