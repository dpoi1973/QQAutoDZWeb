import baseGridComponent from '../../basejs/baseGrid.js';
class ywInfoComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $uibModal) {
    super($log, 'YWinfo', GridOptionService, CommonUtilsService, $scope);
    // this.searchCondition = {CustYWNO: '', pageIndex: 1, pageSize: 20};
    this.searchCondition = {condition: {Ywno: ''}, filename: '', pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.$scope.onRowclicked = this.onRowclicked;
    this.search();
    this.text = "";
    this.$state = $state;
    this.$http = $http;
    this.selectcompany = "";
  }
  initgridCellTemplate(columelist) {
    this.$log.log(columelist);
    // columelist[0].cellTemplate ='<ui><a ui-sref="waibuShuJu.detail({id: row.entity.id})">{{row.entity.custYWNO}} </a></ui>';
    columelist[0].cellTemplate = '<ui><a ui-sref="ywInfo.detail({id: row.entity.id})">{{row.entity.CustYWNO}} </a></ui>';
  }

  findAll(keyword) {
    this.$log.log(this.selectcompany);
    if (keyword === null) {
      return;
    }
    this.searchCondition.condition = {
      orCustYWNO: keyword, orYWNO: keyword, orcreateperson: keyword, custid: this.selectcompany
    };
    this.searchCondition.pageIndex = 1;
    this.search();
  }
  searchasynccustname(query, $model) {
    this.searchCondition = {condition: {custname: query}, pageIndex: 1, pageSize: 20};
    if (!query) {
      this.searchCondition.condition = {custid: this.selectcompany};
    }
    this.CommonUtilsService.getSearchList('CustInfo', this.searchCondition)
      .then(results => {
        this.selsource1 = results.datas;
      });
  }
  beCustidSelected($item, $model) {
    const tthis = this;
    this.$log.log($model);
    tthis.searchCondition.condition = {custid: $model};
    tthis.search();
  }
  removecompany() {
    this.selectcompany = "";
    this.search();
  }
}
export const ywinfocomponent = {
  template: require('./ywInfoComponent.html'),
  controller: ywInfoComponentController
};

