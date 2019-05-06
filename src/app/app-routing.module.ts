import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopoComponent} from './topo/topo.component';
import {GrafanaComponent} from './grafana/grafana.component';
import {ModelComponent} from './model/model.component';
import {DatamgrComponent} from './datamgr/datamgr.component';
import {DataprocessComponent} from './dataprocess/dataprocess.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'topo', component: TopoComponent},
  {path: 'grafana', component: GrafanaComponent},
  {path: 'model', component: ModelComponent},
  {path: 'datamgr', component: DatamgrComponent},
  {path: 'datapro', component: DataprocessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
