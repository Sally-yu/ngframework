import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DeviceService} from '../../../device.service';
import {ResizeSensor} from 'css-element-queries';

declare var $: any;
declare var echarts: any; //angular方式引用echarts做循环处理性能奇差 用土方子吧，给个延时

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.less']
})
export class DeviceCardComponent implements OnInit,OnChanges,OnDestroy {
  ws: WebSocket;

  @Input() flag;

  deviceList = [];
  loading = false;
  searchValue;
  pageSize = 6; //起始每页条数
  currentIndex = 1; //起始页数

  viewList;  //显示的device，和页码页条数有关
  deviceDetail = false;
  deviceTable = false;
  option;//标识新增或编辑
  device;

  attValue;//设备属性（参数）的值

  presetColors = ['#f1c40f', '#e74c3c', '#2ecc71'];
  keys: [];
  interval=1; //默认一秒刷新

  //预置卡片颜色选项

  constructor(
    private deviceService: DeviceService,
  ) {
  }

  //获取所有device，后续处理。刷新专用，与页面加载时不同
  getList() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.deviceService.deviceList().then(res => {
        this.deviceList = res.filter(d => d.display);
        this.spliceViewList(this.deviceList);
      },
      err => {
        this.spliceViewList(this.deviceList);
      });
  }

  //切换页码
  indexChange(n: number) {
    this.currentIndex = n;
    this.loading = true;
    this.spliceViewList(this.deviceList);
  }

  //切换每页条数
  sizeChange(n: number) {
    this.pageSize = n;
    this.loading = true;
    this.spliceViewList(this.deviceList);
  }

  spliceViewList(list) {
    if (this.ws != null) {
      this.ws.close();
    }
    this.viewList = JSON.parse(JSON.stringify(list)).splice((this.currentIndex - 1) * this.pageSize, this.pageSize);
    this.keys = this.viewList.map(d => {
      return d.key;
    });
    this.deviceService.deviceValue(this.keys).then(res => {
      this.attValue = res;
      this.viewList.forEach(c => {
        var e = $('#' + c.key);
        var chart = echarts.init(e.get(0));
        chart.setOption(this.chartOption(c.key));
        new ResizeSensor(e, function () {
          chart.resize();
        });
        this.loading = false;
      });
    }, err => {
      this.loading = false;
    });
  }

  cancel($event: any) {
    if (event) {
      this.deviceDetail = false;
      this.deviceTable = false;
      this.loading = true;
      this.getList();//重新加载页面
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
    }, err => {
      this.spliceViewList(this.deviceList);
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
    var display = item.attrs.filter(a => a.display);
    if (display.length > 16) {
      display = display.slice(0, 16);
    }
    return display;
  }

  length(item) {
    return this.display(item).length;
  }

  column(item) {
    const length = this.length(item);
    const d = Math.ceil(length / 4);
    if (d <= 2) {
      return 2;
    } else {
      return d;
    }
  }

  row(item) {
    return Math.ceil(this.length(item) / this.column(item));
  }

  width(item, att) {
    var display = this.display(item);
    var tail = display.slice(this.column(item) * (this.row(item) - 1), display.length);
    if (tail.indexOf(att) < 0) {
      return 100 / this.column(item) + '%';
    } else {
      return 100 / tail.length + '%';
    }
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
    // if (!this.attValue) {
    //   return;
    // }
    // try {
    console.log(this.attValue)
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
      animation: false,
      series: []
    };
    data.forEach(r => {
      var colorindex = Math.floor(r['value'] / 33);

      option.series = [...option.series, {
        type: 'bar',
        stack: '1',
        data: [r['value']],
        itemStyle: {
          normal: {
            color: this.presetColors[colorindex]
          }
        }
      }];
      sum += r['value'];
    });
    option.xAxis.max = sum;

    return option;
    // } catch (e) {
    //
    // }
  }


  ngOnInit() {
    this.loading = true;
    this.getList();
  }


  connectWs() {
    if (this.ws != null) {
      this.ws.close();
    }
    var self = this;
    this.ws = new WebSocket('ws://10.24.20.71:7777/ws');
    this.ws.onopen=function (event) {
      self.ws.send(JSON.stringify({
        keys:self.keys,
        time:self.interval
      }));
    };
    this.ws.onmessage = function (event) {
      console.log(event.data);
      self.attValue = JSON.parse(event.data);
      self.matchValue();
    };
  }

  matchValue(){
    this.viewList.forEach(c => {
      var e = $('#' + c.key);
      var chart = echarts.init(e.get(0));
      chart.setOption(this.chartOption(c.key));
      new ResizeSensor(e, function () {
        chart.resize();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.ws != null) {
      this.ws.close();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.deviceDetail&&!this.deviceTable){
      this.getList();
    }
  }


}
