import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TopoShowComponent} from './topo-show.component';
import {TopoDetailComponent} from './detail/detail.component';
import {NzCardModule, NzIconModule, NzInputModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: TopoShowComponent}
];

@NgModule({
  declarations: [TopoShowComponent,TopoDetailComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TopoShowModule { }
