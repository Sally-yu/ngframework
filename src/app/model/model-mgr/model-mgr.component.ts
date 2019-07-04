import {Component, OnInit} from '@angular/core';
import {ModelService} from '../../model.service';

@Component({
  selector: 'app-model-mgr',
  templateUrl: './model-mgr.component.html',
  styleUrls: ['./model-mgr.component.less']
})
export class ModelMgrComponent implements OnInit {
  searchValue;
  loading = false;
  pageSize = 10;
  currentIndex = 1;
  sizeOption = [5, 10, 20, 50];
  list = [];
  viewList = [];
  url;

  constructor(private modelSrv: ModelService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getList();
  }

  search() {
    var self = this;
    var value = JSON.parse(JSON.stringify(this.searchValue));
    if (value === self.searchValue) {
      self.loading = true;
      this.modelSrv.all().then(res => {
        this.list = res['data'].filter(l => l.released);
        self.list = JSON.parse(JSON.stringify(this.list)).filter(w => {
          return w.name.indexOf(self.searchValue) >= 0 || w.code.indexOf(self.searchValue) >= 0;
        });
      }, err => {

      });
      self.spliceViewList();
    }
  }

  getList() {
    this.loading = true;
    this.modelSrv.all().then(res => {
      this.list=res["data"];
      this.spliceViewList();
    }, err => {
      this.spliceViewList();
    });
  }

  //切换页码
  indexChange(n: number) {
    this.currentIndex = n;
    this.loading = true;
    this.spliceViewList();
  }

  //切换每页条数
  sizeChange(n: number) {
    this.pageSize = n;
    this.loading = true;
    this.spliceViewList();
  }

  spliceViewList() {
    if (this.list.length > 0) {
      this.viewList = JSON.parse(JSON.stringify(this.list)).splice((this.currentIndex - 1) * this.pageSize, this.pageSize);
    }
    this.loading = false;
  }

  edit(param) {
    if (param) {

    }
  }

  delete(data: any) {

  }

  preview(data:any) {
    if (data){
      this.url=data.url;
    } else{
      this.url=null;
    }
  }

  release(data: any) {
    this.loading=true;
    data.released=!JSON.parse(JSON.stringify(data.released));
    this.modelSrv.update(data).then(res=>{
      this.loading=false;
    },er=>{
      this.loading=false;
    })
  }
}
