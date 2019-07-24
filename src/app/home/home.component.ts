/***
 *                                         ,s555SB@@&
 *                                      :9H####@@@@@Xi
 *                                     1@@@@@@@@@@@@@@8
 *                                   ,8@@@@@@@@@B@@@@@@8
 *                                  :B@@@@X3hi8Bs;B@@@@@Ah,
 *             ,8i                  r@@@B:     1S ,M@@@@@@#8;
 *            1AB35.i:               X@@8 .   SGhr ,A@@@@@@@@S
 *            1@h31MX8                18Hhh3i .i3r ,A@@@@@@@@@5
 *            ;@&i,58r5                 rGSS:     :B@@@@@@@@@@A
 *             1#i  . 9i                 hX.  .: .5@@@@@@@@@@@1
 *              sG1,  ,G53s.              9#Xi;hS5 3B@@@@@@@B1
 *               .h8h.,A@@@MXSs,           #@H1:    3ssSSX@1
 *               s ,@@@@@@@@@@@@Xhi,       r#@@X1s9M8    .GA981
 *               ,. rS8H#@@@@@@@@@@#HG51;.  .h31i;9@r    .8@@@@BS;i;
 *                .19AXXXAB@@@@@@@@@@@@@@#MHXG893hrX#XGGXM@@@@@@@@@@MS
 *                s@@MM@@@hsX#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&,
 *              :GB@#3G@@Brs ,1GM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B,
 *            .hM@@@#@@#MX 51  r;iSGAM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8
 *          :3B@@@@@@@@@@@&9@h :Gs   .;sSXH@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:
 *      s&HA#@@@@@@@@@@@@@@M89A;.8S.       ,r3@@@@@@@@@@@@@@@@@@@@@@@@@@@r
 *   ,13B@@@@@@@@@@@@@@@@@@@5 5B3 ;.         ;@@@@@@@@@@@@@@@@@@@@@@@@@@@i
 *  5#@@#&@@@@@@@@@@@@@@@@@@9  .39:          ;@@@@@@@@@@@@@@@@@@@@@@@@@@@;
 *  9@@@X:MM@@@@@@@@@@@@@@@#;    ;31.         H@@@@@@@@@@@@@@@@@@@@@@@@@@:
 *   SH#@B9.rM@@@@@@@@@@@@@B       :.         3@@@@@@@@@@@@@@@@@@@@@@@@@@5
 *     ,:.   9@@@@@@@@@@@#HB5                 .M@@@@@@@@@@@@@@@@@@@@@@@@@B
 *           ,ssirhSM@&1;i19911i,.             s@@@@@@@@@@@@@@@@@@@@@@@@@@S
 *              ,,,rHAri1h1rh&@#353Sh:          8@@@@@@@@@@@@@@@@@@@@@@@@@#:
 *            .A3hH@#5S553&@@#h   i:i9S          #@@@@@@@@@@@@@@@@@@@@@@@@@A.
 *
 *
 *    又看源码
 **/


