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
  loading ;
  option;
  user={};

  constructor(
    private userSrv:UserService,
    private message: NzMessageService
  ) {
  }

  cancelAdd(event) {
    if (event) {
      this.addUser = false;
    }
    this.getList();
  }

  getList() {
    this.loading=true;
    this.userSrv.getList().then(res=>{
      this.userList=res["list"];
      this.loading=false;
    });
  }

  remove(key:string){
    this.loading=true;
    this.userSrv.remove(key).then(res=>{
      if(res) {
        this.getList();
      }
      this.loading=false;
    })
  }

  ngOnInit() {
    this.getList();
  }


}
