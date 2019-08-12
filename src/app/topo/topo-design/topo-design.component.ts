import {Component,  OnInit} from '@angular/core';
import {UrlService} from '../../url.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {filter} from 'rxjs/operators';
import {UUID} from 'angular2-uuid';
import * as go from '../../../assets/js/go.js';
import {DeviceService} from '../../device.service';
import {ResizeSensor} from 'css-element-queries';

declare var $: any;
declare var echarts: any; //angular方式引用echarts做循环处理性能奇差 用土方，给个延时

@Component({
  selector: 'app-topo-design',
  templateUrl: './topo-design.component.html',
  styleUrls: ['./topo-design.component.less']
})
export class TopoDesignComponent implements OnInit {
  ws: WebSocket;
  templateList;

  cardColors=['#2ecc71','#1abc9c','#3498db','#f1c40f','#e67e22','#e74c3c',
    '#78e08f','#4a69bd','#38ada9','#fa983a','#f8c291','#fad390',
    '#A8EBE1','#FFEAC0','#9FBECC','#EFFFED','#D8AAB9','#F5DFDF',
  ];//预置颜色选项

  nullDevice = {
    key: null,
    code: null,
    type: null,
    group: null,
    name: null,
    servername:null,
    serveraddress:null,
    template: null,
    connect: null,
    interval: null,
    model: null,
    gps: null,
    phone: null,
    manufacturer: null,
    status: null,
    note: null,
    time: null,
    attrs: [],
    display:true,
    devicesetting:{
      cardcolor:"#2ecc71"
    }
  };

  timeUint = 'ms';
  t = 0;
  codeRequire = true;
  nameRequire = true;
  templateRequire = true;
  note: any;
  code;
  sence: any;
  released = false;
  keys=[];
  max=20;

  constructor(
    private url: UrlService,
    private http: HttpClient,
    private message: NzMessageService,
    private deviceService: DeviceService,
  ) {
  }

  currWork = {
    'name': null,//布局名称
    'key': null,
    'class': null,
    'linkDataArray': [],
    'nodeDataArray': [],
  };

  cusMenu = [
    {
      divid: 'cus0',
      dispaly: false,
      name: '自定义分组1',
      svg: []
    }, {
      divid: 'cus1',
      dispaly: false,
      name: '自定义分组2',
      svg: []
    }, {
      divid: 'cus2',
      dispaly: false,
      name: '自定义分组3',
      svg: []
    }, {
      divid: 'cus3',
      dispaly: false,
      name: '自定义分组4',
      svg: []
    }, {
      divid: 'cus4',
      dispaly: false,
      name: '自定义分组5',
      svg: []
    }, {
      divid: 'cus5',
      dispaly: false,
      name: '自定义分组6',
      svg: []
    }, {
      divid: 'cus6',
      dispaly: false,
      name: '自定义分组7',
      svg: []
    }, {
      divid: 'cus7',
      dispaly: false,
      name: '自定义分组8',
      svg: []
    }, {
      divid: 'cus8',
      dispaly: false,
      name: '自定义分组9',
      svg: []
    }, {
      divid: 'cus9',
      dispaly: false,
      name: '自定义分组10',
      svg: []
    },
  ]; //自定义分录默认名称
  cusUpload = {
    divid: 'cus0',
    display: true,
    name: '新建分组1',
    svg: []
  };
  cusAva = [];

  diagram;

