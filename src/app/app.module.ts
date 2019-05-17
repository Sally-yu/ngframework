import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS} from 'ng-zorro-antd';
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
import { DeviceCardComponent } from './tabs/device-mgr/device-card/device-card.component';
import { DeviceListComponent } from './tabs/device-mgr/device-list/device-list.component';
import { DeviceTemplateComponent } from './tabs/device-mgr/device-template/device-template.component';
import { RealtimeDetectionComponent } from './tabs/operation-detect/realtime-detection/realtime-detection.component';
import { OperationDetailsComponent } from './tabs/operation-detect/operation-details/operation-details.component';
import { OperationSummaryComponent } from './tabs/operation-detect/operation-summary/operation-summary.component';
import { AlarmMgrComponent } from './tabs/alarm/alarm-mgr/alarm-mgr.component';
import { AlarmStrategyListComponent } from './tabs/alarm/alarm-strategy-list/alarm-strategy-list.component';
import { AlarmSummaryComponent } from './tabs/alarm/alarm-summary/alarm-summary.component';
import { AlarmDetailComponent } from './tabs/alarm/alarm-detail/alarm-detail.component';
import { AlarmHistoryComponent } from './tabs/alarm/alarm-history/alarm-history.component';
import { TableCodeAnalysisComponent } from './tabs/efficiency/table-code-analysis/table-code-analysis.component';
import { UsageAnalysisComponent } from './tabs/efficiency/usage-analysis/usage-analysis.component';
import { TrendAnalysisComponent } from './tabs/efficiency/trend-analysis/trend-analysis.component';
import { EfficiencyAnalysisComponent } from './tabs/efficiency/efficiency-analysis/efficiency-analysis.component';
import { PriceAnalysisComponent } from './tabs/efficiency/price-analysis/price-analysis.component';
import { NotificationComponent } from './tabs/user-mgr/notification/notification.component';
import { UserListComponent } from './tabs/user-mgr/user-list/user-list.component';
import { RoleComponent } from './tabs/user-mgr/role/role.component';
import { UtilizationDetailComponent } from './tabs/operation-detect/utilization-detail/utilization-detail.component';
import { UtilizationSummaryComponent } from './tabs/operation-detect/utilization-summary/utilization-summary.component';
import {SettingComponent} from './tabs/user-mgr/setting/setting.component';
import {UserComponent} from './tabs/user-mgr/user/user.component';
import { SafePipe } from './safe.pipe';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

registerLocaleData(zh);

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DeviceCardComponent,
    DeviceListComponent,
    DeviceTemplateComponent,
    RealtimeDetectionComponent,
    OperationDetailsComponent,
    OperationSummaryComponent,
    AlarmMgrComponent,
    AlarmStrategyListComponent,
    AlarmSummaryComponent,
    AlarmDetailComponent,
    AlarmHistoryComponent,
    TableCodeAnalysisComponent,
    UsageAnalysisComponent,
    TrendAnalysisComponent,
    EfficiencyAnalysisComponent,
    PriceAnalysisComponent,
    NotificationComponent,
    UserListComponent,
    RoleComponent,
    UtilizationDetailComponent,
    UtilizationSummaryComponent,
    SettingComponent,
    UserComponent,
    SafePipe,
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
    {provide: NZ_ICONS, useValue: icons}
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
