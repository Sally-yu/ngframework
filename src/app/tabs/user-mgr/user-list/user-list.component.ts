import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {

  userList = [];
  searchValue;
  addUser = false;
  loading;
  pageSize = 10;
  currentIndex = 1;
  sizeOption = [5, 10, 20, 50];

  option;
  user = {};

  constructor(
    private userSrv: UserService,
  ) {
  }

  cancelAdd(event) {
    if (event) {
      this.addUser = false;
      this.getList();
    }
  }

  getList() {
    this.loading = true;
    this.userSrv.getList().then(res => {
      this.userList = res;
      this.loading = false;
    },msg=>{
      this.loading = false;
    });
  }

  remove(key: string) {
    this.loading = true;
    this.userSrv.remove(key).then(res => {
      if (res) {
        this.getList();
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  search() {
    this.loading = true;
    this.userSrv.getList().then(res => {
      this.userList = res;
      if (this.searchValue) {
        this.userList = JSON.parse(JSON.stringify(this.userList)).filter(u => {
          return u.username.indexOf(this.searchValue) >= 0 || u.email.indexOf(this.searchValue) >= 0 || u.phone.indexOf(this.searchValue) >= 0;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  ngOnInit() {
    this.getList();
  }

}
