import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index.component';
import {SafePipe} from '../safe.pipe';

const routes: Routes = [
  {path: '', component: IndexComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ]
})
export class IndexModule {
}
