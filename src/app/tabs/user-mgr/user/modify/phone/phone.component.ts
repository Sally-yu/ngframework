import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../../user.service';
import {RsaService} from '../../../../../rsa.service';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../../../../url.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.less']
})
export class PhoneComponent implements OnInit {

  @Input() key: string;

  @Output() result: EventEmitter<any> = new EventEmitter();


  current = 0;
  oldPhone = '';
  newPhone = '';

  constructor(
    private userSrv: UserService,
    private rsaService: RsaService,
    private http: HttpClient,
    private url: UrlService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.result.emit(true);
  }

  next() {
    this.current += 1;
  }

  logout() {
    document.cookie = '';
    window.location.href = '/';
  }

  authPhone() {

  }

  ensure() {

  }
}
