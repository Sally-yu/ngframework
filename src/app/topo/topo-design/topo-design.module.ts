import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TopoDesignComponent} from './topo-design.component';
import {
  NgZorroAntdModule,
  NzButtonModule,
  NzCollapseModule,
  NzDividerModule,
  NzFormModule,
  NzIconModule, NzInputModule,
  NzModalModule,
  NzSelectModule, NzSwitchModule, NzTableModule,
  NzUploadListComponent, NzUploadModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';

const routes: Routes = [
  {path: '', component: TopoDesignComponent}
];

@NgModule({
  declarations: [TopoDesignComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ]
})
export class TopoDesignModule { }
