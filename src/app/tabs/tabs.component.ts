import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NzDropdownService} from 'ng-zorro-antd';
import {filter, map, mergeMap} from 'rxjs/operators';
import {Reuse} from '../reuse';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {

  tabIndex = -1;
  tabs = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
  ) {
    // 路由事件
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
      // 路由data的标题
      const menu = {...event};
      menu.url = this.router.url;
      const url = menu.url;
      this.titleService.setTitle(menu.title); // 设置网页标题
      const exitMenu = this.tabs.find(info => info.url === url);
      if (!exitMenu) {// 如果不存在那么不添加，
        this.tabs.push(menu);
      }
      this.tabIndex = this.tabs.findIndex(p => p.url === url);
    });
  }

  nzSelectChange($event) {
    this.tabIndex = $event.index;
    const menu = this.tabs[this.tabIndex];
    // 跳转路由
    this.router.navigate([menu.url]);
  }

  closeTab(tab): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  // 关闭选项标签
  closeUrl(url: string) {
    // 当前关闭的是第几个路由
    const index = this.tabs.findIndex(p => p.url === url);
    // 如果只有一个不可以关闭
    if (this.tabs.length === 1) {
      return;
    }
    this.tabs.splice(index, 1);
    // 删除复用
    // delete SimpleReuseStrategy.handlers[module];
    Reuse.deleteRouteSnapshot(url);
    // 如果当前删除的对象是当前选中的，那么需要跳转
    if (this.tabIndex === index) {
      // 显示上一个选中
      let menu = this.tabs[index - 1];
      if (!menu) {// 如果上一个没有下一个选中
        menu = this.tabs[index];
      }
      // 跳转路由
      this.router.navigate([menu.url]);    }
  }

  ngOnInit() {
  }

}
