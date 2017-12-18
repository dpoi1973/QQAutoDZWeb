const APPAPI = '/api';
import baseGridComponent from '../../basejs/baseGrid.js';
class autojudgeinfoComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $interval, $uibModal) {
    super($log, 'autojudgeinfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$log = $log;
    this.$scope.onRowclicked = this.onRowclicked;
    this.$uibModal = $uibModal;
    this.text = "";
    this.$q = $q;
    this.$interval = $interval;
    this.$state = $state;
    this.$http = $http;
    this.search();
    this.testObj = {};
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
        alert(err); // eslint-disable-line
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
    this.searchCondition.condition = {orclassifyKey: modelkey, orclassifyStatus: modelkey, ormaterialDesc: modelkey, orclassifyproductid: modelkey};
    this.searchCondition.pageIndex = 1;
    this.search();
  }

  addnew() {
    // const tthis = this;
    // const data = {}; const data = {};
    // this.CommonUtilsService.createDetailByModelName('autojudgeinfo', data).then(data => {
    //   this.$log.log(data);
    //   alert("新建成功");  // eslint-disable-line no-alert
    //   this.search();
    // });
    const item = "请选择相应内容";
    const data = '2017-1-1';
    this.$http.get('http://192.168.0.32:8081/dayoff', data).then(resp => {
      this.$log.log(resp);
    });
  }

  showoriginJson() {
    if (this.gridApi.selection.getSelectedRows() == undefined || this.gridApi.selection.getSelectedRows().length == 0) { // eslint-disable-line
    //   document.getElementById('myModal').style.opacity = 2; // eslint-disable-line
    //   document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
      this.text = "请先选择相应的内容";
      this.$uibModal.open({
        component: 'templatetext',
        resolve: {
          items: () => {
            return this.text;
          }
        }
      });
      return;
    }
    if (this.gridApi.selection.getSelectedRows().length > 1) {
      this.text = "请选择一条进行操作";
      this.$uibModal.open({
        component: 'templatetext',
        resolve: {
          items: () => {
            return this.text;
          }
        }
      });
      return;
    }
    this.$log.log(11111);
    this.testObj = this.gridApi.selection.getSelectedRows()[0].originJson;
    this.$log.log(this.testObj);
    document.getElementById('myModaltwo').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModaltwo').style.display = 'block'; //eslint-disable-line
  }
  closetemp() {
    document.getElementById('myModaltwo').style.display = 'none'; //eslint-disable-line
  }

  savetest() {
    this.$log.log(this.testObj);
    this.gridApi.selection.getSelectedRows()[0].originJson = this.testObj;
    this.$log.log(this.gridApi.selection.getSelectedRows());
    this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[0].id, this.gridApi.selection.getSelectedRows()[0]).then(data => {
      alert("保存成功！");  // eslint-disable-line no-alert
      this.gridOptions.data = data.data;
    });
  }
}
export const autojudgeinfocomponent = {
  template: require('./autojudgeinfo.html'),
  controller: autojudgeinfoComponentController
};

