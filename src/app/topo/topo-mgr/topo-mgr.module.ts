import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopoMgrComponent} from './topo-mgr.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

const routes: Routes = [
  {path: '', component: TopoMgrComponent}
];

@NgModule({
  declarations: [
    TopoMgrComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ]
})
export class TopoMgrModule {
}
