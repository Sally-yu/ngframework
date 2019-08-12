import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeviceTemplateComponent} from './device-template.component';
import {
  NzButtonModule,
  NzCardModule, NzDividerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule, NzLayoutModule, NzListModule, NzPaginationModule,
  NzSelectModule,
  NzSwitchModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {TemplateDetailComponent} from './template-detail/template-detail.component';

const routes: Routes = [
  {path: '', component: DeviceTemplateComponent}
];

@NgModule({
  declarations: [
    DeviceTemplateComponent,TemplateDetailComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzSwitchModule,
    NzCardModule,
    NzSelectModule,
    NzTableModule,
    NzPaginationModule,
    NzListModule,
    NzDividerModule,
    FormsModule,
    NzLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class DeviceTemplateModule { }
