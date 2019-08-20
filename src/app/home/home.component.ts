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
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzIconService, NzMessageService} from 'ng-zorro-antd';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {NotifyService} from '../notify.service';
import {OpcService} from '../services/opc-service/opc.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SimpleReuseStrategy} from '../service/SimpleReuseStrategy';
import {filter, map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'url-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  //tab右键弹出菜单
  private dropdown: NzDropdownContextComponent;

  user = {}; //用户

  notifList = []; //消息通知列表

  menuList = 'all'; //菜单选项 全部 收藏 共享

  tabIndex = 0; //激活tab页的index

  searchExp = false; //菜单面板搜索框展开

  searchValue = ''; //双向绑定搜索关键字

  menuExp = true; //菜单栏展开

  active = '000'; //当前激活tab页的key 默认首页

  tabs = []; //tab页内容数组，元素格式是数的子节点

  setting = {
    title: '系统管理',
    key: '104',
    expanded: false,
    icon: 'setting',
    children: []
  }; //系统管理菜单

  options = [
    {title: '个人中心', key: '1040', url: 'user', icon: 'control', isLeaf: true, fav: false, share: false, reload: false},
    {title: '消息通知', key: '1042', url: 'notification', icon: 'control', isLeaf: true, fav: false, share: true, reload: false},
  ]; //用户工具下拉菜单

  optionsAll = [];

  index = {
    title: '首页',
    key: '000',
    expanded: false,
    icon: 'home',
    children: [],
    isLeaf: false,
    fav: true,
    share: true,
    url: 'home',
  }; //首页菜单项

  allNodes = [
    {
      title: '综合分析',
      key: '202',
      expanded: false,
      icon: 'line-chart',
      children: [
        {title: '分析设计', key: '2021', url: 'grafanadesign', isLeaf: true, fav: false, share: false},
        {title: '分析管理', key: '2022', url: 'grafanamgr', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '拓扑监控',
      key: '200',
      expanded: false,
      icon: 'gateway',
      children: [
        {title: '拓扑图设计', key: '2001', url: 'topodesign', isLeaf: true, fav: false, share: false},
        {title: '拓扑图管理', key: '2002', url: 'topomgr', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '仿真监控',
      key: '201',
      expanded: false,
      icon: 'bulb',
      children: [
        {title: '三维仿真设计', key: '2011', url: 'modeldesign', isLeaf: true, fav: false, share: false},
        {title: '三维仿真管理', key: '2012', url: 'modelmgr', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '算法模型',
      key: '103',
      expanded: false,
      icon: 'robot',
      children: [
        {title: '数据定义', key: '1030', url: 'data-define', isLeaf: true, fav: false, share: true},
      ]
    },

    {
      title: '设备管理',
      key: '100',
      expanded: false,
      icon: 'appstore',
      children: [
        {title: '设备监控', key: '1000', url: 'devicecard', isLeaf: true, fav: true, share: false},
        {title: '设备列表', key: '1001', url: 'devicelist', isLeaf: true, fav: false, share: false},
        {title: '设备模板', key: '1002', url: 'devicetem', isLeaf: true, fav: true, share: true},
      ]
    },
    {
      title: '报警管理',
      key: '101',
      expanded: false,
      icon: 'bell',
      children: [
        {title: '实时报警监控', key: '1010', url: 'alarm-mgr', isLeaf: true, fav: false, share: true},
        {title: '报警策略列表', key: '1011', url: 'alarm-strategy-list', isLeaf: true, fav: true, share: false},
        {title: '报警信息汇总', key: '1012', url: 'alarm-summary', isLeaf: true, fav: false, share: true},
        {title: '报警信息详情', key: '1013', url: 'alarm-detail', isLeaf: true, fav: true, share: false},
        // {title: '报警历史记录', key: '1014', url: 'alarm-history', isLeaf: true, fav: true, share: true}
      ]
    },
    {
      title: '数据管理',
      key: '102',
      expanded: false,
      icon: 'database',
      children: [
        {title: '数据源管理', key: '1020', url: 'db-mgr', isLeaf: true, fav: false, share: false},
        {title: '数据源列表', key: '1021', url: 'data-manage', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '数据订阅',
      key: '301',
      expanded: false,
      icon: 'cloud',
      children: [
        {title: '订阅管理', key: '3011', url: 'cloud-image', isLeaf: true, fav: false, share: false},
        {title: '订阅列表', key: '3012', url: 'cloud-list', isLeaf: true, fav: false, share: false},
      ]
    },
    {
      title: '设备接入',
      key: '300',
      expanded: false,
      icon: 'cluster',
      children: [
        {title: '服务管理', key: '3001', url: 'service-image', isLeaf: true, fav: false, share: false},
        {title: '服务列表', key: '3002', url: 'device-service', isLeaf: true, fav: false, share: false},
      ]
    },
  ]; //所有预置节点，渲染菜单结构

  nodes = []; //用于树列表绑定
  staticNodes; //拼接后的节点，用于刷新菜单不必异步请求，刷新树列表时刷新


  loading = false;
  key;
  notifcount = 0;
  ws: WebSocket; //消息通知ws

  constructor(
    private userSrv: UserService,
    private url: UrlService,
    private router: Router,
    private http: HttpClient,
    private notifySrv: NotifyService,
    private message: NzMessageService,
    private nzDropdownService: NzDropdownService,
    private OpcService: OpcService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _iconService: NzIconService) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1250422_9drpyoq4o3c.js' //自定义图标一个
    });
    // 路由事件
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // filter(route => route.outlet === 'primary'),
      filter(route => route.data != null),
      mergeMap(route => route.data),
      tap(event => {
      })
    ).subscribe((event) => {
      // 路由data的标题
      const menu = {...event};
      if (menu.key) {
        if (this.tabs.filter(t => t.key == 'home').length <= 0) {
          this.router.navigate(['/index', {outlets: {aux: 'home'}}]);
        }
        console.log(menu);
        this.titleService.setTitle(menu.title); // 设置网页标题
        const exitMenu = this.tabs.find(info => info.key === menu.key);
        if (!exitMenu) {// 如果不存在那么不添加，
          this.tabs.push(menu);
        }
        this.tabIndex = this.tabs.findIndex(p => p.key === menu.key);
      } else {
        this.router.navigate(['/index', {outlets: {aux: 'home'}}]);
      }
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

  //点击tab页签事件
  selectChange($event) {
    this.tabIndex = $event.index;
    // 跳转路由
    this.router.navigate(['/index', {outlets: {aux: this.tabs[this.tabIndex].key}}]);
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

  //重新加载菜单
  reloadTree() {
    this.loading = true;
    this.nodes = JSON.parse(JSON.stringify(this.allNodes)); //深复制防联动
    if (this.user['role'] === 'admin') {
      this.optionsAll = [...JSON.parse(JSON.stringify(this.options)), {
        title: '用户列表',
        key: '1043',
        url: 'userlist',
        icon: 'control',
        isLeaf: true,
        fav: false,
        share: false,
        reload: false,
      },
        {title: '角色管理', key: '1044', url: 'role', icon: 'control', isLeaf: true, fav: true, share: false, reload: false}];
    } else {
      this.optionsAll = JSON.parse(JSON.stringify(this.options));
    }
    this.setting.children = JSON.parse(JSON.stringify(this.optionsAll));
    this.nodes = [...this.nodes, JSON.parse(JSON.stringify(this.setting))]; //系统管理
    this.staticNodes = JSON.parse(JSON.stringify(this.nodes));
    this.loading = false;
  }

  //获取用户信息
  getUser() {
    this.key = this.url.key();
    console.log(this.key);
    this.userSrv.getUser(this.key).then(user => {
      this.user = user;
      this.reloadTree();
    });
  }

  //退出登录
  logout() {
    document.cookie = '';
    window.location.href = '/login';
  }

//同步设备列表
  keepAlive() {
    this.OpcService.getserviceList().then(res => {
      res.forEach(element => {
        if (element.opcstate == 'true') {
          this.OpcService.keepServerAlive(element).then(res => {
            if (res == 'False') {
              element.opcstate = 'false';
              this.OpcService.updateService(element);
            }
          }, err => {
            element.opcstate = 'false';
            this.OpcService.updateService(element);
          });
        }
      });

    }, err => {
    });
  }

  ngOnInit() {
    var cookie = document.cookie;
    if (!cookie) {
      window.location.href = '/login';
    }
    if (cookie) {
      this.getUser();
      this.connectWs();
      //opc设备检查
      // setInterval(() => {
      //   this.keepAlive();
      // }, 10000);
      console.log('祝贺你喜提彩蛋！🍭\n欢迎来我公司搬砖😘\n发现有飘红请忍着🙃\n或者来我司自己改😁');
    }
  }

  //消息通知ws
  connectWs() {
    this.closeWs();
    this.ws = new WebSocket('ws://10.24.20.71:7777/notify');
    this.ws.onmessage = (event) => {
      this.notifList = JSON.parse(event.data);
      this.notifcount = this.notifList.filter(l => l.new).length;
    };
}

  closeWs() {
    if (this.ws && this.ws.readyState == WebSocket.CONNECTING) {
      this.ws.close();
    }
  }

  ngOnDestroy(): void {
    this.closeWs();
  }

  //tab右键下拉菜单
  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
    console.log(this.dropdown);
  }

  //tab右键下拉菜单关闭
  close(): void {
    if (this.dropdown) {
      this.dropdown.close();
    }
  }

  //tab右键展示下拉菜单
  tabRight(tab: any) {
    if (tab.key != '000') {
      if (this.tabIndex >= this.tabs.indexOf(tab)) {
        this.tabIndex -= 1;    //删除元素重新检索index有问题，手动修改
      }
      this.tabs.splice(this.tabs.indexOf(tab), 1); //原数组长度缩短，索引改变
      try {
        this.active = this.tabs[this.tabIndex]['key']; //刷新选中tab的key
        // this.findNode(this.nodes, this.active);
      } catch (e) {

      }
    }
  }

  // 关闭选项标签
  closeTab(tab) {
    if (tab.key == 'home') {
      return;
    }
    if (this.tabs.length <= 1) {
      return;
    }
    console.log(tab);
    // 如果当前删除的对象是当前选中的，那么需要跳转
    if (this.tabIndex == this.tabs.indexOf(tab)) {
      if (this.tabIndex > 0) {
        this.router.navigate(['/index', {outlets: {aux: this.tabs[this.tabIndex - 1].key}}]);
      } else {
        this.router.navigate(['/index', {outlets: {aux: this.tabs[this.tabIndex + 1].key}}]);
      }
    }
    this.tabs = this.tabs.filter(t => t != tab);
    //变更路由会存储路由快照，延时删除
    setTimeout(() => {
      SimpleReuseStrategy.deleteRouteSnapshot(tab.key); //路由复用删除快照
    }, 500);
  }

  //关闭所有标签页，index除外
  closeAllTab() {
    this.tabs.forEach(t => {
      if (t.key != 'home') {
        //路由变更会存储快照，延时删除
        setTimeout(() => {
          SimpleReuseStrategy.deleteRouteSnapshot(t.key); //路由复用删除快照
        }, 500);
      }
    });
    this.tabs = this.tabs.filter(t => t.key == 'home');
    this.router.navigate(['/index', {outlets: {aux: 'home'}}]);
  }
}
