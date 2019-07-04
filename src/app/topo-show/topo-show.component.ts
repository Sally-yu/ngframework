import {Component, OnInit} from '@angular/core';
import {TopoService} from '../topo.service';
import {UrlService} from '../url.service';
import * as go from '../../assets/js/go.js';
import {ModelService} from '../model.service';
import {UserService} from '../user.service';

declare var $: any;

@Component({
  selector: 'app-topo-show',
  templateUrl: './topo-show.component.html',
  styleUrls: ['./topo-show.component.less']
})
export class TopoShowComponent implements OnInit {

  detail = false;
  searchValue;
  loading = false;
  currentIndex = 1;
  pageSize = 8;
  viewList = [];
  list = [];
  workspace;

  cardColor = '#deeef9dd';

  constructor(
    private userSrv: UserService,
    private topoSrv: TopoService,
    private url: UrlService,
  ) {
  }

  initDiagram(workSpace: any) {
    let $ = go.GraphObject.make;
    let self = this;
    const imgUrl = this.url.imgUrl + '/';

    function showLinkLabel(e) {
      const label = e.subject.findObject('LABEL');
      if (label !== null) {
        label.visible = (e.subject.fromNode.data.category === 'Conditional');
      }
    }

    var diagram;
    diagram = $(go.Diagram, workSpace.key,  // must name or refer to the DIV HTML element
      {
        'LinkDrawn': showLinkLabel,  // this DiagramEvent listener is defined below
        'LinkRelinked': showLinkLabel,
      });

    diagram.isReadOnly = true;

    function nodeStyle() {
      return [
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center
        }
      ];
    }

    // function makePort(name, align, spot, output, input) {
    //   var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
    //   // the port is basically just a transparent rectangle that stretches along the side of the node,
    //   // and becomes colored when the mouse passes over it
    //   return $(go.Shape,
    //     {
    //       fill: 'transparent',  // changed to a color in the mouseEnter event handler
    //       strokeWidth: 0,  // no stroke
    //       width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
    //       height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
    //       alignment: align,  // align the port on the main Shape
    //       stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
    //       portId: name,  // declare this object to be a "port"
    //       fromSpot: align,  // declare where links may connect at this port
    //       fromLinkable: output,  // declare whether the user may draw links from here
    //       toSpot: spot,  // declare where links may connect at this port
    //       toLinkable: input,  // declare whether the user may draw links to here
    //       cursor: 'pointer',
    //       // show a different cursor to indicate potential link point
    //     }
    //   );
    // }

    diagram.nodeTemplateMap.add('picture',  // picture
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
        // makePort('T', go.Spot.Top, go.Spot.Top, true, true),
        // makePort('L', go.Spot.Left, go.Spot.Left, true, true),
        // makePort('R', go.Spot.Right, go.Spot.Right, true, true),
        // makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, true),
      ));

    diagram.nodeTemplateMap.add('Comment',
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

    diagram.nodeTemplateMap.add('shape',
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
        // makePort('T', go.Spot.Top, go.Spot.TopSide, true, true),
        // makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        // makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        // makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true),
      ));

    diagram.nodeTemplateMap.add('',
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
            let color = '#9d9d9d';
            if (s == '1') {
              color = '#00cc00';
            } else if (s == '0') {
              color = '#ee0000';
            }
            return color;
          })
        ),
        // makePort('T', go.Spot.Top, go.Spot.TopSide, true, true),
        // makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
        // makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
        // makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, true),
      )
    );

    diagram.toolManager.hoverDelay = 300;  // 300 milliseconds

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

    diagram.linkTemplate =
      $(go.Link, {
          toShortLength: -2,
          fromShortLength: -2,
          layerName: 'Background',
          routing: go.Link.Orthogonal, //直角
          corner: 15,
        },
        $(go.Shape, {isPanelMain: true, stroke: '#41BFEC'/* blue*/, strokeWidth: 10},
          new go.Binding('stroke', 'color')),
        $(go.Shape, {isPanelMain: true, stroke: 'white', strokeWidth: 3, name: 'PIPE', strokeDashArray: [20, 40]})
      );

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:

    diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    diagram.model = go.Model.fromJson(workSpace);
    diagram.model.linkFromPortIdProperty = 'fromPortId';
    diagram.model.linkToPortIdProperty = 'toPortId';
    diagram.commandHandler.increaseZoom(this.zoom());
  }

  //根据宽度测算展示缩放
  zoom() {
    var w = $('body').width();
    return (w - 384) / 4 / (w - 526);//基本还原编辑页面中占位效果
  }

  ngOnInit() {
    this.loading = true;
    this.getList();
  }

  search() {
    var self = this;
    var value = JSON.parse(JSON.stringify(this.searchValue));
    setTimeout(function () {
      if (value === self.searchValue) {
        self.loading = true;
        self.topoSrv.getList().then(res => {
          self.list = JSON.parse(JSON.stringify(res)).filter(w => {
            return w.name.indexOf(self.searchValue) >= 0 || w.code.indexOf(self.searchValue) >= 0;
          });
          self.spliceViewList();
        }, err => {
          self.loading = false;
        });
      }
    }, 800);//延时 搜索内容不变后，开始搜索
  }

  getList() {
    this.loading = true;
    this.topoSrv.getList().then(res => {
      this.list = JSON.parse(JSON.stringify(res));
      this.list = this.list.filter(l => l.released);
      this.spliceViewList();
    }, err => {
      this.loading = false;
    });
  }

  //切换页码
  indexChange(n: number) {
    this.currentIndex = n;
    this.loading = true;
    this.spliceViewList();
  }

  //切换每页条数
  sizeChange(n: number) {
    this.pageSize = n;
    this.loading = true;
    this.spliceViewList();
  }

  spliceViewList() {
    this.viewList = JSON.parse(JSON.stringify(this.list)).splice((this.currentIndex - 1) * this.pageSize, this.pageSize);
    if (this.viewList.length < 1) {
      this.loading = false;
    } else {
      setTimeout(() => {
        this.viewList.forEach(v => {
          this.initDiagram(v);
          this.loading = false;
        }, 100);
      });
    }
  }

  cancel($event: any) {
    if (event) {
      this.detail = false;
      this.getList();
    }
  }

  view(obj: any) {
    this.workspace = JSON.parse(JSON.stringify(obj));
    this.detail = true;
  }

  setIndex(item) {
    var user = this.url.key();
    this.userSrv.getUser(user).then(res => {
      res.index = this.url.topoUrl+"/topo/detail/"+item.key;
      this.userSrv.update(res).then(r => {

      }, er => {

      });
    }, res => {

    });
  }
}
