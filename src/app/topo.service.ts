import {Injectable} from '@angular/core';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class TopoService {

  constructor(
    private url: UrlService,
    private http: HttpClient,
    private message: NzMessageService,
  ) {
  }

  saveWork(post: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.workUrl, post).toPromise().then(
        res => {
          this.message.success('保存成功');
          resolve(true);
        }, error1 => {
          this.message.info('保存失败');
          resolve(false);
        });
    });
  }

  getList() {
    const data = {
      opt: 'all',
      workspace: {}
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.url.workUrl, data).toPromise().then(res => {
        resolve(res);
      }, error1 => {
        reject(false);
      });
    });
  }

  find(id: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.workUrl, {opt: 'find', workspace: {key: id}}).toPromise().then(res => {
        let data = JSON.parse(JSON.stringify(res));
        var currWork = {
          'name': data.name,//布局名称
          'key': data.key,
          'class': data.class,
          'linkDataArray': data.linkDataArray,
          'nodeDataArray': data.nodeDataArray,
        };
        resolve(currWork);
      }, err => {
        reject(false)
      });
    });
  }
}
