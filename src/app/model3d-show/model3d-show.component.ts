import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TopoService} from '../topo.service';
import {UrlService} from '../url.service';
import {ModelService} from '../model.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-model3d-show',
  templateUrl: './model3d-show.component.html',
  styleUrls: ['./model3d-show.component.less']
})
export class Model3dShowComponent implements OnInit,OnChanges {

  @Input() flag;

  searchValue;
  loading = false;
  currentIndex = 1;
  pageSize = 8;
  viewList = [];
  // allList = [
  //   {
  //     "key": "fnwu9pqrhuadsf3",
  //     "code": "00001",
  //     "name": "循环水泵",
  //     "cover": "3df242d55cdbc2568317ec79420a4b2",
  //     "url": "http://www.hightopo.com/demo/CirculatingWaterPump/index.html",
  //     "released": true,
  //   },
  //   {
  //     key: '1342efwdsc',
  //     code: '00002',
  //     name: '生产控制系统',
  //     cover: '4a07faf29b04995191207e749473ebf',
  //     url: 'http://www.hightopo.com/demo/ProductionControl/',
  //     released: true,
  //   },
  //   {
  //     key: 'f4hu39q2i8po;',
  //     code: '00003',
  //     name: '产线监控',
  //     cover: 'fb42564746ad4afa2ff0e8ca8d2fb6e',
  //     url: 'http://www.hightopo.com/demo/productLining/',
  //     released: true,
  //   },
  //   {
  //     key: '7b1da3173a0fc853b88b367b2d403e6',
  //     code: '00004',
  //     name: 'PID系统',
  //     cover: '7b1da3173a0fc853b88b367b2d403e6',
  //     url: 'http://www.hightopo.com/demo/PID-feed-system/',
  //     released: true,
  //   },
  //   {
  //     key: '4f7d9d312864c70fd33601e73e77579',
  //     code: '00005',
  //     name: '地铁换乘站',
  //     cover: '4f7d9d312864c70fd33601e73e77579',
  //     url: 'http://www.hightopo.com/demo/transfer-station/index.html',
  //     released: true,
  //   },
  //   {
  //     key: '89aaf057d8658fabdbdf46023a9e230',
  //     code: '00007',
  //     name: '高铁站漫游',
  //     cover: '89aaf057d8658fabdbdf46023a9e230',
  //     url: 'http://www.hightopo.com/demo/railway-station/',
  //     released: true,
  //   },
  //   {
  //     key: '78934yfr7q023yf89op',
  //     code: '00001',
  //     name: '智能工厂',
  //     cover: '6319ec15009944ca05af9a9f0e2d31a',
  //     url: 'http://www.hightopo.com/demo/intelligent-idc/',
  //     released: true,
  //   },
  //   {
  //     key: '6924t78q3frghyuil',
  //     code: '00002',
  //     name: '智能传输',
  //     cover: '1001dd0c1678e2c08d0e4028b7685a5',
  //     url: 'http://www.hightopo.com/demo/intelligent-transformer/index.html',
  //     released: true,
  //   },
  //   {
  //     key: 'f4hu39q2i8po;',
  //     code: '00003',
  //     name: '智能仓库',
  //     cover: '9577bbc8bf0a80209a5373a3dc3d527',
  //     url: 'http://www.hightopo.com/demo/3DShelve2/index.html',
  //     released: true,
  //   },
  //   {
  //     key: '20q345y8rgtpqefjo',
  //     code: '00004',
  //     name: '首都机场',
  //     cover: 'cb5cb920210b316ae7995d9cf88ca0d',
  //     url: 'http://www.hightopo.com/demo/airport-building/',
  //     released: true,
  //   },
  //   {
  //     key: '210-279yufvhio',
  //     code: '00005',
  //     name: '3D空间',
  //     cover: '0c0f7aabb7dd07c774c220ca5ada41f',
  //     url: 'http://www.hightopo.com/demo/Room2.5D/index.html',
  //     released: true,
  //   },
  //   {
  //     key: 'p81394ypf_+8',
  //     code: '00006',
  //     name: '格雷众创园',
  //     cover: '6ee1d5a5caa38caef150bba95340255',
  //     url: 'http://www.hightopo.com/demo/Plucker/',
  //     released: true,
  //   },
  //   {
  //     key: '82iui)I@#U_+()Yhiokl',
  //     code: '00007',
  //     name: '高铁站',
  //     cover: '816045de88d2fc1638c42bf7dddbe76',
  //     url: 'http://www.hightopo.com/demo/railway-station/',
  //     released: true,
  //   },
  //   {
  //     key: '82iuf30q794y8hioi)fnau9ou',
  //     code: '00008',
  //     name: '智能楼宇',
  //     cover: '1c42d75b3ebe051bef3c925b71e11d9',
  //     url: 'http://www.hightopo.com/demo/ht-smart-building/index.html',
  //     released: true,
  //   },
  //
  // ];
  allList = [];
  list = [];

  detialUrl;
  cardColor = '#deeef9dd';

  constructor(
    private urlSrv: UrlService,
    private modelSrv: ModelService,
    private userSrv: UserService) {
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
    this.modelSrv.all().then(res => {
      this.allList = res['data'];
      this.list = this.allList.filter(l => l.released);
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

  cancel($event: any) {
    if (event) {
      this.detialUrl = null;
      this.getList();
    }
  }

  view(obj: any) {
    this.detialUrl = obj.url;
  }

  setIndex(item) {
    var user = this.urlSrv.key();
    this.userSrv.getUser(user).then(res => {
      res.index = item.url;
      this.userSrv.update(res).then(r => {

      }, er => {

      });
    }, res => {

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.detialUrl){
      this.ngOnInit();
    }
  }
}
