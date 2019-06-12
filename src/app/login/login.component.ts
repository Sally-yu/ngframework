import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {da_DK, NzMessageService} from 'ng-zorro-antd';
import {RsaService} from '../rsa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginUrl = 'http://10.24.20.71:9060/user/login';//登录验证url

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private message: NzMessageService,
              private rsa:RsaService,
  ) {
  }

  login() {
    this.rsa.Encrypt(JSON.stringify(this.validateForm.value)).then(value=>{
      if (value){
        this.http.post(this.loginUrl, {user:value}).subscribe(res => {
          let data = res;
          if (data['status']) {
            document.cookie = data["data"];
            this.router.navigate(['/']);
          } else {
            this.message.error(data['msg']);
          }
        }, error1 => {
          this.message.error(error1.error['msg']);
        });
      }
    },err=>{
      this.message.error('用户加密验证出错')
    })
  }



  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
