import {Injectable} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  hostname = 'http://10.24.20.71';
  hostPort = ':9060';
  gafanaUrl = 'http://10.24.20.45:8080/dashboards'; //grafana仪表管理列表
  topoUrl = 'http://10.24.20.71:9099'; //此url配合topo的路由自动跳转，topo主页自动跳转到topo/list
  workUrl = 'http://10.24.20.71:8090/workspace';

  public user = this.hostname + this.hostPort + '/user/key';
  public allUser = this.hostname + this.hostPort + '/user/all';
  public auth = this.hostname + this.hostPort + '/user/login';
  public addUser = this.hostname + this.hostPort + '/user/add';
  public updateUser = this.hostname + this.hostPort + '/user/update';
  public removeUser = this.hostname + this.hostPort + '/user/remove';
  public newPwd = this.hostname + this.hostPort + '/user/newpwd';
  public authKey = this.hostname + this.hostPort + '/user/authkey';


  public allNotif = this.hostname + this.hostPort + '/notif/all';
  public newNotif = this.hostname + this.hostPort + '/notif/new';
  public removeNotif = this.hostname + this.hostPort + '/notif/remove';


  public deviceList = this.hostname + this.hostPort + '/device/all';
  public device = this.hostname + this.hostPort + '/device/key';
  public deviceCode = this.hostname + this.hostPort + '/device/code';
  public deviceName = this.hostname + this.hostPort + '/device/name';
  public removeDevice = this.hostname + this.hostPort + '/device/remove';
  public addDevice = this.hostname + this.hostPort + '/device/add';
  public updateDevice = this.hostname + this.hostPort + '/device/update';


  public tempList = this.hostname + this.hostPort + '/template/all';
  public template = this.hostname + this.hostPort + '/template/key';
  public removeTemp = this.hostname + this.hostPort + '/template/remove';
  public addTemp = this.hostname + this.hostPort + '/template/add';
  public updateTemp = this.hostname + this.hostPort + '/template/update';


  public alarmlist = this.hostname + this.hostPort + '/alarm/all';
  public alarm = this.hostname + this.hostPort + '/alarm/key';

  public alarmStgList = this.hostname + this.hostPort + '/alarmStg/all';
  public updateAlarmStg = this.hostname + this.hostPort + '/alarmStg/update';
  public addAlarmStg = this.hostname + this.hostPort + '/alarmStg/add';
  public findAlarmStg = this.hostname + this.hostPort + '/alarmStg/key';
  public removeAlarmStg = this.hostname + this.hostPort + '/alarmStg/remove';

  constructor() {
  }

}
