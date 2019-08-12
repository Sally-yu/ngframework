import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {PasswordComponent} from './modify/password/password.component';
import {
  NgZorroAntdModule,
} from 'ng-zorro-antd';
import {PhoneComponent} from './modify/phone/phone.component';
import {EmailComponent} from './modify/email/email.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: UserComponent}
];

@NgModule({
  declarations: [UserComponent, PasswordComponent, PhoneComponent, EmailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule {
}
