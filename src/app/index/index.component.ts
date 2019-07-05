import {
  Component, Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import ko from '../../assets/js/knockout-min.js';
import _ from '../../assets/js/lodash.min.js';
import {ResizeSensor} from 'css-element-queries';
import {UrlService} from '../url.service';
import {UserService} from '../user.service';

declare var $: any;
declare var echarts: any; //index全局导入 保平安

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit, OnChanges {


  @Input() flag;

  charts = [
    {
      x: 0,
      y: 0,
      width: 4,
      height: 5,
      key: 'id1',
      name: '环形图',
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {name: '工厂建模', value: 2432.3},
              {name: '报废成本', value: 1024},
              {name: '运费', value: 3445.3},
              {name: '报销成本', value: 324.3},
              {name: '维护费用', value: 983},
            ]
          }
        ]
      }
    },
    {
      x: 4,
      y: 0,
      width: 3,
      height: 5,
      key: 'id2',
      name: '业务完成率',
      option: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter: '{value}%'},
            data: [{value: 88, name: '完成率'}]
          }
        ]
      }
    },
    {
      x: 7,
      y: 0,
      width: 5,
      height: 5,
      key: 'id3',
      name: '设备流转',
      option: {
        legend: {},
        tooltip: {
          trigger: 'axis'
        },
        dataset: {},
        xAxis: {type: 'category'},
        yAxis: {},
        series: [
          // These series are in the first grid.
          {type: 'bar', seriesLayoutBy: 'row'},
          {type: 'bar', seriesLayoutBy: 'row'},
          {type: 'bar', seriesLayoutBy: 'row'},
        ]
      }
    },
    {
      x: 0,
      y: 5,
      width: 8,
      height: 5,
      key: 'id4',
      name: '龙门焊机运转监控',
      option: {
        legend: {},
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '5%',
        },
        dataset: {},
        xAxis: {type: 'category'},
        yAxis: {},
        series: [
          // These series are in the first grid.
          {type: 'line', areaStyle: {}},
          {type: 'line', areaStyle: {}},
          {type: 'line', areaStyle: {}},
          {type: 'line', areaStyle: {}},
        ]
      }
    },
  ];

  widgets = [];
  indexUrl;

  constructor(
    private url: UrlService,
    private userSrv: UserService,
  ) {
    this.create()
  }

  create() {
    this.charts.forEach(c => {
      this.widgets.push(
        {x: c.x, y: c.y, width: c.width, height: c.height, key: c.key}
      );
    });

    var that = this;
    ko.components.register('dashboard-grid', {
      viewModel: {
        createViewModel: function (controller, componentInfo) {
          var ViewModel = function (controller, componentInfo) {
            var grid = null;

            this.widgets = controller.widgets;

            this.afterAddWidget = function (items) {
              if (grid == null) {
                grid = $(componentInfo.element).find('.grid-stack').gridstack({
                  auto: false
                }).data('gridstack');
              }

              var item = _.find(items, function (i) {
                return i.nodeType == 1;
              });
              grid.add_widget(item);
              ko.utils.domNodeDisposal.addDisposeCallback(item, function () {
                grid.remove_widget(item);
              });
            };

            $('#save-grid').click(this.save_grid);

          };

          return new ViewModel(controller, componentInfo);
        }
      },
      template: `<div class="grid-stack" data-bind="foreach: {data: widgets, afterRender: afterAddWidget}">
    <div class="grid-stack-item"
         data-bind="attr: {'data-gs-x': $data.x, 'data-gs-y': $data.y, 'data-gs-width': $data.width, 'data-gs-height': $data.height, 'data-gs-auto-position': $data.auto_position}">
        <div class="grid-stack-item-content" style="  box-shadow: 0 0 8px  rgba(10,10,10,.1);">
            <div class="grid-tool" style="  width:100%;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  padding-left: 16px;
  text-align: left;
  background-color: transparent;" ></div>
            <div data-bind="attr:{'id':$data.key}" class="chart" style="height: calc(100% - 40px);width: 100%"></div>
        </div>
    </div>
</div>`
    });

    $(function () {
      var Controller = function (widgets) {
        var self = this;

        this.widgets = ko.observableArray(widgets);

        this.add = function () {
          this.widgets.push({
            x: 0,
            y: 0,
            width: 4,
            height: 4,
            auto_position: true
          });
        };

        this.save = function () {
          this.serialized_data = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
            el = $(el);
            var node = el.data('_gridstack_node');
            return {
              x: node.x,
              y: node.y,
              width: node.width,
              height: node.height
            };
          }, this);
          console.log(this.serialized_data);
        }.bind(this);
      };
      var widgets = that.widgets;
      var controller = new Controller(widgets);
      ko.applyBindings(controller);
    });
  }

  initBar(): any {
    // this.charts[2].option.series.forEach(s => {
    //   s.seriesLayoutBy = 'column';
    // });
    this.charts.forEach(c => {
      var e = document.getElementById(c.key);
      // $('#'+c.key).prev().innerHTML=c.key
      var chart = echarts.init(e);
      chart.setOption(c.option);
      chart.resize();
    });
  }

  initPi(): any {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
          ]
        }
      ]
    };

  }

  initDashboard() {
    return {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter: '{value}%'},
          data: [{value: 88, name: '完成率'}]
        }
      ]
    };
  }

  ngOnInit() {
    setTimeout(() => {
      var self = this;
      this.charts[2].option.dataset = {
        source: [
          ['', '2012', '2013', `2014`, '2015'],
          ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
          ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
          ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4],
        ]
      };
      this.charts[3].option.dataset = {
        source: [
          ['', '2012', '2013', '2015', '2014'],
          ['PDK', 41.1, 30.4, 65.1, 53.3],
          ['UT_S1', 86.5, 92.1, 85.7, 83.1],
          ['S90', 24.1, 67.2, 79.5, 86.4],
          ['KDU', 34.1, 23.2, 73.5, 26.4],
          ['K90', 27.1, 64.2, 39.5, 65.4],
          ['YUR', 23.1, 34.2, 243.5, 86.4],
          ['DG', 64.1, 34.42, 356.5, 164.4],
          ['DK_3', 124.1, 457.2, 22.5, 34.4],
          ['DG8', 59.1, 2.2, 564.5, 86.4],
          ['S33', 44.1, 45.2, 25.5, 57.4],
          ['GY1', 57.1, 54.2, 65.5, 44.4],
          ['U2', 24.1, 65, 100.5, 86.4],
          ['RER', 43.1, 67.2, 35.5, 86.4],
        ]
      };

      this.charts.forEach(c => {
        var e = $('#' + c.key);
        var inner = c.name + `<i nz-icon nzType="more" nzTheme="outline" style="    height: 40px; width: 40px; float: right;"></i>`;
        e.prev().get(0).innerHTML = inner;
        var chart = echarts.init(e.get(0), 'macarons');
        chart.setOption(c.option);
        new ResizeSensor(e, function () {
          chart.resize();
        });
      });
    }, 1000);
    this.setIndex();
    // this.connectWs();
  }

  getList() {

  }

  add() {

  }

  setIndex() {
    var user = this.url.key();
    this.userSrv.getUser(user).then(res => {
      this.indexUrl = res.index;
    }, res => {

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }



}
