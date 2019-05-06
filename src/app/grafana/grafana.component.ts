import {Component, OnInit, TemplateRef} from '@angular/core';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-grafana',
  templateUrl: './grafana.component.html',
  styleUrls: ['./grafana.component.less']
})
export class GrafanaComponent implements OnInit {

  menuList = 'all';

  searchExp = false;

  searchValue = ''; //双向绑定搜索关键字

  menuExp=true; //菜单栏展开

  dropdown: NzDropdownContextComponent;
  // actived node
  activedNode: NzTreeNode;
  allNodes = [
    {
      title: '早餐',
      key: '100',
      author: 'NG ZORRO',
      expanded: false,
      children: [
        {title: '牛奶', key: '1000', author: 'NG ZORRO', isLeaf: true, fav: true, share: true},
        {title: '面包', key: '1001', author: 'NG ZORRO', isLeaf: true, fav: false, share: false}
      ]
    },
    {
      title: '零食',
      key: '101',
      author: 'NG ZORRO',
      expanded: false,
      children: [
        {title: '鸡蛋', key: '1010', author: 'NG ZORRO', isLeaf: true, fav: false, share: true},
        {title: '鸡腿', key: '1011', author: 'NG ZORRO', isLeaf: true, fav: true, share: false},
        {title: '火腿', key: '1012', author: 'NG ZORRO', isLeaf: true, fav: true, share: true}
      ]
    }
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
    }
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  selectDropdown(): void {
    this.dropdown.close();
    // do something
  }

  constructor(private nzDropdownService: NzDropdownService) {
  }

  logout() {
    document.cookie = '';
    window.location.href = '/login';
  }

  click(url: string) {
    window.location.href = url;
  }

  menuSwitch(key: string) {
    this.menuList = key;
    switch (this.menuList) {
      case 'all':
        this.nodes=JSON.parse(JSON.stringify(this.allNodes));//浅复制
        console.log(this.nodes);
        break;
      case 'fav':
        this.nodes=JSON.parse(JSON.stringify(this.allNodes));
        this.nodes.forEach(e=>{
          e.children.forEach(c=>{
            if(!c.fav){
              e.children.splice(e.children.indexOf(c),1);
            }
          });
        });
        console.log(this.nodes);
        break;
      case 'share':
        this.nodes=JSON.parse(JSON.stringify(this.allNodes));
        this.nodes.forEach(e=>{
          e.children.forEach(c=>{
            if(!c.share){
              e.children.splice(e.children.indexOf(c),1);
            }
          });
        });
        console.log(this.nodes);
        break;
      default:break;
    }
  }

  //搜索关键字输入变化即触发
  search() {
    this.nodes=[];
    this.childNodes.forEach(e => {
      if (e['title'].indexOf(this.searchValue) != -1) {
        this.nodes.push(e);
      }
    });
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
