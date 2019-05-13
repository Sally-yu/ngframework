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