  DataArray = [
    {svg: '传送带',     deviceid: '', status: '0'},
    {svg: '传送带式炉', deviceid: '', status: '0'},
    {svg: '传送装置',   deviceid: '', status: '0'},
    {svg: '颗粒传送机', deviceid: '', status: '0'},
    {svg: '蜗杆传动',   deviceid: '', status: '0'},
  ];
  DataArray1 = [
    {svg: 'PLC设备',  deviceid: '', status: '0'},
    {svg: '多轴车床', deviceid: '', status: '0'},
    {svg: '滚刀磨床', deviceid: '', status: '0'},
    {svg: '加工中心', deviceid: '', status: '0'},
    {svg: '立式车床', deviceid: '', status: '1'},
    {svg: '立式机床', deviceid: '', status: '1'},
    {svg: '立轴磨床', deviceid: '', status: '1'},
    {svg: '内圆磨床', deviceid: '', status: '1'},
    {svg: '普通车床', deviceid: '', status: '0'},
    {svg: '数控车床', deviceid: '', status: '0'},
    {svg: '数控钻床', deviceid: '', status: '0'},
    {svg: '卧式磨床', deviceid: '', status: '0'},
    {svg: '摇臂钻床', deviceid: '', status: '0'},
    {svg: '自动车床', deviceid: '', status: '0'},

  ];
  DataArray2 = [
    {svg: '结晶器', deviceid: '', status: '0'},
    {svg: '粉碎机', deviceid: '', status: '1'},
    {svg: '剪切机', deviceid: '', status: '1'},
    {svg: '冷却塔', deviceid: '', status: '0'},
    {svg: '提炼塔', deviceid: '', status: '1'},
    {svg: '烘干塔', deviceid: '', status: '1'},
    {svg: '干燥塔', deviceid: '', status: '1'},
    {svg: '烧结机', deviceid: '', status: '0'},
    {svg: '均化器', deviceid: '', status: '0'},
    {svg: '冷却器', deviceid: '', status: '0'},

  ];
  DataArray3 = [
    {svg: '电度表',   deviceid: '', status: '0'},
    {svg: '电气柜',   deviceid: '', status: '0'},
    {svg: '核电站',   deviceid: '', status: '0'},
    {svg: '核反应堆', deviceid: '', status: '0'},
    {svg: '水利站',   deviceid: '', status: '0'},
    {svg: '太阳能板', deviceid: '', status: '0'},
    {svg: '沼气发电', deviceid: '', status: '0'},
    {svg: '智能水表', deviceid: '', status: '0'},
    {svg: '发电机',   deviceid: '', status: '0'},
  ];
  DataArray4 = [
    {svg: '冲压机',     deviceid: '', status: '0'},
    {svg: '吊车',       deviceid: '', status: '0'},
    {svg: '机械压力机', deviceid: '', status: '0'},
    {svg: '矫平机',     deviceid: '', status: '1'},
    {svg: '金属压机',   deviceid: '', status: '1'},
    {svg: '立式冲床',   deviceid: '', status: '1'},
    {svg: '立式液压机', deviceid: '', status: '1'},
    {svg: '龙门吊',     deviceid: '', status: '0'},
    {svg: '卧式冲床',   deviceid: '', status: '0'},
    {svg: '卧式液压机', deviceid: '', status: '0'},
    {svg: '液压折弯机', deviceid: '', status: '0'},
  ];
  DataArray5 = [
    {svg: '仪表1', deviceid: '', status: '0'},
    {svg: '仪表2', deviceid: '', status: '0'},
    {svg: '仪表3', deviceid: '', status: '0'},
    {svg: '仪表4', deviceid: '', status: '1'},
    {svg: '仪表5', deviceid: '', status: '1'},
    {svg: '仪表6', deviceid: '', status: '0'},
    {svg: '仪表7', deviceid: '', status: '0'},
    {svg: '仪表8', deviceid: '', status: '0'},
  ];

  cusData;

  //内置标准几何图形
  builtIn = [
    {svg: 'Rectangle', category: 'shape'},
    {svg: 'RoundedRectangle', category: 'shape'},
    {svg: 'Ellipse', category: 'shape'},
    {svg: 'TriangleUp', category: 'shape'},
    {svg: 'Diamond', category: 'shape'},
    {svg: 'LineH', category: 'shape'},
    {svg: 'LineV', category: 'shape'},
    {svg: 'PlusLine', category: 'shape'},
  ];
  timeOutId;

  //连线动效用参数
  opacity = 1;
  down = true;


  //默认的空设备，防止html绑定不到字段报错
  private defaultDevice = {
    'created': 0,
    'modified': 0,
    'origin': 0,
    'description': null,
    'id': null,
    'name': null,
    'adminState': 'UNLOCKED',
    'operatingState': 'ENABLED',
    'addressable': {
      'created': 0,
      'modified': 0,
      'origin': 0,
      'id': null,
      'name': null,
      'protocol': 'OTHER',
      'method': null,
      'address': null,
      'port': 0,
      'path': null,
      'publisher': null,
      'user': null,
      'password': null,
      'topic': null,
      'baseURL': null,
      'url': null
    },
    'lastConnected': 0,
    'lastReported': 0,
    'labels': [],
    'location': null,
    'service': {
      'created': 0,
      'modified': 0,
      'origin': 0,
      'description': null,
      'id': null,
      'name': null,
      'lastConnected': 0,
      'lastReported': 0,
      'operatingState': 'ENABLED',
      'labels': [],
      'addressable': {
        'created': 0,
        'modified': 0,
        'origin': 0,
        'id': null,
        'name': null,
        'protocol': 'HTTP',
        'method': 'POST',
        'address': null,
        'port': 0,
        'path': null,
        'publisher': null,
        'user': null,
        'password': null,
        'topic': null,
        'baseURL': null,
        'url': null
      },
      'adminState': 'UNLOCKED'
    },
    'profile': {
      'created': 0,
      'modified': 0,
      'origin': 0,
      'description': null,
      'id': null,
      'name': null,
      'manufacturer': null,
      'model': null,
      'labels': [],
      'objects': null,
      'deviceResources': [],
      'resources': [],
      'commands': []
    }
  };

  dataDevice = {};//存放选中图标的deviceid对应的device
  currDevice = {};//选中图标的nodedata

