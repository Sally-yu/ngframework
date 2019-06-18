import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RsaService} from '../../../../rsa.service';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../../../url.service';
import {UserService} from '../../../../user.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {

  @Input() option: string;
  @Input() user: {};
  @Output() result: EventEmitter<any> = new EventEmitter();

  loading = false;

  confirm='';
  confirmOK = true;
  confirmStatus;
  lengthOK = true;
  lengthStatus;

  constructor(private fb: FormBuilder,
              private rsa: RsaService,
              private http: HttpClient,
              private message: NzMessageService,
              private url: UrlService,
              private userSrv: UserService,
  ) {
  }

  getUser() {
    this.loading = true;
    this.userSrv.getUser(this.user['key']).then(user => {
      this.user = user;
      this.loading = false;
    });
  }

  //提交更新用户
  submit() {
    this.valide();
    if (this.confirmOK && this.lengthOK) {
      this.loading = true;
      switch (this.option) {
        case 'edit':
          this.userSrv.update(this.user).then(msg => {
            this.loading = false;
          }, msg => {
            this.loading = false;
          });
          break;
        case 'new':
          this.userSrv.newUser(this.user).then(msg => {
            this.loading = false;
            this.close();
          }, error => {
            this.loading = false;
          });
          break;
        default:
          this.loading = false;
          break;
      }
    }else{
      this.message.warning("用户信息验证未通过，请确认")
    }
  }

  reset() {
    switch (this.option) {
      case 'edit':
        this.getUser();
        this.confirm = '';
        break;
      case 'new':
        this.user = {};
        break;
      default:
        break;
    }
  }

  close() {
    this.result.emit(true);
  }

  //验证
  valide() {
    if (this.user['password'] != this.confirm) {
      this.confirmOK = false;
      this.confirmStatus = 'error';
    } else {
      this.confirmOK = true;
      this.confirmStatus = 'success';
    }
    if (this.user['password']) {
      if (this.user['password'].length > 16 || this.user['password'].length < 6) {
        this.lengthOK = false;
        this.lengthStatus = 'error';
      } else {
        this.lengthOK = true;
        this.lengthStatus = 'success';
      }
    }
  }

  ngOnInit() {
  }

}
