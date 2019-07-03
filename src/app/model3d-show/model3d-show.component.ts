import {Component, OnInit} from '@angular/core';
import {TopoService} from '../topo.service';
import {UrlService} from '../url.service';

@Component({
  selector: 'app-model3d-show',
  templateUrl: './model3d-show.component.html',
  styleUrls: ['./model3d-show.component.less']
})
export class Model3dShowComponent implements OnInit {

  searchValue;
  loading = false;
  currentIndex = 1;
  pageSize = 8;
  viewList = [];
  allList = [
    {
      key: '78934yfr7q023yf89op',
      code: '00001',
      name: '智能工厂',
      cover: '6319ec15009944ca05af9a9f0e2d31a',
      url: 'http://www.hightopo.com/demo/intelligent-idc/',
      released: true,
    }, {
      key: '6924t78q3frghyuil',
      code: '00002',
      name: '智能传输',
      cover: '1001dd0c1678e2c08d0e4028b7685a5',
      url: 'http://www.hightopo.com/demo/intelligent-transformer/index.html',
      released: true,
    }, {
      key: 'f4hu39q2i8po;',
      code: '00003',
      name: '智能仓库',
      cover: '9577bbc8bf0a80209a5373a3dc3d527',
      url: 'http://www.hightopo.com/demo/3DShelve2/index.html',
      released: true,
    }, {
      key: '20q345y8rgtpqefjo',
      code: '00004',
      name: '首都机场',
      cover: 'cb5cb920210b316ae7995d9cf88ca0d',
      url: 'http://www.hightopo.com/demo/airport-building/',
      released: true,
    }, {
      key: '210-279yufvhio',
      code: '00005',
      name: '3D空间',
      cover: '0c0f7aabb7dd07c774c220ca5ada41f',
      url: 'http://www.hightopo.com/demo/Room2.5D/index.html',
      released: true,
    }, {
      key: 'p81394ypf_+8',
      code: '00006',
      name: '格雷众创园',
      cover: '6ee1d5a5caa38caef150bba95340255',
      url: 'http://www.hightopo.com/demo/Plucker/',
      released: true,
    }, {
      key: '82iui)I@#U_+()Yhiokl',
      code: '00007',
      name: '高铁站',
      cover: '816045de88d2fc1638c42bf7dddbe76',
      url: 'http://www.hightopo.com/demo/railway-station/',
      released: true,
    }, {
      key: '82iuf30q794y8hioi)fnau9ou',
      code: '00008',
      name: '智能楼宇',
      cover: '1c42d75b3ebe051bef3c925b71e11d9',
      url: 'http://www.hightopo.com/demo/ht-smart-building/index.html',
      released: true,
    },
  ];
  list=[];

  url='http://10.24.20.71:9098/assets/upload/';

  detialUrl;
  cardColor = '#deeef9dd';

  constructor(
  ) {
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
      self.list = JSON.parse(JSON.stringify(this.allList)).filter(w => {
        return w.name.indexOf(self.searchValue) >= 0 || w.code.indexOf(self.searchValue) >= 0;
      });
      self.spliceViewList();
    }
  }

  getList() {
    this.loading = true;
    this.list = this.allList.filter(l => l.released);
    this.spliceViewList();
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
    this.viewList = JSON.parse(JSON.stringify(this.list)).splice((this.currentIndex - 1) * this.pageSize, this.pageSize);
    this.loading=false;
  }

  cancel($event: any) {
    if (event) {
      this.detialUrl=null;
      this.getList();
    }
  }

  view(obj: any) {
    this.detialUrl=obj.url;
  }

}
