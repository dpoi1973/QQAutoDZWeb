import baseGridComponent from '../../basejs/baseGrid.js';
class ywInfocopyComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $uibModal) {
    super($log, 'YWinfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {CustYWNO: '', pageIndex: 1, pageSize: 20};
    // this.searchCondition = {condition: {Ywno: ''}, filename: '', pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.$scope.onRowclicked = this.onRowclicked;
    this.search();
    this.text = "";
    this.$state = $state;
    this.$http = $http;
  }
  initgridCellTemplate(columelist) {
    this.$log.log(columelist);
    // columelist[0].cellTemplate ='<ui><a ui-sref="waibuShuJu.detail({id: row.entity.id})">{{row.entity.custYWNO}} </a></ui>';
    columelist[0].cellTemplate = '<ui><a ui-sref="ywInfocopy.detail({id: row.entity.id})">{{row.entity.CustYWNO}} </a></ui>';
  }

  // findAll(keyword) {
  //   if (keyword === null) {
  //     return;
  //   }
  //   this.searchCondition.condition = {
  //     orCustYWNO: keyword, orYWNO: keyword
  //   };
  //   this.searchCondition.pageIndex = 1;
  //   this.search();
  // }
}
export const ywinfocopycomponent = {
  template: require('./ywInfoComponent.html'),
  controller: ywInfocopyComponentController
};

