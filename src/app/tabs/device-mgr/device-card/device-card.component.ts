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
export class DeviceCardComponent implements OnInit, OnChanges, OnDestroy {
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

  attValue = [];//设备属性（参数）的值

  presetColors = ['#2ecc71', '#e74c3c'];
  keys: [];
  interval = 1; //默认一秒刷新
  dataOptions = [];
  max = 20;

  //预置卡片颜色选项

  constructor(
    private deviceService: DeviceService,
  ) {
  }

  //获取所有device，后续处理。刷新专用，与页面加载时不同
  getList() {
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
    this.viewList = JSON.parse(JSON.stringify(list)).splice((this.currentIndex - 1) * this.pageSize, this.pageSize);
    this.keys = this.viewList.map(d => {
      return d.key;
    });
    this.deviceService.deviceValue(this.keys).then(res => {
      this.attValue = res;
      this.keys.forEach(r => {
        let o = this.dataOptions.filter(d => d['device'] == r)[0] ? this.dataOptions.filter(d => d['device'] == r)[0]['option'] : null;
        let option = o ? o :
          {
            grid: {
              left: '6%',
              right: '6%',
              bottom: '40%',
              top: '0%',
              containLabel: false
            },
            xAxis: {
              max: this.max,
              type: 'value',
              name: 'S',
              show: true
            },
            yAxis: {
              type: 'category',
              show: false,
              data: ['']
            },
            animation: false,
            series: []
          };
        this.dataOptions = [...this.dataOptions, {
          device: r,
          option: option,
        }];
        for (var i = 0; i < this.max - 1; i++) {
          if (option.series.length < this.max) {
            var colorindex = Math.floor(Math.random() + 0.1);
            option.series = [...option.series, {
              type: 'bar',
              stack: '1',
              data: [1],
              itemStyle: {
                normal: {
                  color: this.presetColors[colorindex]
                }
              }
            }];
          }
        }

      });
      this.connectWs();//建立ws协议，自动刷新
      this.matchValue();
      this.loading = false;
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
    this.option = 'new';
    this.deviceDetail = true;
    this.closeWS();
  }

  edit(key: string) {
    this.device = JSON.parse(JSON.stringify(this.deviceList)).filter(d => d.key === key)[0];
    this.option = 'edit';
    this.deviceDetail = true;
    this.closeWS();
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

  //ws收到消息追加数据
  chartOption() {
    this.keys.forEach(r => {
      var option = this.dataOptions.filter(d => d['device'] == r)[0]['option'];
      if (option.series.length >= this.max) {
        option.series.splice(0, 1);
      }
      var colorindex = Math.floor(Math.random() + 0.1);
      option.series = [...option.series, {
        type: 'bar',
        stack: '1',
        data: [1],
        itemStyle: {
          normal: {
            color: this.presetColors[colorindex]
          }
        }
      }];
    });
    this.matchValue();
  }

  ngOnInit() {
    this.loading = true;
    this.getList();
  }

  connectWs() {
    this.closeWS();
    var self = this;
    this.ws = new WebSocket(this.deviceService.wsUrl);
    this.ws.onopen = function (event) {
      self.ws.send(JSON.stringify({
        keys: self.keys,
        time: self.interval
      }));
    };
    this.ws.onmessage = function (event) {
      self.attValue = JSON.parse(event.data);
      self.chartOption();
    };
  }

  matchValue() {
    try {
      this.keys.forEach(c => {
        var e = $('#' + c);
        var chart = echarts.init(e.get(0));
        chart.setOption(this.dataOptions.filter(d => d['device'] == c)[0]['option']);
        new ResizeSensor(e, function () {
          chart.resize();
        });
      });
    } catch (e) {

    }
  }

  closeWS() {
    if (this.ws) {
      this.ws.close();
    }
  }

  ngOnDestroy(): void {
    this.closeWS();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.deviceDetail && !this.deviceTable) {
      this.getList();
    }
  }

}
