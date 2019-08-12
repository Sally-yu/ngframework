import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list.component';
import {AddUserComponent} from './add-user/add-user.component';
import {
  NgZorroAntdModule,
} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: UserListComponent}
];

@NgModule({
  declarations: [UserListComponent,AddUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)

  ]
})
export class UserListModule { }
