import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DeviceCardComponent} from './device-card.component';
import {
  NzButtonModule,
  NzCardModule,
  NzFormModule, NzIconModule,
  NzInputModule, NzListModule, NzPaginationModule,
  NzSelectModule,
  NzSwitchModule,
  NzTableModule
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {DeviceTableComponent} from './device-table/device-table.component';
import {DeviceDetailComponent} from './device-detail/device-detail.component';

const routes: Routes = [
  {path: '', component: DeviceCardComponent}
];

@NgModule({
  declarations: [DeviceCardComponent,DeviceTableComponent,DeviceDetailComponent],
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
    FormsModule,
    ColorPickerModule,
    RouterModule.forChild(routes)
  ],
  schemas:[
  ]
})
export class DeviceCardModule {
}
