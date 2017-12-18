const APPAPI = '/api';
import baseGridComponent from '../../basejs/baseGrid.js';
class paracomComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $interval, $uibModal) {
    super($log, 'paracom', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$scope.onRowclicked = this.onRowclicked;
    this.text = "";
    this.$q = $q;
    this.$interval = $interval;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.$http = $http;
    this.initGridAPIedit();
    this.search();
  }
  okbtn() {
    const _this = this;
    if (this.gridApi.selection.getSelectedRows().length === 0) {
    document.getElementById('myModal').style.opacity = 2; // eslint-disable-line
    document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
      this.text = "请选择相应报关单";
    }
    for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
      this.CommonUtilsService.deleteDetailByModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].id).then(obj => {
        this.$log.log(obj);
        this.text = "删除成功";
        this.search();
      }).catch(err => {
        alert(err); // eslint-disable-line no-alert
      });
    }
    document.getElementById('okbtn').style.display = "none"; // eslint-disable-line
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  findAll(modelkey) {
    if (modelkey === null) {
      return;
    }
    this.$log.log(modelkey);
    this.searchCondition.condition = {orparakey: modelkey, orparatype: modelkey, orparavalue: modelkey};
    this.searchCondition.pageIndex = 1;
    this.search();
  }

  addnew() {
    const tthis = this;
    const data = {
      createdAt: null,
      createdBy: null,
      description: null,
      owner: null,
      parakey: "",
      paratype: "",
      paravalue: "",
      updatedAt: ""};
    this.CommonUtilsService.createDetailByModelName('paracom', data).then(data => {
      this.$log.log(data);
      alert("新建成功");  // eslint-disable-line no-alert
      this.search();
    });
  }
}
export const paracomcomponent = {
  template: require('./paracomcomponent.html'),
  controller: paracomComponentController
};