import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzIconService, NzMessageService, NzTreeNode} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {NotifyService} from '../notify.service';
import {OpcService} from '../services/opc-service/opc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  private dropdown: NzDropdownContextComponent;

  user = {};

  notifList = [];

  menuList = 'all'; //菜单选项 全部 收藏 共享

  tabIndex = 0; //激活tab页的index

  searchExp = false; //菜单面板搜索框展开

  searchValue = ''; //双向绑定搜索关键字

  menuExp = true; //菜单栏展开

  activedNode: {}; //激活选中的树节点

  active = '000'; //当前激活tab页的key 默认首页

  tabs = []; //tab页内容数组，元素格式是数的子节点


  // customTopo = {
  //   title: '拓扑监控',
  //   key: '700',
  //   expanded: false,
  //   icon: 'gateway',
  //   children: []
  // }; //自定义菜单，仿照树节点结构
  //
  // cusGrafana = {
  //   title: '实时监控',
  //   key: '800',
  //   expanded: false,
  //   icon: 'line-chart',
  //   children: [
  //     {
  //       title: '设备数字运维Max',
  //       key: 'jgq_eofiz',
  //       url: 'http://10.24.20.45:8080/d/jgq_eofiz',
  //       isLeaf: true,
  //       fav: false,
  //       share: true,
  //       icon: 'dashboard'
  //     },
  //     {
  //       title: '设备数字运维Mini',
  //       key: 'f3478uifv',
  //       url: 'http://10.24.20.45:8080/d/f3478uifv',
  //       isLeaf: true,
  //       fav: false,
  //       share: false,
  //       icon: 'dashboard'
  //     },
  //     {
  //       title: '设备数字运维IE',
  //       key: 'W884LJ3mz',
  //       url: 'http://10.24.20.45:8080/d/W884LJ3mz',
  //       isLeaf: true,
  //       fav: true,
  //       share: false,
  //       icon: 'dashboard'
  //     },
  //   ]
  // }; //自定义菜单，仿照树节点结构
  //
  // custom3D = {
  //   title: '仿真监控',
  //   key: '900',
  //   expanded: false,
  //   icon: 'bulb',
  //   children: [
  //     {
  //       title: '模拟设备运转',
  //       key: '9001',
  //       url: 'http://172.31.1.27:9101/MachineTool_drc_parallel.html',
  //       isLeaf: true,
  //       fav: true,
  //       share: false,
  //       icon: 'dashboard'
  //     },
  //   ]
  // }; //自定义菜单，仿照树节点结构

  setting = {
    title: '系统管理',
    key: '104',
    expanded: false,
    icon: 'setting',
    children: []
  }; //系统管理菜单

  options = [
    {title: '个人中心', key: '1040', app: 'user', icon: 'control', isLeaf: true, fav: false, share: false, reload: false},
    // {title: '基本设置', key: '1041', app: 'setting',isLeaf: true, fav: false, share: false},
    {title: '消息通知', key: '1042', app: 'notification', icon: 'control', isLeaf: true, fav: false, share: true, reload: false},
    // {title: '用户列表', key: '1043', app: 'user-list', icon: 'control', isLeaf: true, fav: false, share: false, reload: false},
    // {title: '角色管理', key: '1044', app: 'role', icon: 'control', isLeaf: true, fav: true, share: false, reload: false}
  ]; //用户工具下拉菜单

  optionsAll = [];

  index={
    title: '首页',
    key: '000',
    expanded: false,
    icon: 'home',
    children: [],
    isLeaf: false,
    fav: true,
    share: true,
  };

  allNodes = [
    {
      title: '综合分析',
      key: '202',
      expanded: false,
      icon: 'line-chart',
      children: [
        {title: '分析设计', key: '2021', app: 'grafana-design', isLeaf: true, fav: false, share: false},
        {title: '分析管理', key: '2022', app: 'grafana-mgr', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '拓扑监控',
      key: '200',
      expanded: false,
      icon: 'gateway',
      children: [
        {title: '拓扑图设计', key: '2001', app: 'topo-design', isLeaf: true, fav: false, share: false},
        {title: '拓扑图管理', key: '2002', app: 'topo-mgr', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '仿真监控',
      key: '201',
      expanded: false,
      icon: 'bulb',
      children: [
        {title: '三维仿真设计', key: '2011', app: '3d-design', isLeaf: true, fav: false, share: false},
        {title: '三维仿真管理', key: '2012', app: '3d-mgr', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '算法模型',
      key: '103',
      expanded: false,
      icon: 'robot',
      children: [
        {title: '数据定义', key: '1030', app: 'data-define', isLeaf: true, fav: false, share: true},
      ]
    },

    {
      title: '设备管理',
      key: '100',
      expanded: false,
      icon: 'appstore',
      children: [
        {title: '设备监控', key: '1000', app: 'device-card', isLeaf: true, fav: true, share: false},
        {title: '设备列表', key: '1001', app: 'device-list', isLeaf: true, fav: false, share: false},
        {title: '设备模板', key: '1002', app: 'device-template', isLeaf: true, fav: true, share: true},
      ]
    },
    {
      title: '报警管理',
      key: '101',
      expanded: false,
      icon: 'bell',
      children: [
        {title: '实时报警监控', key: '1010', app: 'alarm-mgr', isLeaf: true, fav: false, share: true},
        {title: '报警策略列表', key: '1011', app: 'alarm-strategy-list', isLeaf: true, fav: true, share: false},
        {title: '报警信息汇总', key: '1012', app: 'alarm-summary', isLeaf: true, fav: false, share: true},
        {title: '报警信息详情', key: '1013', app: 'alarm-detail', isLeaf: true, fav: true, share: false},
        // {title: '报警历史记录', key: '1014', app: 'alarm-history', isLeaf: true, fav: true, share: true}
      ]
    },
    {
      title: '数据管理',
      key: '102',
      expanded: false,
      icon: 'database',
      children: [
        {title: '数据源管理', key: '1020', app: 'db-mgr', isLeaf: true, fav: false, share: false},
        {title: '数据源列表', key: '1021', app: 'data-manage', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '数据订阅',
      key: '301',
      expanded: false,
      icon: 'cloud',
      children: [
        {title: '订阅管理', key: '3011', app: 'cloud-image', isLeaf: true, fav: false, share: false},
        {title: '订阅列表', key: '3012', app: 'cloud-list', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '设备接入',
      key: '300',
      expanded: false,
      icon: 'cluster',
      children: [
        {title: '服务管理', key: '3001', app: 'service-image', isLeaf: true, fav: false, share: false},
        {title: '服务列表', key: '3002', app: 'device-service', isLeaf: true, fav: false, share: false},
      ]
    },
  ]; //所有预置节点，渲染菜单结构

  nodes = []; //用于树列表绑定
  staticNodes; //拼接后的节点，用于刷新菜单不必异步请求，刷新树列表时刷新


  loading = false;
  key;
  notifcount = 0;
  indexFlag = 0;
  ws: WebSocket;

  constructor(
    private userSrv: UserService,
    private url: UrlService,
    private router: Router,
    private http: HttpClient,
    private notifySrv: NotifyService,
    private message: NzMessageService,
    private nzDropdownService: NzDropdownService,
    private OpcService: OpcService,
    private _iconService: NzIconService) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1250422_9drpyoq4o3c.js' //自定义图标一个
    });
  }

  //右悬浮导航新弹出页面
  click(key) {
    let url;
    switch (key) {
      case 'model':
        url = 'http://10.24.20.42:8800';
        break;
      case 'grafana':
        url = this.url.gafanaUrl;
        // if (this.activeExist('grafana')) {
        //   url = this.cusGrafana.children.filter(c => c.key == this.active)[0].url;
        // }
        break;
      case 'topo':
        url = this.url.topoUrl;
        // if (this.activeExist('topo')) {
        //   url = this.customTopo.children.filter(c => c.key == this.active)[0].editUrl;//topo编辑链接和展示链接不同
        // }
        break;
      default:
        break;
    }
    window.open(url);
  }

  //右上用户列表选项，新增或激活tab页
  optionClick(key: string) {
    this.active = key;
    var obj = JSON.parse(JSON.stringify(this.optionsAll.filter(n => n.key === key)[0]));
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) : this.tabs.push(obj) - 1;
  }

  menuClick(node){
    this.active = node['key'];
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(node.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(node.key) : this.tabs.push(node) - 1;
  }

  topoClick(key: string) {
    this.active = key;
    var obj = {title: '拓扑展示', key: '1050', app: 'topo-show', isLeaf: true, fav: true, share: true};
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) : this.tabs.push(obj) - 1;
  }

  modelClick(key: string) {
    this.active = key;
    var obj = {title: '仿真展示', key: '1060', app: '3D-show', isLeaf: true, fav: true, share: true};
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) : this.tabs.push(obj) - 1;
  }

  grafanaClick(key: string) {
    this.active = key;
    var obj = {title: '实时监控', key: '1070', app: 'grafana-show', isLeaf: true, fav: true, share: true};
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) : this.tabs.push(obj) - 1;
  }

  //点击tab页签事件
  selectChange(key) {
    this.tabIndex = this.tabs.map(t => t['key']).indexOf(key);
    // let tab = this.tabs[this.tabIndex];
    this.active = key;
    this.indexFlag = this.indexFlag > 100 ? 0 : this.indexFlag + 1;
    this.findNode(this.nodes, key);
  }

  //激活tab页变更后对应树节点响应
  findNode(nodes, key) {
    nodes.forEach(node => {
      if (!node.isLeaf) {
        if (node.children.length > 0) {
          this.findNode(node.children, key);
        } else {
          if (node.key == key) {
            this.activedNode = node;
            node.selected = true;
            // console.log(this.nodes);
          } else {
            node.selected = false;
          }
        }
      } else if (node.isLeaf) {
        if (node.key == key) {
          this.activedNode = node;
          node.selected = true;
          // console.log(this.nodes);
        } else {
          node.selected = false;
        }
      }
    });
  }

  //关闭tab页
  closeTab(tab): void {
    if (this.tabIndex >= this.tabs.indexOf(tab)) {
      this.tabIndex -= 1;    //删除元素重新检索index有问题，手动修改
    }
    this.tabs.splice(this.tabs.indexOf(tab), 1); //原数组长度缩短，索引改变
    try {
      this.active = this.tabs[this.tabIndex]['key']; //刷新选中tab的key
      this.findNode(this.nodes, this.active);
    } catch (e) {

    }
  }

  //判断tab页是否已打开
  exist(key: string): boolean {
    return this.tabs.map(function (e) {
      return e.key;
    }).indexOf(key) >= 0;
  }

  //切换选择 全部 收藏 共享
  menuSwitch(key: string) {
    this.menuList = key;
    switch (this.menuList) {
      case 'all':
        this.nodes = JSON.parse(JSON.stringify(this.staticNodes));
        break;
      case 'fav':
        this.nodes = JSON.parse(JSON.stringify(this.staticNodes));
        this.nodes.forEach(e => {
          if (e.children.length > 0) {
            e.children = e.children.filter(n => n.fav);
          }
        });
        this.nodes = this.nodes.filter(n => n.fav || n.children.length > 0); //还是filter比较易用
        break;
      case 'share':
        this.nodes = JSON.parse(JSON.stringify(this.staticNodes));
        this.nodes.forEach(e => {
          if (e.children.length > 0) {
            e.children = e.children.filter(n => n.share);
          }
        });
        this.nodes = this.nodes.filter(n => n.share || n.children.length > 0);
        break;
      default:
        break;
    }
  }

  //ant表示有用，具体有啥用，怎么用，如何运作，能否删除，没研究
  nzEvent(event: NzFormatEmitEvent): void {
  }

  //异步获取布局图
  getWorkSpc() {
    // return new Promise((resolve, reject) => {
    //   const data = {
    //     opt: 'released',
    //     workspace: {}
    //   };
    //   this.http.post(this.url.listUrl, data)
    //     .toPromise()
    //     .then(res => {
    //         this.workSpc = res;
    //         resolve();
    //       },
    //       msg => {
    //         reject(msg);
    //       }
    //     );
    // });
  }

  reloadTree() {
    this.loading = true;
    this.nodes = JSON.parse(JSON.stringify(this.allNodes)); //深复制防联动
    if (this.user['role'] === 'admin') {
      this.optionsAll = [...JSON.parse(JSON.stringify(this.options)), {
        title: '用户列表',
        key: '1043',
        app: 'user-list',
        icon: 'control',
        isLeaf: true,
        fav: false,
        share: false,
        reload: false
      },
        {title: '角色管理', key: '1044', app: 'role', icon: 'control', isLeaf: true, fav: true, share: false, reload: false}];
    } else {
      this.optionsAll = JSON.parse(JSON.stringify(this.options));
    }
    this.setting.children = JSON.parse(JSON.stringify(this.optionsAll));
    this.nodes = [...this.nodes, JSON.parse(JSON.stringify(this.setting))]; //系统管理
    this.staticNodes = JSON.parse(JSON.stringify(this.nodes));
    this.loading = false;
  }

  getUser() {
    this.key = this.url.key();
    console.log(this.key);
    this.userSrv.getUser(this.key).then(user => {
      this.user = user;
      this.reloadTree();
    });
  }

  logout() {
    document.cookie = '';
    window.location.href = '/';
  }

//同步设备列表
  keepAlive(){
    // console.log("12121212121")
    this.OpcService.getserviceList().then(res => {
      res.forEach(element => {
        if(element.opcstate=="true"){
          this.OpcService.keepServerAlive(element).then(res => {
           if(res=="False"){
            element.opcstate=="false";
            this.OpcService.updateService(element);
           }
          },err => {
            element.opcstate=="false";
            this.OpcService.updateService(element);
          });;
        }
      });

    },err => {
    });
  }

  ngOnInit() {
    var cookie = document.cookie;
    if (!cookie) {
      this.router.navigate(['/login']);
    }
    if (cookie) {
      this.getUser();
      this.connectWs();
      this.tabs.push({
          title: '首页',
          key: '000',
          expanded: false,
          icon: 'home',
          children: [],
          isLeaf: false,
          fav: true,
          share: true,
        },
      );
      setInterval(() => { this.keepAlive(); }, 10000);
      console.log('祝贺你喜提彩蛋！🍭\n欢迎来我公司搬砖😘\n发现有飘红请忍着🙃\n或者来我司自己改😁');
    }
  }

  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    var self = this;
    this.ws = new WebSocket('ws://10.24.20.71:7777/notify');
    this.ws.onopen = function (event) {
    };
    this.ws.onmessage = function (event) {

      if (JSON.stringify(self.notifList) != event.data) {
        console.log('update');
        self.notifList = JSON.parse(event.data);
        self.notifcount = self.notifList.filter(l => l.new).length;
      }
    };
  }

  ngOnDestroy(): void {
    if (this.ws != null) {
      this.ws.close();
    }
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
    console.log(this.dropdown);
  }

  close(): void {
    if (this.dropdown) {
      this.dropdown.close();
    }
  }

  tabRight(tab: any) {
    if (tab.key != '000') {
      if (this.tabIndex >= this.tabs.indexOf(tab)) {
        this.tabIndex -= 1;    //删除元素重新检索index有问题，手动修改
      }
      this.tabs.splice(this.tabs.indexOf(tab), 1); //原数组长度缩短，索引改变
      try {
        this.active = this.tabs[this.tabIndex]['key']; //刷新选中tab的key
        this.findNode(this.nodes, this.active);
      } catch (e) {

      }    }
  }

  closeAllTab() {
    this.tabs=this.tabs.filter(t=>t.key=='000');
    this.active = '000'; //刷新选中tab的key

  }
}
