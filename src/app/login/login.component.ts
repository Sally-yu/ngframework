import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {da_DK, NzMessageService} from 'ng-zorro-antd';
import {RsaService} from '../rsa.service';
import {UrlService} from '../url.service';
import {UserService} from '../user.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
              private rsa: RsaService,
              private http: HttpClient,
              private url: UrlService,
  ) {
  }

  login() {
    this.userSrv.login(this.validateForm.value.username, this.validateForm.value.password).then(res => {
      if (res['status']) {
        document.cookie = res['data'];
        this.router.navigate(['/']);
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
