import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../user.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {
  selectedIndex = 0;
  tabs = [
    {
      code: 'user',
      name: '普通用户',
    },
    {
      code: 'admin',
      name: '管理员',
    }
  ];
  users = [];
  loading = false;
  pageSize = 10;
  currentIndex = 1;
  sizeOption = [5, 10, 20, 50];
  searchValue;

  constructor(
    private userSrv: UserService,
    private message: NzMessageService,
  ) {
  }

  getUsers(role: string) {
    this.loading = true;
    this.userSrv.getList().then(res => {
      this.users = JSON.parse(JSON.stringify(res)).filter(u => u.role == role);
      this.loading = false;
      console.log(this.users);
    }, err => {
      this.loading = false;
    });
  }

  ngOnInit() {
    this.getUsers('user');
  }

  //加载当前tab页users 刷新作用
  tabChange() {
    this.getUsers(this.tabs[this.selectedIndex].code);
  }

  //更新用户角色
  updateRole(user: any) {
    if (user.role == 'user') {
      user.role = 'admin';
    } else if (user.role == 'admin') {
      user.role = 'user';
    }
    this.loading=true;
    this.userSrv.update(user).then(res => {
      this.tabChange()
    }, err => {
      this.tabChange()
    });
  }

  //搜索用户
  search() {
    this.loading = true;
    this.userSrv.getList().then(res => {
        this.users = JSON.parse(JSON.stringify(res)).filter(u => u.role == this.tabs[this.selectedIndex].code);
        if (this.searchValue) {
          this.users = JSON.parse(JSON.stringify(this.users)).filter(d => {
              return d.username.indexOf(this.searchValue) >= 0 || d.email.indexOf(this.searchValue) >= 0 || d.phone.indexOf(this.searchValue) >= 0;
            }
          );
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );

  }
}
