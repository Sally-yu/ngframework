import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../../user.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent implements OnInit {

  @Input() key: string;

  @Output() result: EventEmitter<any> = new EventEmitter();

  pwdLength=true;
  lenStatus;
  confirmOK = true;
  confirmStatus ;

  current = 0;
  oldpwd = '';
  newpwd = '';
  confirm = '';

  constructor(
    private userSrv: UserService,
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

  authyKey() {
    this.userSrv.authKey(this.key, this.oldpwd).then(res => {
      if (res) {
        this.next();
      }
    }, msg => {
    });
  }

  ensure() {
    this.valideLen();
    if(this.newpwd.length>0&&this.pwdLength) {
      this.userSrv.newPwd(this.key, this.newpwd).then(res => {
        if (res) {
          this.next();
        }
      }, msg => {
      });
    }
  }

  valide() {
    if(this.newpwd!=this.confirm){
      this.confirmOK=false;
      this.confirmStatus="error";
    }else{
      this.confirmOK=true;
      this.confirmStatus="success";
    }
  }

  valideLen(){
    if(this.newpwd.length<6||this.newpwd.length>16){
      this.pwdLength=false;
      this.lenStatus="error";
    }else{
      this.pwdLength=true;
      this.lenStatus="success";
    }
  }


  logout() {
    document.cookie = '';
    window.location.href = '/';
  }
}