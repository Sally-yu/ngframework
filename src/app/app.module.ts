import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {AlarmMgrComponent} from './tabs/alarm/alarm-mgr/alarm-mgr.component';
import {AlarmStrategyListComponent} from './tabs/alarm/alarm-strategy-list/alarm-strategy-list.component';
import {AlarmSummaryComponent} from './tabs/alarm/alarm-summary/alarm-summary.component';
import {AlarmDetailComponent} from './tabs/alarm/alarm-detail/alarm-detail.component';
import {SigninComponent} from './signin/signin.component';
import {DbMgrComponent} from './tabs/data-mgr/data-image/db-mgr.component';
import {DataDefineComponent} from './tabs/data-process/data-define/data-define.component';
import {AddAlarmStrategyComponent} from './tabs/alarm/alarm-strategy-list/add-alarm-strategy/add-alarm-strategy.component';
import {EditAlarmSummaryComponent} from './tabs/alarm/alarm-summary/edit-alarm-summary/edit-alarm-summary.component';
import {EditAlarmMgrComponent} from './tabs/alarm/alarm-mgr/edit-alarm-mgr/edit-alarm-mgr.component';
import {ForgetComponent} from './forget/forget.component';
import {DataManageComponent} from './tabs/data-mgr/data-list/data-manage.component';
import {AddDbMgrComponent} from './tabs/data-mgr/data-detail/add-db-mgr.component';
import {DeviceServiceComponent} from './tabs/device-service/service-list/device-service.component';
import {ServiceDetailComponent} from './tabs/device-service/service-detail/service-detail.component';
import {ServiceImageComponent} from './tabs/device-service/service-image/service-image.component';
import {MonitorService} from './services/monitor-service/monitor.service';
import {CloudListComponent} from './tabs/cloud-service/cloud-list/cloud-list.component';
import {CloudImageComponent} from './tabs/cloud-service/cloud-image/cloud-image.component';
import {CloudDetailComponent} from './tabs/cloud-service/cloud-detail/cloud-detail.component';
import {LoginComponent} from './login/login.component';
import {SimpleReuseStrategy} from './service/SimpleReuseStrategy';
import {IndexComponent} from './index/index.component';
import {SafePipe} from './safe.pipe';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

registerLocaleData(zh);

const routes: Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path: 'index', component: HomeComponent,children:[
      {path:'home',component:IndexComponent,data:{key:'home',title:'首页'},outlet:'aux'},

      {path:'devicecard',loadChildren:'./tabs/device-mgr/device-card/device-card.module#DeviceCardModule',data:{key:'devicecard',title:'设备监控'},outlet:'aux'},
      {path:'devicelist',loadChildren:'./tabs/device-mgr/device-list/device-list.module#DeviceListModule',data:{key:'devicelist',title:'设备列表'},outlet:'aux'},
      {path:'devicetem',loadChildren:'./tabs/device-mgr/device-template/device-template.module#DeviceTemplateModule',data:{key:'devicetem',title:'设备模板'},outlet:'aux'},

      {path:'notification',loadChildren:'./tabs/user-mgr/notification/notification.module#NotificationModule',data:{key:'notification',title:'消息通知'},outlet:'aux'},
      {path:'user',loadChildren:'./tabs/user-mgr/user/user.module#UserModule',data:{key:'user',title:'个人中心'},outlet:'aux'},
      {path:'userlist',loadChildren:'./tabs/user-mgr/user-list/user-list.module#UserListModule',data:{key:'userlist',title:'用户列表'},outlet:'aux'},
      {path:'role',loadChildren:'./tabs/user-mgr/role/role.module#RoleModule',data:{key:'role',title:'角色管理'},outlet:'aux'},

      {path:'topodesign',loadChildren:'./topo/topo-design/topo-design.module#TopoDesignModule',data:{key:'topodesign',title:'拓扑图设计'},outlet:'aux'},
      {path:'topomgr',loadChildren:'./topo/topo-mgr/topo-mgr.module#TopoMgrModule',data:{key:'topomgr',title:'拓扑图管理'},outlet:'aux'},
      {path:'toposhow',loadChildren:'./topo-show/topo-show.module#TopoShowModule',data:{key:'toposhow',title:'拓扑监控'},outlet:'aux'},

      {path:'modeldesign',loadChildren:'./model/model-design/model-design.module#ModelDesignModule',data:{key:'modeldesign',title:'三维仿真设计'},outlet:'aux'},
      {path:'modelmgr',loadChildren:'./model/model-mgr/model-mgr.module#ModelMgrModule',data:{key:'modelmgr',title:'三维仿真管理'},outlet:'aux'},
      {path:'modelshow',loadChildren:'./model3d-show/model3d-show.module#Model3dShowModule',data:{key:'modelshow',title:'仿真展示'},outlet:'aux'},

      {path:'grafanadesign',loadChildren:'./grafana/grafana-design/grafana-design.module#GrafanaDesignModule',data:{key:'grafanadesign',title:'分析设计'},outlet:'aux'},
      {path:'grafanademgr',loadChildren:'./grafana/grafana-mgr/grafana-mgr.module#GrafanaMgrModule',data:{key:'grafanademgr',title:'分析管理'},outlet:'aux'},
      {path:'grafanashow',loadChildren:'./grafana-show/grafana-show.module#GrafanaShowModule',data:{key:'grafanashow',title:'实时监控'},outlet:'aux'},

    ]},
  {path: 'login', component:LoginComponent},
  {path: 'signin', loadChildren:'./signin/signin.module#SigninModule'},
  {path: 'forget', loadChildren: './forget/forget.module#ForgetModule'},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    SafePipe,
    LoginComponent,
    AlarmMgrComponent,
    AlarmStrategyListComponent,
    AddAlarmStrategyComponent,
    AlarmSummaryComponent,
    AlarmDetailComponent,
    SigninComponent,
    ServiceImageComponent,
    DbMgrComponent,
    DataDefineComponent,
    EditAlarmSummaryComponent,
    EditAlarmMgrComponent,
    ForgetComponent,
    DataManageComponent,
    AddDbMgrComponent,
    DeviceServiceComponent,
    ServiceDetailComponent,
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
    RouterModule.forRoot(routes),
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: NZ_ICONS, useValue: icons},
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy },
    MonitorService
  ],
  bootstrap: [AppComponent],
  schemas: [
  ]

})
export class AppModule {
}
