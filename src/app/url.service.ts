import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  hostname='http://10.24.20.71';

  gafanaUrl='http://10.24.20.45:8080/dashboards'; //grafana仪表管理列表
  topoUrl='http://10.24.20.71:9099'; //此url配合topo的路由自动跳转，topo主页自动跳转到topo/list
  workUrl='http://10.24.20.71:8090/workspace';

  constructor() { }
}
