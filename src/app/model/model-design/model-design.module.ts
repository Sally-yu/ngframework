import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ModelDesignComponent} from './model-design.component';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

const routes: Routes = [
  {path: '', component: ModelDesignComponent}
];

@NgModule({
  declarations: [
    ModelDesignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ]
})
export class ModelDesignModule { }
