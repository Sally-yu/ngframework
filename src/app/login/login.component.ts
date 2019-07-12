import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {UrlService} from '../url.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private userSrv: UserService,
              private url: UrlService,
  ) {
  }

  login() {
    this.userSrv.login(this.validateForm.value.username, this.validateForm.value.password).then(res => {
      if (res['status']) {
        var c={
          token:res["data"]["token"],
          key:res["data"]["user"]["key"],
        };
        document.cookie = JSON.stringify(c);
        // document.cookie=res["data"];
        // this.router.navigate(['/']);
        this.message.success("验证成功，请稍候…");
        window.location.href="/" //该跳转后获取的cookie是最新存储的
      } else {
        console.log(res);
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
