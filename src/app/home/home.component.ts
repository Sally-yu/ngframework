import {Component, OnInit, TemplateRef} from '@angular/core';
import {concat} from 'rxjs';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {promise} from 'selenium-webdriver';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  menuList = 'all';

  tabIndex = -1;

  searchExp = false;

  searchValue = ''; //双向绑定搜索关键字

  menuExp = true; //菜单栏展开

  tabs = [];

  dropdown: NzDropdownContextComponent;
  // actived node
  activedNode: NzTreeNode;
  allNodes = [
    {
      title: '设备管理',
      key: '100',
      author: 'NG ZORRO',
      expanded: true,
      icon: 'appstore',
      children: [
        {title: '设备卡片', key: '1000', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '设备列表', key: '1001', author: 'NG ZORRO', isLeaf: true, fav: false, share: false},
        {title: '设备模板', key: '1002', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
      ]
    },
    {
      title: '运行检测',
      key: '101',
      author: 'NG ZORRO',
      expanded: false,
      icon: 'eye',
      children: [
        {title: '实时运行检测', key: '1010', author: 'NG ZORRO', isLeaf: true, fav: false, share: true},
        {title: '设备运行汇总', key: '1011', author: 'NG ZORRO', isLeaf: true, fav: true, share: false},
        {title: '设备运行详情', key: '1012', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '稼动率汇总', key: '1013', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '稼动率详情', key: '1014', author: 'NG ZORRO', isLeaf: true, fav: true, share: true}
      ]
    },
    {
      title: '报警管理',
      key: '102',
      author: 'NG ZORRO',
      expanded: false,
      icon: 'bell',
      children: [
        {title: '实时报警管理', key: '1020', author: 'NG ZORRO', isLeaf: true, fav: false, share: true},
        {title: '报警策略列表', key: '1021', author: 'NG ZORRO', isLeaf: true, fav: true, share: false},
        {title: '报警信息汇总', key: '1022', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '报警信息详情', key: '1023', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '报警历史记录', key: '1024', author: 'NG ZORRO', isLeaf: true, fav: true, share: true}
      ]
    }, {
      title: '能效管理',
      key: '103',
      author: 'NG ZORRO',
      expanded: false,
      icon: 'pie-chart',
      children: [
        {title: '表码分析', key: '1030', author: 'NG ZORRO', isLeaf: true, fav: false, share: true},
        {title: '用量分析', key: '1031', author: 'NG ZORRO', isLeaf: true, fav: true, share: false},
        {title: '用能趋势分析', key: '1032', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '设备能效分析', key: '1033', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '量价费分析', key: '1034', author: 'NG ZORRO', isLeaf: true, fav: true, share: true}
      ]
    },
    {
      title: '用户管理',
      key: '104',
      author: 'NG ZORRO',
      expanded: false,
      icon: 'setting',
      children: [
        {title: '安全设置', key: '1040', author: 'NG ZORRO', isLeaf: true, fav: false, share: true},
        {title: '基本资料', key: '1041', author: 'NG ZORRO', isLeaf: true, fav: true, share: false},
        {title: '消息中心', key: '1042', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '用户列表', key: '1043', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '角色管理', key: '1044', author: 'NG ZORRO', isLeaf: true, fav: true, share: true}
      ]
    },
  ];
  nodes = [];
  childNodes = [];

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

  activeNode(data: NzFormatEmitEvent): void {
    if (data.node.origin.isLeaf) {     //仅子节点可选中
      this.activedNode = data.node!;
      this.tabIndex = this.tabs.indexOf(data.node.title) >= 0 ? this.tabs.indexOf(data.node.title) : this.tabs.push(data.node.title);
    }
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  selectDropdown(): void {
    this.dropdown.close();
    // do something
  }

  constructor(
    private router :Router,
    private nzDropdownService: NzDropdownService) {

  }

  logout() {
    document.cookie = '';
    window.location.href = '/';
  }

  click(data) {
    this.router.navigate([data]);
  }

  //展开所有菜单
  expandAll(b: boolean) {
    this.nodes.forEach(data => {
      if (data instanceof NzTreeNode) {
        data.isExpanded = b;
      } else {
        const node = data.node;
        if (node) {
          node.isExpanded = b;
        }
      }
    });
    this.selectDropdown();
  }

  menuSwitch(key: string) {
    this.menuList = key;
    switch (this.menuList) {
      case 'all':
        this.nodes = JSON.parse(JSON.stringify(this.allNodes));//浅复制
        break;
      case 'fav':
        this.nodes = JSON.parse(JSON.stringify(this.allNodes));
        this.nodes.forEach(e => {
          e.children.forEach(c => {
            if (!c.fav) {
              e.children.splice(e.children.indexOf(c), 1);
            }
          });
        });
        break;
      case 'share':
        this.nodes = JSON.parse(JSON.stringify(this.allNodes));
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

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  ngOnInit() {
    var cookie = document.cookie;
    if (!cookie) {
      window.location.href = '/login';
    }
    //拼接所有叶子节点，用于搜索
    this.nodes = this.allNodes;
    this.allNodes.forEach(e => {
      this.childNodes.push(...e.children);
    });
  }

}
