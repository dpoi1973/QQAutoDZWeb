import baseGridComponent from '../../basejs/baseGrid.js';
class SpXinXiComponentController extends baseGridComponent {
   // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $window, $uibModal) {
    super($log, 'CustProductDetailInfo', GridOptionService, CommonUtilsService);
    this.searchCondition = {condition: {SKU: '', GoodsclassEN: ''}, filename: '', pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.$scope.onRowclicked = this.onRowclicked;
    this.search();
    this.$state = $state;
  }

  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a target="_blank" ui-sref="spXinXi.detail({id: row.entity.id})">{{row.entity.SKU}} </a></ui>';
  }
  onRowclicked(hscode) {
    this.$log.log(hscode);
  }
  Daoru() {
    const url = this.$state.href('spXinXi.detail', {id: 0});
    this.$window.open(url, '_blank');
  }
  findAll(modelkey, $model) {
    if (modelkey === null) {
      return;
    }
    if (this.selectcompany) {
      this.$log.log(this.selectcompany);
    }
    // if(document.getElementById('searchproductid').checked){ //eslint-disable-line
    //   this.searchCondition.condition = {custid: this.selectcompany, orSKU: modelkey, orHScode: modelkey, orStatus: modelkey, orCgoodsname: modelkey, orCspec: modelkey, orstatus: modelkey, ClassifiedProductid: 0};
    //   this.searchCondition.pageIndex = 1;
    //   this.search();
    // } else {
    this.searchCondition.condition = {custid: this.selectcompany, orSKU: modelkey, orHScode: modelkey, orStatus: modelkey, orCgoodsname: modelkey, orCspec: modelkey, orstatus: modelkey};
    this.searchCondition.pageIndex = 1;
    this.search();
    // }
  }
  checkproductid() {
    this.$log.log(document.getElementById('searchproductid').checked); //eslint-disable-line
    if(document.getElementById('searchproductid').checked){ //eslint-disable-line
      this.searchCondition.condition = {ClassifiedProductid: 0, custid: this.selectcompany};
      this.search();
    } else {
      this.searchCondition.condition = {custid: this.selectcompany};
      this.search();
    }
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
  syntemj() {
    this.CommonUtilsService.syntemj(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  syntemjlocal() {
    this.CommonUtilsService.syntemjlocal(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  refreshmd5andlink() {
    this.CommonUtilsService.refreshmd5andlink(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  downloadnewsku() {
    this.$log.log(this.selectcompany);
    if (this.selectcompany == undefined) {// eslint-disable-line
      alert("请先选择客户"); // eslint-disable-line no-alert
    }
  }
}

export const spxinxicomponent = {
  template: require('./spXinXiComponent.html'),
  controller: SpXinXiComponentController
};

