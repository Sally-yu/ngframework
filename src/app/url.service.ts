import {Injectable} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  hostname = 'http://10.24.20.71';
  hostPort = ':9060';
  gafanaUrl = 'http://10.24.20.45:8080/dashboards'; //grafana仪表管理列表
  topoUrl = 'http://10.24.20.71:9099'; //此url配合topo的路由自动跳转，topo主页自动跳转到topo/list  页面路由nginx负责，后台单独启动
  modelUrl = 'http://10.24.20.42:9999';

  keyUrl = this.hostname + this.hostPort + '/rsakey';
  public loginUrl = this.hostname + this.hostPort + '/login';

  public user = this.hostname + this.hostPort + '/user/key';
  public allUser = this.hostname + this.hostPort + '/user/all';
  public addUser = this.hostname + this.hostPort + '/user/add';
  public updateUser = this.hostname + this.hostPort + '/user/update';
  public removeUser = this.hostname + this.hostPort + '/user/remove';
  public newPwd = this.hostname + this.hostPort + '/user/newpwd';
  public authKey = this.hostname + this.hostPort + '/user/authkey';


  public allNotif = this.hostname + this.hostPort + '/notif/all';
  public newNotif = this.hostname + this.hostPort + '/notif/new';
  public removeNotif = this.hostname + this.hostPort + '/notif/remove';
  public updateNotif = this.hostname + this.hostPort + '/notif/update';


  public deviceList = this.hostname + this.hostPort + '/device/all';
  public device = this.hostname + this.hostPort + '/device/key';
  public deviceCode = this.hostname + this.hostPort + '/device/code';
  public deviceName = this.hostname + this.hostPort + '/device/name';
  public removeDevice = this.hostname + this.hostPort + '/device/remove';
  public addDevice = this.hostname + this.hostPort + '/device/add';
  public updateDevice = this.hostname + this.hostPort + '/device/update';
  public deviceValue = this.hostname + this.hostPort + '/device/value';


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



  public port = ':9098';
  // public host=window.location.protocol+'//'+window.location.hostname+':'+this.port;
  public host = this.hostname  + this.port;

  //以下url需与go后台服务的url对应
  //由于后台默认url不跨域，没在代码中开起跨域分享的url基本都报错不允许跨域，实际不是go的跨域处理问题，是url不对应
  public imgUrl = this.host + '/assets/img';
  public saveUrl = this.host + '/assets/img/save';
  public findUrl = this.host + '/assets/img/deviceid';
  public backUrl = this.host + '/assets/img/back';
  public uploadUrl = this.host + '/assets/upload';//上传保存自定义svg文件
  public cusUrl = this.host + '/assets/img/cussvg';//get保存自定义svg文件
  public updateCus = this.host + '/assets/updateCus'; //保存自定义svg关联信息到数据库

  public workUrl = this.host + '/workspace';
  public findName = this.host + '/workspace/findname';//查找同名布局是否已存在
  public codeUrl = this.host + '/code';//最大编号
  constructor() {
  }

  //取token
  public token(): any {
    if (document.cookie) {
      return JSON.parse(document.cookie)['token'];
    } else {
      return;
    }
  }

  //取用户的key
  public key(): any {
    if (document.cookie) {
      return JSON.parse(document.cookie)['key'];
    } else {
      return;
    }
  }

}
