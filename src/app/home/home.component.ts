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
 *    又看源码，看你**呀
 */

import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzIconService, NzMessageService, NzTreeNode} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {UrlService} from '../url.service';
import {HttpClient} from '@angular/common/http';
import {error} from 'selenium-webdriver';
import {reject} from 'q';
import {UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  user = {};

  menuList = 'all'; //菜单选项 全部 收藏 共享

  tabIndex = 0; //激活tab页的index

  searchExp = false; //菜单面板搜索框展开

  searchValue = ''; //双向绑定搜索关键字

  menuExp = true; //菜单栏展开

  activedNode: {}; //激活选中的树节点

  active = '1000'; //当前激活tab页的key 默认设备卡片

  tabs = []; //tab页内容数组，元素格式是数的子节点

  customTopo = {
    title: '拓扑监控',
    key: '700',
    expanded: false,
    icon: 'gateway',
    children: []
  }; //自定义菜单，仿照树节点结构

  cusGrafana = {
    title: '实时监控',
    key: '800',
    expanded: false,
    icon: 'line-chart',
    children: [
      {
        title: '设备数字运维Max',
        key: 'jgq_eofiz',
        url: 'http://10.24.20.45:8080/d/jgq_eofiz',
        isLeaf: true,
        fav: false,
        share: false,
        icon: 'project'
      },
      {
        title: '设备数字运维Mini',
        key: 'f3478uifv',
        url: 'http://10.24.20.45:8080/d/f3478uifv',
        isLeaf: true,
        fav: false,
        share: false,
        icon: 'project'
      },
      {
        title: '设备数字运维IE',
        key: 'W884LJ3mz',
        url: 'http://10.24.20.45:8080/d/W884LJ3mz',
        isLeaf: true,
        fav: false,
        share: false,
        icon: 'project'
      },
    ]
  }; //自定义菜单，仿照树节点结构

  custom3D = {
    title: '三维监控',
    key: '900',
    expanded: false,
    icon: 'bulb',
    children: [
      {
        title: '模拟设备运转',
        key: '9001',
        url: 'http://172.31.1.27:9101/MachineTool_drc_parallel.html',
        isLeaf: true,
        fav: false,
        share: false,
        icon: 'project'
      },
    ]
  }; //自定义菜单，仿照树节点结构

  setting = {
    title: '系统管理',
    key: '104',
    expanded: false,
    icon: 'setting',
    children: []
  }; //自定义菜单，仿照树节点结构

  options = [
    {title: '个人中心', key: '1040', app: 'user', isLeaf: true, fav: false, share: false},
    // {title: '基本设置', key: '1041', app: 'setting',isLeaf: true, fav: false, share: false},
    {title: '消息通知', key: '1042', app: 'notification', isLeaf: true, fav: false, share: false},
    {title: '用户列表', key: '1043', app: 'user-list', isLeaf: true, fav: false, share: false},
    {title: '角色管理', key: '1044', app: 'role', isLeaf: true, fav: false, share: false}
  ]; //用户工具下拉菜单

  allNodes = [
    {
      title: '设备管理',
      key: '100',
      expanded: false,
      icon: 'appstore',
      children: [
        {title: '设备卡片', key: '1000', app: 'device-card', isLeaf: true, fav: true, share: true},
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
        {title: '报警信息汇总', key: '1012', app: 'alarm-summary', isLeaf: true, fav: true, share: true},
        {title: '报警信息详情', key: '1013', app: 'alarm-detail', isLeaf: true, fav: true, share: true},
        // {title: '报警历史记录', key: '1014', app: 'alarm-history', isLeaf: true, fav: true, share: true}
      ]
    },
    {
      title: '数据管理',
      key: '102',
      expanded: false,
      icon: 'database',
      children: [
        {title: '数据库管理', key: '1020', app: 'db-mgr', isLeaf: true, fav: false, share: true},
      ]
    },
    {
      title: '数据处理',
      key: '103',
      expanded: false,
      icon: 'robot',
      children: [
        {title: '数据定义', key: '1030', app: 'data-define', isLeaf: true, fav: false, share: true},
      ]
    }
  ]; //所有预置节点，渲染菜单结构

  nodes = []; //用于树列表绑定
  staticNodes; //拼接后的节点，用于刷新菜单不必异步请求，刷新树列表时刷新

  workSpc;
  listUrl = this.url.workUrl;
  grafanaUrl = this.url.gafanaUrl;
  topoUrl = this.url.topoUrl;
  loading = false;
  key;
  token;

  constructor(
    private userSrv: UserService,
    private url: UrlService,
    private router: Router,
    private http: HttpClient,
    private message: NzMessageService,
    private nzDropdownService: NzDropdownService,
    private _iconService: NzIconService) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1250422_9drpyoq4o3c.js'
    });
  }

  //树列表父级展开
  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  // 激活节点，赋类，调整样式，tab页响应
  activeNode(data: NzFormatEmitEvent): void {
    if (data.node.origin.isLeaf) {     //仅子节点可选中
      this.activedNode = data.node.origin;
      // var obj = this.activedNode;
      var keys = this.tabs.map(e => e['key']);
      var index = keys.indexOf(this.activedNode['key']);
      this.active = this.activedNode['key'];
      this.tabIndex = index >= 0 ? index : this.tabs.push(this.activedNode) - 1;
    } else {

    }
  }

  // contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
  //   this.dropdown = this.nzDropdownService.create($event, template);
  // }
  //
  // selectDropdown(): void {
  //   this.dropdown.close();
  //   // do something
  // }

  //右悬浮导航新弹出页面
  click(key) {
    let url;
    switch (key) {
      case 'model':
        url = 'http://10.24.20.42:9999/';
        break;
      case 'grafana':
        url = this.grafanaUrl;
        if (this.activeExist('grafana')) {
          url = this.cusGrafana.children.filter(c => c.key == this.active)[0].url;
        }
        break;
      case 'topo':
        url = this.topoUrl;
        if (this.activeExist('topo')) {
          url = this.customTopo.children.filter(c => c.key == this.active)[0].editUrl;//topo编辑链接和展示链接不同
        }
        break;
      case 'datamgr':
        url = '';
        break;
      case 'datapro':
        url = '';
        break;
      default:
        break;
    }
    window.open(url);
  }

  //右上用户列表选项，新增或激活tab页
  optionClick(key: string) {
    this.active = key;
    var obj = JSON.parse(JSON.stringify(this.options.filter(n => n.key === key)[0]));
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) : this.tabs.push(obj) - 1;
  }

  topoClick(key: string) {
    this.active = key;
    var obj = {title: '拓扑设计', key: '1050', app: 'topo', isLeaf: true, fav: true, share: true};
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) : this.tabs.push(obj) - 1;
  }

  modelClick(key: string) {
    this.active = key;
    var obj = {title: '三维设计', key: '1060', app: '3Dmodel', isLeaf: true, fav: true, share: true};
    this.tabIndex = this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) >= 0 ? this.tabs.map(function (e) {
      return e.key;
    }).indexOf(obj.key) : this.tabs.push(obj) - 1;
  }

  grafanaClick(key: string) {
    this.active = key;
    var obj = {title: '监控设计', key: '1070', app: 'grafana', isLeaf: true, fav: true, share: true};
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
    // console.log("active:"+this.active);
    // console.log("event:"+event.index);
    // console.log("index:"+this.tabIndex);
    // console.log("tabs:"+JSON.stringify(this.tabs));
    this.findNode(this.nodes, key);
  }

  //激活tab页变更后对应树节点响应
  findNode(nodes, key) {
    nodes.forEach(node => {
      if (!node.isLeaf) {
        this.findNode(node.children, key);
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

  //自定义菜单子项是否有打开的tab页
  cusExist(key: string): boolean {
    var cus = {
      key: '',
      children: []
    };
    switch (key) {
      case 'topo':
        cus = this.customTopo;
        break;
      case 'grafana':
        cus = this.cusGrafana;
        break;
      case '3d':
        cus = this.custom3D;
        break;
      default:
        break;
    }
    var arr = [];
    cus.children.forEach(e => {
      arr = [...arr, this.exist(e.key)];
    });
    // console.log(arr);
    return arr.indexOf(true) >= 0;
  }

  //激活tab是否在某自定义菜单，需要区分
  activeExist(key: string): boolean {
    var cus = {
      key: '',
      children: []
    };
    switch (key) {
      case 'topo':
        cus = this.customTopo;
        break;
      case 'grafana':
        cus = this.cusGrafana;
        break;
      case '3d':
        cus = this.custom3D;
        break;
      default:
        break;
    }
    return cus.children.map(function (e) {
      return e.key;
    }).indexOf(this.active) >= 0;
  }

  // //展开 关闭 所有菜单
  // expandAll(b: boolean) {
  //   this.nodes.forEach(data => {
  //     data.expanded = b;
  //   });
  //   this.selectDropdown();
  //   this.nodes = JSON.parse(JSON.stringify(this.nodes)); //自我深复制，刷新树列表
  // }

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
          e.children.forEach(c => {
            if (!c.fav) {
              e.children.splice(e.children.indexOf(c), 1);
            }
          });
        });
        break;
      case 'share':
        this.nodes = JSON.parse(JSON.stringify(this.staticNodes));
        this.nodes.forEach(e => {
          e.children.forEach(c => {
            if (!c.share) {
              e.children.splice(e.children.indexOf(c), 1);
            }
          });
        });
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
    return new Promise((resolve, reject) => {
      const data = {
        opt: 'released',
        workspace: {}
      };
      this.http.post(this.listUrl, data)
        .toPromise()
        .then(res => {
            this.workSpc = res;
            this.customTopo.children = [];//清空，避免刷新重复加载
            if (this.workSpc.length > 0) {
              this.workSpc.forEach(w => {
                  let c = {
                    title: w.name,
                    key: w.key,
                    url: 'http://10.24.20.71:9099/topo/detail/' + w.key,
                    editUrl: 'http://10.24.20.71:9099/topo/item/' + w.key,
                    isLeaf: true,
                    fav: false,
                    share: false,
                    icon: 'project'
                  };//url匹配见topo项目
                  this.customTopo.children.push(c);
                }
              );
            }
            resolve();
          },
          msg => {
            reject(msg);
          }
        );
    });
  }

  reloadTree() {
    this.loading = true;
    //网络错误等待不来时不会执行
    this.getWorkSpc().then(_ => {
      this.nodes = JSON.parse(JSON.stringify(this.allNodes)); //深复制防联动
      this.nodes = [...this.nodes, JSON.parse(JSON.stringify(this.customTopo))]; //追加自定义 深复制防联动
      this.nodes = [...this.nodes, JSON.parse(JSON.stringify(this.cusGrafana))]; //自定义grafana
      this.nodes = [...this.nodes, JSON.parse(JSON.stringify(this.custom3D))]; //自定义3D
      this.setting.children = JSON.parse(JSON.stringify(this.options));
      this.nodes = [...this.nodes, JSON.parse(JSON.stringify(this.setting))]; //系统管理
      this.loading = false;
      this.staticNodes = JSON.parse(JSON.stringify(this.nodes));
    }, _ => {
      this.nodes = JSON.parse(JSON.stringify(this.allNodes)); //深复制防联动
      this.staticNodes = JSON.parse(JSON.stringify(this.nodes));
      this.loading = false;
    });
  }

  getUser() {
    this.key = this.url.key();
    console.log(this.key);
    this.userSrv.getUser(this.key).then(user => {
      this.user = user;
    });
  }

  logout() {
    document.cookie = '';
    window.location.href = '/';
  }


  ngOnInit() {
    // var cookie = document.cookie;
    var cookie = document.cookie;
    if (!cookie) {
      this.router.navigate(['/login']);
    }
    if (cookie) {
      // console.log(this.key);
      this.getUser();
      this.reloadTree();
      this.tabs.push({title: '设备卡片', key: '1000', app: 'device-card', isLeaf: true, fav: true, share: true},
      );
      console.log('祝贺你喜提彩蛋！🍭\n欢迎来我公司搬砖😘\n发现有飘红请忍着🙃\n或者来我司自己改😁');
      // console.log(
      //   '                                         ,s555SB@@&\n' +
      //   '                                       :9H####@@@@@Xi\n' +
      //   '                                      1@@@@@@@@@@@@@@8\n' +
      //   '                                    ,8@@@@@@@@@B@@@@@@8\n' +
      //   '                                   :B@@@@X3hi8Bs;B@@@@@Ah,\n' +
      //   '              ,8i                  r@@@B:     1S ,M@@@@@@#8;\n' +
      //   '             1AB35.i:               X@@8 .   SGhr ,A@@@@@@@@S\n' +
      //   '             1@h31MX8                18Hhh3i .i3r ,A@@@@@@@@@5\n' +
      //   '             ;@&i,58r5                 rGSS:     :B@@@@@@@@@@A\n' +
      //   '              1#i  . 9i                 hX.  .: .5@@@@@@@@@@@1\n' +
      //   '               sG1,  ,G53s.              9#Xi;hS5 3B@@@@@@@B1\n' +
      //   '                .h8h.,A@@@MXSs,           #@H1:    3ssSSX@1\n' +
      //   '                s ,@@@@@@@@@@@@Xhi,       r#@@X1s9M8    .GA981\n' +
      //   '                ,. rS8H#@@@@@@@@@@#HG51;.  .h31i;9@r    .8@@@@BS;i;\n' +
      //   '                 .19AXXXAB@@@@@@@@@@@@@@#MHXG893hrX#XGGXM@@@@@@@@@@MS\n' +
      //   '                 s@@MM@@@hsX#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&,\n' +
      //   '               :GB@#3G@@Brs ,1GM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B,\n' +
      //   '             .hM@@@#@@#MX 51  r;iSGAM@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8\n' +
      //   '           :3B@@@@@@@@@@@&9@h :Gs   .;sSXH@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:\n' +
      //   '       s&HA#@@@@@@@@@@@@@@M89A;.8S.       ,r3@@@@@@@@@@@@@@@@@@@@@@@@@@@r\n' +
      //   '    ,13B@@@@@@@@@@@@@@@@@@@5 5B3 ;.         ;@@@@@@@@@@@@@@@@@@@@@@@@@@@i\n' +
      //   '   5#@@#&@@@@@@@@@@@@@@@@@@9  .39:          ;@@@@@@@@@@@@@@@@@@@@@@@@@@@;\n' +
      //   '   9@@@X:MM@@@@@@@@@@@@@@@#;    ;31.         H@@@@@@@@@@@@@@@@@@@@@@@@@@:\n' +
      //   '    SH#@B9.rM@@@@@@@@@@@@@B       :.         3@@@@@@@@@@@@@@@@@@@@@@@@@@5\n' +
      //   '      ,:.   9@@@@@@@@@@@#HB5                 .M@@@@@@@@@@@@@@@@@@@@@@@@@B\n' +
      //   '            ,ssirhSM@&1;i19911i,.             s@@@@@@@@@@@@@@@@@@@@@@@@@@S\n' +
      //   '               ,,,rHAri1h1rh&@#353Sh:          8@@@@@@@@@@@@@@@@@@@@@@@@@#:\n' +
      //   '             .A3hH@#5S553&@@#h   i:i9S          #@@@@@@@@@@@@@@@@@@@@@@@@@A.');
      // console.log('又看log\n还看log\n就知道看log\n看log有啥用？');
    }
  }


}
