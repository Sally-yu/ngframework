import { Injectable } from '@angular/core';

//统一设置常用的后台请求url

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  hostname = 'http://192.168.110.142';
  hostPort = ':4000api/v1';


  public deviceList = this.hostname + this.hostPort + '/device/all';
  public device = this.hostname + this.hostPort + '/device/key';
  public deviceCode = this.hostname + this.hostPort + '/device/code';
  public removeDevice = this.hostname + this.hostPort + '/device/remove';
  public addDevice = this.hostname + this.hostPort + '/device/add';
  public updateDevice = this.hostname + this.hostPort + '/device/update';
  public deviceValue = this.hostname + this.hostPort + '/device/value';


  public tempList = this.hostname + this.hostPort + '/template/all';
  public template = this.hostname + this.hostPort + '/template/key';
  public removeTemp = this.hostname + this.hostPort + '/template/remove';
  public addTemp = this.hostname + this.hostPort + '/template/add';
  public updateTemp = this.hostname + this.hostPort + '/template/update';

  //public host='http://127.0.0.1:4000';
  // public host='http://192.168.110.142:4000';
  //
  // public influxhandleUrl=":9990/Api/InfluxHandle.ashx";
  // public opchandleUrl=":9990/Api/OpcHandle.ashx";
  //
  // public fileServerPort = "8090";
  // public filehost=window.location.protocol+'//'+window.location.hostname+':'+this.fileServerPort;

  //
  // public insertopcUrl=this.host+'/api/v1/opcua/insert';
  // public updateopcUrl=this.host+'/api/v1/opcua/update';
  // public getopcUrl=this.host+'/api/v1/opcua/get';
  // public deleteopcUrl=this.host+'/api/v1/opcua/delete';
  //
  // public insertanalysisUrl=this.host+'/api/v1/analysis/insert';
  // public updateanalysisUrl=this.host+'/api/v1/analysis/update';
  // public getanalysisUrl=this.host+'/api/v1/analysis/get';
  // public deleteanalysisUrl=this.host+'/api/v1/analysis/delete';
  //
  // public getinfluxUrl=this.host+'/api/v1/influx/get';
  // public insertinfluxUrl=this.host+'/api/v1/influx/insert';
  // public updateinfluxUrl=this.host+'/api/v1/influx/update';
  // public deleteinfluxUrl=this.host+'/api/v1/influx/delete';
  //
  //
  //
  // public fileimgUrl=this.filehost+'/assets/img';
  // public filesaveUrl=this.filehost+'/assets/img/save';
  // public filebackUrl=this.filehost+'/assets/img/back';
  // public fileuploadUrl=this.filehost+'/assets/upload';//上传保存自定义svg文件
  // public filecusUrl=this.filehost+'/assets/img/cussvg';//get保存自定义svg文件
  // public fileupdateCus=this.filehost+'/assets/updateCus'; //保存自定义svg关联信息到数据库

  //
  // public imgUrl=this.host+'/api/v1/img';
  // public saveUrl=this.host+'/api/v1/img/save';
  // public findUrl=this.host+'/api/v1/img/deviceid';
  // public backUrl=this.host+'/api/v1/img/back';
  // //public workUrl=this.host+'/api/v1/workspace';
  // public uploadUrl=this.host+'/api/v1/upload';//上传保存自定义svg文件
  // public cusUrl=this.host+'/api/v1/img/cussvg';//get保存自定义svg文件
  // public updateCus=this.host+'/api/v1/updateCus'; //保存自定义svg关联信息到数据库
  // public findName=this.host+'/api/v1/workspace/findname';//查找同名布局是否已存在
  //
  // public checkNullObj (obj) {
  //   return Object.keys(obj).length === 0
  // }

  constructor() {
  }

}