  tempDeviceId = '';
  devices;
  attValue=[];
  deviceList = [];
  dataOptions = [];
  presetColors = ['#2ecc71', '#e74c3c'];
  interval = 1; //默认一秒刷新

  visible = false;//主布局右键菜单显示
  addSvgShow = false;//新增图源对话框
  modiShow = false;//修改图源对话框
  saveWork = false;//保存布局对话框显示

  workName = '';
  newGroup;

  //预定义url
  imgUrl = this.url.imgUrl;
  workUrl = this.url.workUrl;
  uploadUrl = this.url.uploadUrl;
  cusUrl = this.url.cusUrl;
  updateCus = this.url.updateCus;
  codeUrl = this.url.codeUrl;

  uploading = false;
  fileList: UploadFile[] = [];
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.key === o2.key : o1 === o2);

  //初始化布局图和工具栏
  initDiagram() {
    var self = this;
    let $ = go.GraphObject.make;
    var DataArray = self.DataArray;  //new一个防止双向绑定更改DataArray后图源列表改变
    var imgUrl = this.imgUrl + '/';

    function showLinkLabel(e) {
      var label = e.subject.findObject('LABEL');
      if (label !== null) {
        label.visible = (e.subject.fromNode.data.category === 'Conditional');
      }
    }

    self.diagram = $(go.Diagram, 'myDiagramDiv',  // must name or refer to the DIV HTML element
      {
        'LinkDrawn': showLinkLabel,  // this DiagramEvent listener is defined below
        'LinkRelinked': showLinkLabel,
        'undoManager.isEnabled': true  // enable undo & redo
      });
    var Palette = $(go.Palette, 'myPaletteDiv',
      {
        'undoManager.isEnabled': true,
        layout: $(go.GridLayout),
      });
    var Palette1 = $(go.Palette, 'myPaletteDiv1',
      {
        'undoManager.isEnabled': true,
        layout: $(go.GridLayout),
      });
    var Palette2 = $(go.Palette, 'myPaletteDiv2',
      {
        'undoManager.isEnabled': true,
        layout: $(go.GridLayout)
      });
    var Palette3 = $(go.Palette, 'myPaletteDiv3',
      {
        'undoManager.isEnabled': true,
        layout: $(go.GridLayout)
      });
    var Palette4 = $(go.Palette, 'myPaletteDiv4',
      {
        'undoManager.isEnabled': true,
        layout: $(go.GridLayout)
      });
    var Palette5 = $(go.Palette, 'myPaletteDiv5',
      {
        'undoManager.isEnabled': true,
        layout: $(go.GridLayout)
      });
    var Palette6 = $(go.Palette, 'myPaletteDiv6',
      {
        'undoManager.isEnabled': true,
        layout: $(go.GridLayout)
      });


    var ToolTip = $(go.HTMLInfo, {
      show: showToolTip,
      hide: hideToolTip,
      // since hideToolTip is very simple,
      // we could have set mainElement instead of setting hide:
      // mainElement: document.getElementById('toolTipDIV')
    });

    var cxElement = document.getElementById('contextMenu');
    // Since we have only one main element, we don't have to declare a hide method,
    // we can set mainElement and GoJS will hide it automatically
    var ContextMenu = $(go.HTMLInfo, {
      show: showContextMenu,
      mainElement: cxElement
    });

    function showToolTip(obj, diagram, tool) {
      var toolTipDIV = document.getElementById('toolTipDIV');
      var pt = diagram.lastInput.viewPoint;
      self.currDevice = obj.data;
      self.matchDevice();
      // console.log(self.currDevice);
      var fromLeft = document.getElementById('leftbar').offsetWidth;
      var left = pt.x + fromLeft + 10;//左侧菜单宽度  左侧图源栏款 10点向右偏移，在鼠标点击位置右侧
      var top = pt.y + 10;
      var r = self.getPos(pt.x, pt.y);
      switch (r) {
        case 1:
          break;
        case 2:
          left -= 240;
          break;
        case 3:
          left -= 240;
          top -= 300;
          break;
        case 4:
          top -= 300;
          break;
        default:
          break;
      }
      toolTipDIV.style.left = left + 'px'; //左边菜单和图源列表固定宽度大概530px，缩放不变
      toolTipDIV.style.top = top + 'px';
      toolTipDIV.style.display = 'block';
    }

    function hideToolTip(diagram, tool) {
      var toolTipDIV = document.getElementById('toolTipDIV');
      toolTipDIV.style.display = 'none';
    }

    function showContextMenu(obj, diagram, tool) {
      // console.log(obj, diagram, tool);
      // Show only the relevant buttons given the current state.
      var cmd = diagram.commandHandler;
      // Now show the whole context menu element
      cxElement.style.display = 'block';
      // we don't bother overriding positionContextMenu, we just do it here:
      self.currDevice = obj.data;
      // self.matchDevice();
      // console.log(self.currDevice);
      var pt = diagram.lastInput.viewPoint;
      var fromLeft = document.getElementById('leftbar').offsetWidth;
      var left = pt.x + fromLeft + 10; //左侧菜单宽度  左侧图源栏款 10点向右偏移，在鼠标点击位置右侧
      var top = pt.y + 10;
      var r = self.getPos(pt.x, pt.y);//计算四角中最接近的，以此调整位置
      // console.log(r);
      switch (r) {
        case 1:
          break;
        case 2:
          left -= 100;
          break;
        case 3:
          left -= 100;
          top -= 150;
          break;
        case 4:
          top -= 150;
          break;
        default:
          break;
      }
      cxElement.style.left = left + 'px'; //左边菜单和图源列表固定宽度大概530px，缩放不变
      cxElement.style.top = top + 'px';
    }

    function nodeStyle() {
      return [
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center
        }
      ];
    }

    function makePort(name, align, spot, output, input) {
      var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
      // the port is basically just a transparent rectangle that stretches along the side of the node,
      // and becomes colored when the mouse passes over it
      return $(go.Shape,
        {
          fill: 'transparent',  // changed to a color in the mouseEnter event handler
          strokeWidth: 0,  // no stroke
          width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
          height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
          alignment: align,  // align the port on the main Shape
          stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
          portId: name,  // declare this object to be a "port"
          fromSpot: align,  // declare where links may connect at this port
          fromLinkable: output,  // declare whether the user may draw links from here
          toSpot: spot,  // declare where links may connect at this port
          toLinkable: input,  // declare whether the user may draw links to here
          cursor: 'pointer',
          // show a different cursor to indicate potential link point
        },
        {
          mouseEnter: function (e, port) {  // the PORT argument will be this Shape
            if (!e.diagram.isReadOnly) {
              port.fill = 'rgba(65,191,236,0.5)';
            }
          }
          ,
          mouseLeave: function (e, port) {
            port.fill = 'transparent';
          }
        }
      );
    }


    //工具栏图形
    Palette.nodeTemplateMap.add('shape',  // the default category
      $(go.Node, 'Table',
        nodeStyle(),
        {
          locationSpot: go.Spot.Center,  // the location is the center of the Shape
          locationObjectName: 'SHAPE',
          selectionAdorned: false,  // no selection handle when selected
          resizable: true, resizeObjectName: 'SHAPE',  // user can resize the Shape
          rotatable: true, rotateObjectName: 'SHAPE',  // rotate the Shape without rotating the label
          // don't re-layout when node changes size
          layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        },
        $(go.Shape,
          {
            name: 'SHAPE',
            strokeWidth: 1,
            stroke: 'black',
            fill: 'transparent',
            width: 16,
            height: 16
          },
          new go.Binding('figure', 'svg')),
      ));

    Palette1.nodeTemplateMap.add('',  // the default category
      $(go.Node, 'Table',
        $(go.Panel, 'Vertical',
          $(go.Picture, {width: 40, height: 40, imageStretch: go.GraphObject.Uniform},
            new go.Binding('source', 'svg', function (svg) {
              return imgUrl + svg + '.svg';
            }),
          ),
          $(go.TextBlock,
            {margin: 2},
            new go.Binding('text', 'svg')
          )),
        // four named ports, one on each side:
      ));

    Palette2.nodeTemplateMap = Palette1.nodeTemplateMap;
    Palette3.nodeTemplateMap = Palette1.nodeTemplateMap;
    Palette4.nodeTemplateMap = Palette1.nodeTemplateMap;
    Palette5.nodeTemplateMap = Palette1.nodeTemplateMap;
    Palette6.nodeTemplateMap = Palette1.nodeTemplateMap;


    self.diagram.nodeTemplateMap.add('picture',  // picture
      $(go.Node, 'Auto',
        nodeStyle(),
        {
          locationSpot: go.Spot.Center,  // the location is the center of the Shape
          locationObjectName: 'PIC',
          selectionAdorned: false,  // no selection handle when selected
          resizable: true, resizeObjectName: 'PIC',  // user can resize the Shape
          rotatable: true, rotateObjectName: 'PIC',  // rotate the Shape without rotating the label
          layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        },
        $(go.Picture,
          {name: 'PIC', width: 80, height: 80, imageStretch: go.GraphObject.UniformToFill},
          new go.Binding('source', 'src'),
        ),
        // Shape.fill is bound to Node.data.color
        // four named ports, one on each side:
        makePort('T', go.Spot.Top, go.Spot.Top, true, true),
        makePort('L', go.Spot.Left, go.Spot.Left, true, true),
        makePort('R', go.Spot.Right, go.Spot.Right, true, true),
        makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, true),
        {toolTip: ToolTip},
        {contextMenu: ContextMenu}
      ));

    self.diagram.nodeTemplateMap.add('Comment',
      $(go.Node, 'Auto', nodeStyle(),
        $(go.Shape, 'Rectangle',
          {fill: '#DEE0A3', strokeWidth: 0}),
        $(go.TextBlock,
          {
            margin: 5,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            textAlign: 'center',
            editable: true,
            font: 'bold 12pt Helvetica, Arial, sans-serif',
            stroke: '#454545'
          },
          new go.Binding('text').makeTwoWay()),
      ));

    self.diagram.nodeTemplateMap.add('shape',
      $(go.Node, 'Auto',
        nodeStyle(),
        {
          locationSpot: go.Spot.Center,  // the location is the center of the Shape
          locationObjectName: 'SHAPE',
          selectionAdorned: false,  // no selection handle when selected
          resizable: true, resizeObjectName: 'SHAPE',  // user can resize the Shape
          rotatable: true, rotateObjectName: 'SHAPE',  // rotate the Shape without rotating the label
          // don't re-layout when node changes size
          layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        },
        $(go.Shape,
          {
            name: 'SHAPE',
            strokeWidth: 2,
            stroke: 'black',
            fill: 'transparent',
            width: 80,
            height: 80
          },
          new go.Binding('figure', 'svg').makeTwoWay()
        ),
        // Shape.fill is bound to Node.data.color
        // four named ports, one on each side:
        makePort('T', go.Spot.Top, go.Spot.TopSide, true, true),
        makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true),
        {toolTip: ToolTip},
        {contextMenu: ContextMenu}
      ));

    self.diagram.nodeTemplateMap.add('',
      $(go.Node, 'Auto',
        nodeStyle(),
        {
          locationSpot: go.Spot.Center,  // the location is the center of the Shape
          locationObjectName: 'PICTURE',
          selectionAdorned: false,  // no selection handle when selected
          resizable: true, resizeObjectName: 'PICTURE',  // user can resize the Shape
          rotatable: true, rotateObjectName: 'PICTURE',  // rotate the Shape without rotating the label
          // don't re-layout when node changes size
          layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        },
        $(go.Picture,
          {
            name: 'PICTURE',  // named so that the above properties can refer to this GraphObject
            width: 80, height: 80, imageStretch: go.GraphObject.Uniform
          },
          new go.Binding('source', 'svg', function (svg) {
            return imgUrl + svg + '.svg';
          }).makeTwoWay(),
        ),
        $(go.Shape, 'Circle',
          {
            name: 'CIRCLE',
            alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
            width: 20, height: 20, strokeWidth: 0
          },
          new go.Binding('fill', 'status', function (s) {
            var color = '#9d9d9d';
            if (s == '1') {
              color = '#00cc00';
            } else if (s == '0') {
              color = '#ee0000';
            }
            return color;
          })
        ),
        makePort('T', go.Spot.Top, go.Spot.TopSide, true, true),
        makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true),
        {toolTip: ToolTip},
        {contextMenu: ContextMenu}
      )
    );

    self.diagram.toolManager.hoverDelay = 300;  // 300 milliseconds

    function spotConverter(dir) {
      if (dir === 'L') {
        return go.Spot.LeftSide;
      }
      if (dir === 'R') {
        return go.Spot.RightSide;
      }
      if (dir === 'T') {
        return go.Spot.TopSide;
      }
      if (dir === 'B') {
        return go.Spot.BottomSide;
      }
    }

    self.diagram.linkTemplate =
      $(go.Link, {
          toShortLength: -2,
          fromShortLength: -2,
          layerName: 'Background',
          routing: go.Link.Orthogonal, //直角
          corner: 15,
        },
        $(go.Shape, {isPanelMain: true, strokeWidth: 10},
          new go.Binding('stroke', function (c) {
            return self.lineColor(c);
          })
        ),
        $(go.Shape, {isPanelMain: true, stroke: 'white', strokeWidth: 3, name: 'PIPE', strokeDashArray: [20, 40]}),
        {contextMenu: ContextMenu}
      );

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:

    self.diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    self.diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    Palette.model  = new go.GraphLinksModel(self.builtIn);
    Palette1.model = new go.GraphLinksModel(DataArray);
    Palette2.model = new go.GraphLinksModel(this.DataArray1);
    Palette3.model = new go.GraphLinksModel(this.DataArray2);
    Palette4.model = new go.GraphLinksModel(this.DataArray3);
    Palette5.model = new go.GraphLinksModel(this.DataArray4);
    Palette6.model = new go.GraphLinksModel(this.DataArray5);

  }

  lineColor(c: any) {
    return '#42bdff';
  }

  //设备右键菜单选项
  click(val) {
    switch (val) {
      case 'addDevice':
        this.visible = true;
        // console.log(this.currDevice);
        break;
      case 'deviceInfo':
        alert(JSON.stringify(this.dataDevice));
        break;
      case 'copy':
        this.diagram.commandHandler.copySelection();
        this.diagram.commandHandler.pasteSelection(this.diagram.lastInput.documentPoint);
        break;
      case 'delete':
        this.diagram.commandHandler.deleteSelection();
        break;
    }
    this.diagram.currentTool.stopTool();
  }

  //添加分组，弹出对话框
  addSvg() {
    this.addSvgShow = true;
  }

  //修改现有分组，弹出对话框
  modiSvg() {
    this.modiShow = true;
  }

  //保存前，若非新增 直接保存
  beforeSave() {
    this.saveWork = true;//弹出保存对话框 认为是新增
    this.autoCode();
  }

  //保存对话框的确定事件 检查名称是否有重复
  modalSave() {
    this.save(true);
  }

  //保存布局
  save(r: boolean) {
    let data = {
      'name': this.workName,//布局名称
      'key': UUID.UUID(),
      'class': this.currWork.class,
      'linkDataArray': this.currWork.linkDataArray,
      'nodeDataArray': this.currWork.nodeDataArray,

      //gojs未预置的属性 直接绑定到图标模型会报错
      'note': this.note,
      'code': this.code,//未指定编号的交到后台处理
      'sence': this.sence, //关联场景
      'released': r ? true : this.released, //发布标记
    };
    console.log(JSON.stringify(data));
    let post = {
      opt: 'save',
      workspace: data
    };
    //新增
    this.http.post(this.workUrl, post).subscribe(res => {
      this.currWork=JSON.parse(JSON.stringify(res));
      this.message.success('保存成功');
    }, error1 => {
      this.message.info('保存失败:' + error1);
    });
    this.saveWork = false;
  }

  //计算最接近的四角，弹出菜单时避免超边界
  getPos(w, h) {
    var backH = $('#myDiagramDiv').height();//去px绝对数值
    var backW = $('#myDiagramDiv').width();//去px绝对数值
    // console.log(w, backW, h, backH);
    if (h < backH / 2) {
      if (w <= backW / 2) {
        return 1;//左上角
      } else if (w > backW / 2) {
        return 2;//右上角
      }
    }
    if (h > backH / 2) {
      if (w >= backW / 2) {
        return 3;//右下角
      } else if (w < backW / 2) {
        return 4;//左下角
      }
    }
  }

  //加载，重新加载，从列表传进来的布局图，未保存前可刷新加载
  load() {
    this.diagram.model = go.Model.fromJson(this.currWork);
    //绑定出入点字段，必需放在go.Model.fromJson之后，别问为什么，我也不清楚
    this.diagram.model.linkFromPortIdProperty = 'fromPortId';
    this.diagram.model.linkToPortIdProperty = 'toPortId';
  }

  //获取后台设备列表
  getDevice() {
  }

  //匹配当前选中的设备
  matchDevice() {
    try {
      this.dataDevice = this.currDevice['deviceid'] ? this.devices.filter(d => d.id === this.currDevice['deviceid'])[0] : this.defaultDevice;
    } catch (e) {

    }
  }

  //设备对话框取消
  handleCancel() {
    this.visible = false;
    this.addSvgShow = false;
    this.modiShow = false;
  }

  //设备对话框确认
  handleOk() {
    this.visible = false;
    this.currDevice['deviceid'] = this.tempDeviceId; //确认改变currdevice
    this.tempDeviceId = '';
    // console.log(this.currDevice);
    this.message.success('成功绑定设备');
  }

  //打开设备对话框
  handleOpen() {
    this.tempDeviceId = this.currDevice['deviceid'];//赋值给下拉框绑定数据，避免双向绑定改变currdevice
  }

  //关闭设备对话框，等同取消
  handleClose() {
    this.handleCancel();
  }

  //缩放
  zoomOut(n) {
    this.diagram.commandHandler.increaseZoom(n);
  }

  //添加备注
  addComm() {
    this.diagram.model.nodeDataArray = [...this.diagram.model.nodeDataArray, {category: 'Comment', text: '添加备注'}];
    // console.log(this.diagram.model.nodeDataArray);
    // console.log(typeof (this.diagram.model.nodeDataArray));
  }

  //初始
  init() {
    this.getDevice();//获取可用设备，来自edge
    this.initDiagram();//初始化布局图表
    this.diagram.model = go.Model.fromJson(this.currWork);
    this.diagram.model.linkFromPortIdProperty = 'fromPortId';
    this.diagram.model.linkToPortIdProperty = 'toPortId';
    this.getCus();//获取图表自定义分组
    setTimeout(() => {

    }, 500);
    $('.ant-collapse-content-box').css('padding', '0');//去折叠面板padding，默认16px
  }

  //动画循环
  loop() {
    this.stopLoop();
    var self = this;
    var diagram = self.diagram;
    self.timeOutId = setTimeout(function () {
      var oldskips = diagram.skipsUndoManager;
      diagram.skipsUndoManager = true;
      diagram.links.each(function (link) {
        var shape = link.findObject('PIPE');
        var off = shape.strokeDashOffset - 3;
        // animate (move) the stroke dash
        shape.strokeDashOffset = (off <= 0) ? 60 : off;
        // animte (strobe) the opacity:
        if (self.down) {
          self.opacity = self.opacity - 0.005;
        } else {
          self.opacity = self.opacity + 0.003;
        }
        if (self.opacity <= 0.3) {
          self.down = !self.down;
          self.opacity = 0.3;
        }
        if (self.opacity > 1) {
          self.down = !self.down;
          self.opacity = 1;
        }
        shape.opacity = self.opacity;
      });
      diagram.nodes.each(function (node) {
        var circle = node.findObject('CIRCLE');
        if (self.down) {
          self.opacity = self.opacity - 0.005;
        } else {
          self.opacity = self.opacity + 0.003;
        }
        if (self.opacity <= 0.3) {
          self.down = !self.down;
          self.opacity = 0.3;
        }
        if (self.opacity > 1) {
          self.down = !self.down;
          self.opacity = 1;
        }
        circle.opacity = self.opacity;
      });
      diagram.skipsUndoManager = oldskips;
      self.loop();
    }, 60);
  }

  //停止动画循环
  stopLoop() {
    clearTimeout(this.timeOutId);
  }

  //上传自定义图标前
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  config=false;
  device=null;
  option;
  loading=false;

  //上传自定义图标3
  handleUpload() {
    if (this.fileList.length < 1) {
      this.message.info('请选择上传图源');
      return;
    }
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.cusUpload = this.cusAva.filter(d => d.divid === this.cusUpload.divid)[0];
    // console.log(this.fileList);
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
      this.cusUpload.svg = [...this.cusUpload.svg, {svg: file.name, deviceid: '', status: ''}];
    });
    // console.log(JSON.stringify(this.fileList));
    this.cusUpload.display = true;
    formData.append('cusMenu', JSON.stringify(this.cusUpload));//发送本次修改的自定义分组及其内容 后台更新
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', this.uploadUrl, formData, {
      // reportProgress: true
    });
    this.http.request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
        },
        () => {
          this.uploading = false;
          this.message.error('upload failed.');
          return;
        }
      );
    this.http.post(this.updateCus, this.cusUpload).subscribe(res => {
      this.message.success('upload successfully.');
    });
  }

  //添加自定义分组
  handleNew() {
    let index = this.cusAva.length;
    if (index >= 10) {
      this.message.warning('最多可添加十个自定义分组');
      return;
    }
    let divid = 'cus' + index;
    this.cusAva = [...this.cusAva, {
      divid: divid,
      dispaly: true,
      name: this.newGroup,
      svg: []
    }];
    this.cusUpload.divid = divid;
    // this.getCus();
    this.handleUpload();
  }

  //修改分组对话框选项变更
  selectedChanged() {
    this.fileList = [];
    // console.log('changed');
    this.http.get(this.cusUrl).subscribe(res => {
      let data;
      data = res;
      // console.log(data);
      let files = data.filter(d => d.display === true && d.divid === this.cusUpload.divid);
      files.forEach(e => {
        e['svg'].forEach(ec => {
          let file: UploadFile = {
            uid: UUID.UUID(),
            size: 5555,
            name: ec['svg'],
            filename: ec['svg'] + '.svg',
            lastModified: '1551340778344',
            lastModifiedDate: new Date(),
            type: 'image/svg+xml'
          };
          this.fileList = [...this.fileList, file];
        });
      });
      // console.log(this.fileList);
    }, error1 => {
      // console.log(error1);
    });
  }

  //获取所有自定义分组信息
  getCus() {
    this.http.get(this.cusUrl).subscribe(res => {
      this.cusData = res;
      this.cusAva = this.cusData.filter(d => d.display === true);//已自定义的信息
      var self = this;
      // console.log('ava' + JSON.stringify(this.cusAva));
      this.cusAva.forEach(e => {
          this.cusMenu[e.divid[e.divid.length - 1]] = e;
          document.getElementById(e.divid).style.display = 'block';//显示上传过的分组
          let $ = go.GraphObject.make;

          var cusPalette = $(go.Palette, e.divid + 'div',
            {
              layout: $(go.GridLayout),
            });

          //删除自定义图标，实际是更新
          function remove(e, obj) {
            cusPalette.commit(function (d) {
              var contextmenu = obj.part;
              var nodedata = contextmenu.data;
            });
          }

          cusPalette.nodeTemplateMap.add('',  // the default category
            $(go.Node, 'Table',
              $(go.Panel, 'Vertical',
                $(go.Picture, {width: 40, height: 40, imageStretch: go.GraphObject.Uniform},
                  new go.Binding('source', 'svg', function (svg) {
                    return self.uploadUrl + '/' + svg + '.svg';
                  }),
                ),
                $(go.TextBlock,
                  {margin: 2},
                  new go.Binding('text', 'svg')
                )),
              {
                contextMenu:     // define a context menu for each node
                  $('ContextMenu',  // that has one button
                    $('ContextMenuButton',
                      $(go.TextBlock, '删除图标', {click: remove}),
                    )
                  )
              }
            ));
          cusPalette.model = new go.GraphLinksModel(e.svg);
        }
      );
      // console.log(this.cusMenu);
    });
  }

  autoCode() {
    if (!this.code) {
      this.http.get(this.codeUrl).subscribe(res => {
        this.code = 'TOPO_0000' + res.toString();
      });
    }
  }

  ngOnInit() {
    this.init();
    this.getList();
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

  getList() {
    this.deviceService.deviceList().then(res => {
        this.deviceList = res.filter(d => d.display);
        this.spliceViewList(this.deviceList);
      },
      err => {
        this.spliceViewList(this.deviceList);
      });
  }

  spliceViewList(list) {
    this.keys = this.deviceList.map(d => {
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
        this.matchValue(r)
      });
      $('.card').draggable({scroll: false});

      this.connectWs();//建立ws协议，自动刷新
    }, err => {
    });
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

  matchValue(c) {
    try {
        var e = $('#' + c+'chart');
        var chart = echarts.init(e.get(0));
        chart.setOption(this.dataOptions.filter(d => d['device'] == c)[0]['option']);
        new ResizeSensor(e, function () {
          chart.resize();
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
      this.matchValue(r);
    });
  }

  addAttr() {
    this.device.attrs = [...this.device.attrs.filter(a => a.code != 'null'), {
      key: null,
      name: null,
      code: UUID.UUID(),
      unit: null,
      description: null,
      valuetype: 'number',
      display:true,
      sum: false
    }];
    this.addNullAtt();
  }

  addNullAtt() {
    this.device.attrs = [...this.device.attrs, {
      key: null,
      name: null,
      code: 'null',
      unit: null,
      description: null,
      valuetype: null,
      display:true,
      sum: false
    }];
  }

  //删除设备属性
  remove(code: any) {
    this.device.attrs = this.device.attrs.filter(a => a.code != code);
  }

  //获取模板列表
  getTemplate() {
    this.loading = true;
    this.deviceService.deviceTempList().then(res => {
      this.templateList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  templateChanged() {
    this.device.template ? this.templateRequire = true : this.templateRequire = false;
    this.device.attrs = this.device.template.attrs;
    this.addNullAtt();
  }

  //卡片编辑 打开对话框
  editCard(device){
    this.device=device;
    this.config=true;
    this.getTemplate();
    this.parseInterval();
    this.addNullAtt();
  }

  //
  closeConfig(){
    this.device.attrs = this.device.attrs.filter(a => a.code != 'null'); //去除添加尾行
    this.config=false;
  }

  submit() {
    this.loading = true;
    this.validate();
    if (this.codeRequire && this.nameRequire && this.templateRequire) {
      let data = JSON.parse(JSON.stringify(this.device));
      data.interval = JSON.parse(JSON.stringify(this.t));
      switch (this.timeUint) {
        case 'ms':
          data.interval = data.interval * 1;
          break;
        case 's':
          data.interval = data.interval * 1000;
          break;
        case 'min':
          data.interval = data.interval * 1000 * 60;
          break;
        case 'h':
          data.interval = data.interval * 1000 * 60 * 60;
          break;
        case 'd':
          data.interval = data.interval * 1000 * 60 * 60 * 24;
          break;
        default:
          break;
      }
      // data.interval = data.interval.toString();
      data.attrs = data.attrs.filter(a => a.code != 'null'); //去除添加尾行
          this.deviceService.updateDevice(data).then(res => {
            this.closeConfig();
          }, err => {
          });
    } else {
      this.message.warning('请完善表单信息');
      this.loading = false;
    }
  }

  //计算时间间隔显示值
  parseInterval() {
    this.t = this.device['interval'] ? JSON.parse(JSON.stringify(this.device))['interval'] : 0;
    if (this.t >= 1000 && this.t % 1000 == 0) {
      this.timeUint = 's';
      this.t = this.t / 1000;
      if (this.t >= 60 && this.t % 60 == 0) {
        this.timeUint = 'min';
        this.t = this.t / 60;
        if (this.t >= 60 && this.t % 60 == 0) {
          this.timeUint = 'h';
          this.t = this.t / 60;
          if (this.t >= 24 && this.t % 24 == 0) {
            this.timeUint = 'd';
            this.t = this.t / 24;
          }
        }
      }
    }
  }

  //提交前验证
  validate() {
    if (this.device.code) {
      this.codeRequire = true;
    } else {
      this.codeRequire = false;
    }
    if (this.device.name) {
      this.nameRequire = true;
    } else {
      this.nameRequire = false;
    }
    if (this.device.template) {
      this.templateRequire = true;
    } else {
      this.templateRequire = false;
    }
  }

}
