import { Component, OnInit } from '@angular/core';
import ko from '../../assets/js/knockout-min.js';
import _ from '../../assets/js/lodash.min.js';
declare var $:any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {

  constructor() { }


  initBar():any{
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
      xAxisData.push('类目' + i);
      data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
    }

    return {
      title: {
        text: ''
      },
      legend: {
        data: ['bar', 'bar2'],
        align: 'left'
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
          return idx * 10;
        }
      }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  }

  initPi():any{
    return  {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
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
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ]
        }
      ]
    };

  }

  initDashboard(){
    return {
      tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
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
          detail: {formatter:'{value}%'},
          data: [{value: 88, name: '完成率'}]
        }
      ]
    };
  }

  ngOnInit() {
    $(function () {
      var options = {
      };
      $('.grid-stack').gridstack(options);
    });
    // ko.components.register('dashboard-grid', {
    //   viewModel: {
    //     createViewModel: function (controller, componentInfo) {
    //       var ViewModel = function (controller, componentInfo) {
    //         var grid = null;
    //
    //         this.widgets = controller.widgets;
    //
    //         this.afterAddWidget = function (items) {
    //           if (grid == null) {
    //             grid = $(componentInfo.element).find('.grid-stack').gridstack({
    //               auto: false
    //             }).data('gridstack');
    //           }
    //
    //           var item = _.find(items, function (i) { return i.nodeType == 1 });
    //           grid.add_widget(item);
    //           ko.utils.domNodeDisposal.addDisposeCallback(item, function () {
    //             grid.remove_widget(item);
    //           });
    //         };
    //       };
    //
    //       return new ViewModel(controller, componentInfo);
    //     }
    //   },
    //   template:
    //     [
    //       '<div class="grid-stack" data-bind="foreach: {data: widgets, afterRender: afterAddWidget}">',
    //       '   <div class="grid-stack-item" data-bind="attr: {\'data-gs-x\': $data.x, \'data-gs-y\': $data.y, \'data-gs-width\': $data.width, \'data-gs-height\': $data.height, \'data-gs-auto-position\': $data.auto_position}">',
    //       '       <div class="grid-stack-item-content"><button data-bind="click: $root.delete_widget">Delete me</button></div>',
    //       '   </div>',
    //       '</div> '
    //     ].join('')
    // });
    //
    // $(function () {
    //   var Controller = function (widgets) {
    //     var self = this;
    //
    //     this.widgets = ko.observableArray(widgets);
    //
    //     this.add_new_widget = function () {
    //       this.widgets.push({
    //         x: 0,
    //         y: 0,
    //         width: Math.floor(1 + 3 * Math.random()),
    //         height: Math.floor(1 + 3 * Math.random()),
    //         auto_position: true
    //       });
    //     };
    //
    //     this.delete_widget = function (item) {
    //       self.widgets.remove(item);
    //     };
    //   };
    //
    //   var widgets = [
    //     {x: 0, y: 0, width: 2, height: 2},
    //     {x: 2, y: 0, width: 4, height: 2},
    //     {x: 6, y: 0, width: 2, height: 4},
    //     {x: 1, y: 2, width: 4, height: 2}
    //   ];
    //
    //   var controller = new Controller(widgets);
    //   ko.applyBindings(controller);
    // });
  }

  getList() {

  }

  add() {

  }
}
