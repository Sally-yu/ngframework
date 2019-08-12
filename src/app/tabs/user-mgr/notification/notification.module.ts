import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotifDetialComponent} from './detail/notif-detial/notif-detial.component';
import {NotificationComponent} from './notification.component';
import {RouterModule, Routes} from '@angular/router';
import {
  NgZorroAntdModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: NotificationComponent}
];

@NgModule({
  declarations: [
    NotifDetialComponent, NotificationComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class NotificationModule {
}
