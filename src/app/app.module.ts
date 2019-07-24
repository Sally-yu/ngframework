import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HomeComponent} from './home/home.component';
import {IconDefinition} from '@ant-design/icons-angular';

import * as AllIcons from '@ant-design/icons-angular/icons';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {DeviceCardComponent} from './tabs/device-mgr/device-card/device-card.component';
import {DeviceListComponent} from './tabs/device-mgr/device-list/device-list.component';
import {DeviceTemplateComponent} from './tabs/device-mgr/device-template/device-template.component';
import {AlarmMgrComponent} from './tabs/alarm/alarm-mgr/alarm-mgr.component';
import {AlarmStrategyListComponent} from './tabs/alarm/alarm-strategy-list/alarm-strategy-list.component';
import {AlarmSummaryComponent} from './tabs/alarm/alarm-summary/alarm-summary.component';
import {AlarmDetailComponent} from './tabs/alarm/alarm-detail/alarm-detail.component';
import {NotificationComponent} from './tabs/user-mgr/notification/notification.component';
import {UserListComponent} from './tabs/user-mgr/user-list/user-list.component';
import {RoleComponent} from './tabs/user-mgr/role/role.component';
import {SettingComponent} from './tabs/user-mgr/setting/setting.component';
import {UserComponent} from './tabs/user-mgr/user/user.component';
import {SafePipe} from './safe.pipe';
import {SigninComponent} from './signin/signin.component';
import {AddUserComponent} from './tabs/user-mgr/user-list/add-user/add-user.component';
import {PhoneComponent} from './tabs/user-mgr/user/modify/phone/phone.component';
import {EmailComponent} from './tabs/user-mgr/user/modify/email/email.component';
import {PasswordComponent} from './tabs/user-mgr/user/modify/password/password.component';
import {NotifDetialComponent} from './tabs/user-mgr/notification/detail/notif-detial/notif-detial.component';
import {TemplateDetailComponent} from './tabs/device-mgr/device-template/template-detail/template-detail.component';
import {DeviceDetailComponent} from './tabs/device-mgr/device-list/device-detail/device-detail.component';
import {DbMgrComponent} from './tabs/data-mgr/data-image/db-mgr.component';
import {DataDefineComponent} from './tabs/data-process/data-define/data-define.component';
import {DeviceTableComponent} from './tabs/device-mgr/device-card/device-table/device-table.component';
import {AddAlarmStrategyComponent} from './tabs/alarm/alarm-strategy-list/add-alarm-strategy/add-alarm-strategy.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {EditAlarmSummaryComponent} from './tabs/alarm/alarm-summary/edit-alarm-summary/edit-alarm-summary.component';
import {EditAlarmMgrComponent} from './tabs/alarm/alarm-mgr/edit-alarm-mgr/edit-alarm-mgr.component';
import {IndexComponent} from './index/index.component';
import {ForgetComponent} from './forget/forget.component';
import {DataManageComponent} from './tabs/data-mgr/data-list/data-manage.component';
import {AddDbMgrComponent} from './tabs/data-mgr/data-detail/add-db-mgr.component';
import {DeviceServiceComponent} from './tabs/device-service/service-list/device-service.component';
import {ServiceDetailComponent} from './tabs/device-service/service-detail/service-detail.component';
import {ServiceImageComponent} from './tabs/device-service/service-image/service-image.component';
import {TopoMgrComponent} from './topo/topo-mgr/topo-mgr.component';
import {TopoDesignComponent} from './topo/topo-design/topo-design.component';
import {GrafanaMgrComponent} from './grafana/grafana-mgr/grafana-mgr.component';
import {GrafanaDesignComponent} from './grafana/grafana-design/grafana-design.component';
import {ModelMgrComponent} from './model/model-mgr/model-mgr.component';
import {ModelDesignComponent} from './model/model-design/model-design.component';
import {TopoShowComponent} from './topo-show/topo-show.component';
import {TopoDetailComponent} from './topo-show/detail/detail.component';
import {GrafanaShowComponent} from './grafana-show/grafana-show.component';
import {Model3dShowComponent} from './model3d-show/model3d-show.component';
import {Model3dDetailComponent} from './model3d-show/detail/detail.component';
import {MonitorService} from './services/monitor-service/monitor.service';
import {CloudListComponent} from './tabs/cloud-service/cloud-list/cloud-list.component';
import {CloudImageComponent} from './tabs/cloud-service/cloud-image/cloud-image.component';
import {CloudDetailComponent} from './tabs/cloud-service/cloud-detail/cloud-detail.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

registerLocaleData(zh);

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signin', loadChildren:'./signin/signin.module#SigninModule'},
  {path: 'forget', loadChildren: './forget/forget.module#ForgetModule'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DeviceCardComponent,
    DeviceListComponent,
    DeviceTemplateComponent,
    AlarmMgrComponent,
    AlarmStrategyListComponent,
    AddAlarmStrategyComponent,
    AlarmSummaryComponent,
    AlarmDetailComponent,
    NotificationComponent,
    UserListComponent,
    RoleComponent,
    SettingComponent,
    UserComponent,
    SafePipe,
    SigninComponent,
    AddUserComponent,
    PasswordComponent,
    PhoneComponent,
    EmailComponent,
    NotifDetialComponent,
    TemplateDetailComponent,
    DeviceDetailComponent,
    ServiceImageComponent,
    DbMgrComponent,
    DataDefineComponent,
    DeviceTableComponent,
    EditAlarmSummaryComponent,
    EditAlarmMgrComponent,
    IndexComponent,
    ForgetComponent,
    DataManageComponent,
    AddDbMgrComponent,
    DeviceServiceComponent,
    ServiceDetailComponent,
    TopoMgrComponent,
    TopoDesignComponent,
    GrafanaMgrComponent,
    GrafanaDesignComponent,
    ModelMgrComponent,
    ModelDesignComponent,
    TopoShowComponent,
    TopoDetailComponent,
    GrafanaShowComponent,
    Model3dShowComponent,
    Model3dDetailComponent,
    CloudListComponent,
    CloudImageComponent,
    CloudDetailComponent,
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: NZ_ICONS, useValue: icons},
    MonitorService
  ],
  bootstrap: [AppComponent],
  schemas: [
  ]

})
export class AppModule {
}
