import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgZorroAntdModule,
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
import {DeviceListComponent} from './device-list.component';
import {DeviceDetailComponent} from './device-detail/device-detail.component';
import {ColorPickerModule} from 'ngx-color-picker';

const routes: Routes = [
  {path: '', component: DeviceListComponent}
];

@NgModule({
  declarations: [
    DeviceListComponent,DeviceDetailComponent
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
    ColorPickerModule,

    RouterModule.forChild(routes)
  ],
  schemas:[
  ]
})
export class DeviceListModule { }
