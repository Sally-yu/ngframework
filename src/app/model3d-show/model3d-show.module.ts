import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Model3dShowComponent} from './model3d-show.component';
import {Model3dDetailComponent} from './detail/detail.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: Model3dShowComponent}
];

@NgModule({
  declarations: [
    Model3dShowComponent, Model3dDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes),
  ]
})
export class Model3dShowModule {
}
