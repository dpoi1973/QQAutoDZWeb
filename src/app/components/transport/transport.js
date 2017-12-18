import baseGridComponent from '../../basejs/baseGrid.js';
class transportComponentController extends baseGridComponent {
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $window) {
    super($log, '', GridOptionService, CommonUtilsService, $scope);
    this.$http = $http;
    this.$log = $log;
    this.numtest = "";
    this.company = ["通用药业", "上海恒诺国际贸易有限公司", "德迅(中国)货运代理有限公司", "EPSON", "台积电(上海)有限公司"];
    this.gridOptions = {
      paginationPageSizes: [15, 20, 25],
      paginationPageSize: 20,
      useExternalPagination: true,
      useExternalSorting: true,
      enableGridMenu: true,
      multiSelect: false,
      data: [
        {suppot: "东辉", customer: "外高桥港区", order: "上海恒诺国际贸易有限公司", transport: "外高桥保税区"},
        {suppot: "东辉", customer: "外高桥港区", order: "上海恒诺国际贸易有限公司", transport: "外高桥保税区"},
        {suppot: "东辉", customer: "外高桥港区", order: "上海恒诺国际贸易有限公司", transport: "外高桥保税区"},
        {suppot: "东辉", customer: "外高桥港区", order: "上海恒诺国际贸易有限公司", transport: "外高桥保税区"},
        {suppot: "东辉", customer: "外高桥港区", order: "上海恒诺国际贸易有限公司", transport: "外高桥保税区"},
        {suppot: "东辉", customer: "外高桥港区", order: "上海恒诺国际贸易有限公司", transport: "外高桥保税区"}
      ],
      columnDefs: [
                {name: '供应商', field: 'suppot', width: 100},
        {name: '结算客户', field: 'customer', width: 200, cellTemplate: '<ui-select ng-model="dfsdaf" ng-disabled="false" style="width:100%">' +
            '<ui-select-match style="overflow:hidden">{{$select.selected.item || $select.selected}}</ui-select-match>' +
            '<ui-select-choices repeat="item in grid.appScope.$ctrl.company">' +
              '<small ng-bind-html="item" | highlight: $select.search"></small>' +
            '</ui-select-choices>' +
             '</ui-select>'},
                {name: '提货点', field: 'order', width: 200},
                {name: '运送地', field: 'transport', width: 100, cellTemplate: '<button>测试</button>'},
                {name: '普通2吨', field: 'nomTwoT', width: 100},
                {name: '普通2吨', field: 'nomfiveT', width: 100},
                {name: '普通10吨', field: 'nomtenT', width: 100},
                {name: '2吨白卡', field: 'TwoTwhite', width: 100},
                {name: '5吨白卡', field: 'fiveTwhite', width: 100},
                {name: '10吨白卡', field: 'tenTwhite', width: 100},
                {name: '气垫车', field: 'hovercraft', width: 100},
                {name: '冷藏车', field: 'chillcar', width: 100}
      ]
    };
    this.initGridAPI();
  }
  initGridAPI() {
    const pp = this;
    pp.gridOptions.onRegisterApi = function (gridApi) {
      pp.gridApi = gridApi;
      pp.gridapidselect();
    };
  }
  gridapidselect() {
    const pp = this;
    pp.gridApi.selection.on.rowSelectionChanged(pp.$scope, row => {
      const msg = `row selected ${row.isSelected}`;
      if (row.isSelected) {
        pp.selectRow = row.entity;
      } else {
        pp.selectRow = {};
      }
      this.$log.log(pp.selectRow);
      this.$log.log(pp.gridApi.selection.getSelectedRows());
    });
  }
  addselect() {
    this.$log.log(this.gridApi.selection.getSelectedRows());
  }
}

export const transportcomponent = {
  template: require('./transport.html'),
  controller: transportComponentController
};
