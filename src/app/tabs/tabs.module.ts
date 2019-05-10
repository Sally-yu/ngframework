import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {SettingComponent} from './setting/setting.component';
import {UserComponent} from './user/user.component';
import {TabsComponent} from './tabs.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {Reuse} from '../reuse';
import {NZ_I18N, NZ_ICONS, zh_CN} from 'ng-zorro-antd';

const ROUTES: Routes = [
    {
      path: '', data: {title: 'index',module:''}, children: [
        {path: 'setting', component: SettingComponent, data: {title: 'settingPage',module:'setting'}},
        {path: 'user', component: UserComponent, data: {title: 'userPage'}},
        {path: 'dashboard', component: DashboardComponent, data: {title: 'dashBoard',module:'user'}},
      ]
    },
  ]
;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: Reuse},
  ],
})
export class TabsModule {
}
