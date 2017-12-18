import baseGridComponent from '../../basejs/baseGrid.js';
class luWeiComponentController extends baseGridComponent {
   // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http) {
    super($log, 'custproductcommoninfo', GridOptionService, CommonUtilsService);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$log = $log;
    this.$scope.onRowclicked = this.onRowclicked;
    this.s();
    this.$state = $state;
    this.$http = $http;
    this.CommonUtilsService = CommonUtilsService;
  }
  s() {
    this.CommonUtilsService.getOneData(this.searchCondition)
      .then(results => {
        this.$log.log(11111);
        // count = 0
        // if(results.datas==''||results.datas==null){
        //   return this.gridOptions.data = "";
        // }
        this.gridOptions.totalItems = results.totalCount;
        this.listData = results.datas;
        this.gridOptions.data = this.listData;
      });
  }
}

export const luWeicomponent = {
  template: require('./luWei.html'),
  controller: luWeiComponentController
};
