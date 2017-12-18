import baseGridComponent from '../../basejs/baseGrid.js';
const APPAPI = '/api';
const APPURL = '/api/printer';
const async = require('async');
class baoGuandanController extends baseGridComponent {
  // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, $state, $scope, $window, $http, $uibModal) {
    super($log, 'FormHead', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {pre_entry_id: ''}, pageIndex: 1, sortby: 'id DESC', pageSize: 20};
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.$http = $http;
    this.$window = $window;
    this.$scope.onRowclicked = this.onRowclicked;
    this.search();
    this.$state = $state;
    this.CommonUtilsService = CommonUtilsService;
    this.selectrow = [];
   // this.getselectbtn();
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a  ui-sref="baoGuanDanComponent.detail({id: row.entity.id})">{{row.entity.COP_NO}} </a></ui>';
    columelist[1].cellTemplate = '<ui><a  ui-sref="ywInfo.detail({id: row.entity.ywid})">{{row.entity.ywno}} </a></ui>';
    // columelist[2].cellTemplate = '<ui><button type="button" id=id{{row.entity.id}} class="changeid"  ng-click="grid.appScope.$ctrl.printer($event)" style="float:right; display:none">打印</button>{{row.entity.ie_flag}}</ui>';
  }
  Daoru() {
    const tthis = this;
    this.$log.log("Daoru"); //eslint-disable-line
    this.$state.go('baoGuanDanComponent.detail', tthis.detailID);
  }
  okbtn() {
    const tthis = this;
    this.detailall((err, data) => { // eslint-disable-line
      if (data === "ok") {
        this.text = "删除成功";
      } else {
        this.text = "删除失败";
      }
      tthis.search();
    });
    document.getElementById('okbtn').style.display = "none"; //eslint-disable-line
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  send() {
    const tthis = this;
    const selectids = this.gridApi.selection.getSelectedRows();
    this.CommonUtilsService.send(selectids).then(obj => {
      alert('ok');// eslint-disable-line
    }).catch(err => {
      alert(err);// eslint-disable-line
    });
  }

  findAll(keyword) {
    if (keyword === null) {
      return;
    }
    this.searchCondition.condition = {
      orywno: keyword,
      orCOP_NO: keyword
    };
    this.$log.log(this.searchCondition.condition);
    this.searchCondition.pageIndex = 1;
    this.search();
  }
  printer(e) {
    // // 按钮打印
    // this.$log.log(e.srcElement.id);
    // const srcid = e.srcElement.id.substr(2);
    // this.$log.log(srcid);
    // this.CommonUtilsService.getDetailbyiModelId(this.ModelName, srcid).then(data => {
    //   this.open('POST', `${APPURL}/makePdf`, data.data, '_blank');
    // });
    this.gridApi.selection.getSelectedRows().forEach(resp => {
      this.CommonUtilsService.getDetailbyiModelId(this.ModelName, resp.id).then(data => {
        this.$log.log(data.data);
        this.selectrow = data.data;
        async.mapSeries(data.data.formlist, (list, call) => {
          this.CommonUtilsService.sendvalidatevalue('unit', list.unit_1).then(data => {
                  // tthis.$log.log(tthis.detailInfo.formlist[i].unit_1)
            list.unit_1 = data.data.split('[')[0];
            return this.CommonUtilsService.sendvalidatevalue('unit', list.g_unit);
          }).then(data1 => {
                      // tthis.$log.log(tthis.detailInfo.formlist[i].unit_1)
            list.g_unit = data1.data.split('[')[0];
            call(null, 'ok');
          });
        }, (err, result) => {
          this.$log.log(err, result);
          this.$log.log(data.data.formlist);
          this.open('POST', `${APPURL}/makePdf`, data.data, '_blank');
        });
      });
    });
  }
  getselectbtn() {
    const pp = this;
    pp.gridOptions.onRegisterApi = function (gridApi) {
      pp.gridApi = gridApi;
      pp.pageinagtion();
      pp.sorting();
      // pp.gridApi.selection.on.rowSelectionChangedBatch(pp.$scope, row => {
      //   pp.$log.log(pp.gridApi.selection.getSelectedRows());
      //   if (pp.gridApi.selection.getSelectedRows().length < 1) {
      //     for (let j = 0; j < pp.gridOptions.data.length; j++) {
      //       document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "none"; //eslint-disable-line
      //     }
      //   } else {
      //     for (let j = 0; j < pp.gridOptions.data.length; j++) {
      //       document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "block"; //eslint-disable-line
      //     }
      //   }
      // });
      pp.gridApi.selection.on.rowSelectionChanged(pp.$scope, row => {
        for (let j = 0; j < pp.gridOptions.data.length; j++) {
         document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "none"; //eslint-disable-line
        }
        if (pp.gridApi.selection.getSelectedRows().length > 0) {
          for (let i = 0; i < pp.gridApi.selection.getSelectedRows().length; i++) {
           document.getElementById(`id${pp.gridApi.selection.getSelectedRows()[i].id}`).style.display = "block"; // eslint-disable-line
           document.getElementById(`id${pp.gridApi.selection.getSelectedRows()[i].id}`).style.cssFloat = "right"; // eslint-disable-line
          }
        }
      });
      if (pp.gridApi.selection.getSelectAllState() == true) { //eslint-disable-line
        for (let j = 0; j < pp.gridOptions.data.length; j++) {
          document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "block"; //eslint-disable-line
        }
      }
    };
  }

}

export const baoguandancomponent = {
  template: require('./baoGuanDanComponent.html'),
  controller: baoGuandanController
};
