import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  hostname='http://10.24.20.71';
  hostPort=":9060";
  gafanaUrl='http://10.24.20.45:8080/dashboards'; //grafana仪表管理列表
  topoUrl='http://10.24.20.71:9099'; //此url配合topo的路由自动跳转，topo主页自动跳转到topo/list
  workUrl='http://10.24.20.71:8090/workspace';

  public user=this.hostname+this.hostPort+'/user/key';
  public allUser=this.hostname+this.hostPort+'/user/all';
  public auth=this.hostname+this.hostPort+'/user/login';
  public addUser=this.hostname+this.hostPort+'/user/add';
  public updateUser=this.hostname+this.hostPort+'/user/update';
  public removeUser=this.hostname+this.hostPort+'/user/remove';

  constructor() { }
}
