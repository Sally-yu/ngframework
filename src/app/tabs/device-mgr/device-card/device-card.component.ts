import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../device.service';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.less']
})
export class DeviceCardComponent implements OnInit {

  deviceList = [];
  loading = false;
  searchValue;
  pageSize = 6; //起始每页条数
  currentIndex = 1; //起始页数

  viewList;
  deviceDetail = false;
  deviceTable = false;
  option;
  device;

  attValue;

  presetColors = ['#2ecc71', '#1abc9c', '#3498db', '#f1c40f', '#e67e22', '#e74c3c'];

  //绑定list用，从deviceList中截取

  constructor(
    private deviceService: DeviceService,
  ) {
  }

  getList() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res.filter(d => d.display);
      this.spliceViewList(this.deviceList);
      this.loading = false;
    }, err => {
      this.spliceViewList(this.deviceList);
      this.loading = false;
    });
  }

  //切换页码
  indexChange(n: number) {
    this.currentIndex = n;
    this.spliceViewList(this.deviceList);
  }

  //切换每页条数
  sizeChange(n: number) {
    this.pageSize = n;
    this.spliceViewList(this.deviceList);
  }

  spliceViewList(list) {
    this.viewList = JSON.parse(JSON.stringify(list)).splice((this.currentIndex - 1) * this.pageSize, this.pageSize);
    this.deviceValue();
  }

  ngOnInit() {
    this.getList();
  }

  cancel($event: any) {
    if (event) {
      this.deviceDetail = false;
      this.deviceTable = false;
      this.getList();
    }
  }

  search() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      if (this.searchValue) {
        this.deviceList = JSON.parse(JSON.stringify(this.deviceList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.code.indexOf(this.searchValue) >= 0;
        });
      }
      this.spliceViewList(this.deviceList);
      this.loading = false;
    }, err => {
      this.spliceViewList(this.deviceList);
      this.loading = false;
    });
  }

  add() {
    // this.device=JSON.parse(JSON.stringify(this.nullDevice));
    this.option = 'new';
    this.deviceDetail = true;
  }

  edit(key: string) {
    this.device = JSON.parse(JSON.stringify(this.deviceList)).filter(d => d.key === key)[0];
    this.option = 'edit';
    this.deviceDetail = true;
  }

  toTable(key: string) {
    this.device = JSON.parse(JSON.stringify(this.deviceList)).filter(d => d.key === key)[0];
    this.deviceTable = true;
  }

  //控制显示属性参数
  display(item: any) {
    return item.attrs.filter(a => a.display);
  }

  //获取所有设备属性值
  deviceValue() {
    this.loading = true;
    let keys = this.viewList.map(d => {
      return d.key;
    });
    this.deviceService.deviceValue(keys).then(res => {
      this.attValue = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  //设备属性数值
  keyValue(key, att): any {
    if (!this.attValue) {
      return;
    }
    try {
      let data = this.attValue.filter(v => v['device'] === key)[0]['data'];
      if (data) {
        return data.filter(d => d['attcode'] === att)[0]['value'];
      } else {
        return;
      }
    } catch (e) {

    }
  }

  //生成随机匹配的echarts柱状图
  chartOption(key: any) {
    if(!this.attValue){
      return
    }
    let data = this.attValue.filter(v => v['device'] === key)[0]['data'];
    let sum = 0;
    let option = {
      grid: {
        left: '1%',
        right: '1%',
        bottom: '0%',
        top: '0%',
        containLabel: false
      },
      xAxis: {
        max: 0,
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        show: false,
        data: ['']
      },
      series: []
    };
    data.forEach(r => {
      var colorindex=Math.ceil(r["value"]/20);

      option.series = [...option.series, {
        type: 'bar',
        stack: '总量',
        data: [r["value"]],
        itemStyle: {
          normal: {
            color: this.presetColors[colorindex]
          }
        }
      }];
      sum += r["value"];
    });
    option.xAxis.max = sum;

    return option;
  }
}
