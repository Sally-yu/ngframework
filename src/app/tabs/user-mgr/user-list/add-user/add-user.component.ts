import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {RsaService} from '../../../../rsa.service';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../../../url.service';
import {UserService} from '../../../../user.service';

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

  pwdOK=true;
  pwdStatus;

  confirm;
  confirmOK = true;
  confirmStatus ;

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
    this.loading = true;
    switch (this.option) {
      case 'edit':
        this.userSrv.update(this.user).then(msg => {
          this.loading = false;
        });
        break;
      case 'new':
        this.userSrv.newUser(this.user).then(msg => {
          this.loading = false;
        });
        break;
      default:
        this.loading=false;
        break;
    }

  }

  reset() {
    switch (this.option) {
      case 'edit':
        this.getUser();
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
    if(this.user["password"]!=this.confirm){
      this.confirmOK=false;
      this.confirmStatus="error";
    }else{
      this.confirmOK=true;
      this.confirmStatus="success";
    }
  }

  ngOnInit() {
  }

}
