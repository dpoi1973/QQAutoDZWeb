import baseGridComponent from '../../basejs/baseGrid.js';
class modifycunitcomponentController extends baseGridComponent {
  // @ngInject
  constructor(CommonUtilsService, GridOptionService, $log, $window, $scope, $timeout) {
    super($log, '', GridOptionService, CommonUtilsService, $scope);
    this.$timeout = $timeout;
    this.$log = $log;
    this.$scope = $scope;
    this.$window = $window;
    this.text = "";
    this.hiddenbtn = false;
    this.CommonUtilsService = CommonUtilsService;
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20, sortby: ''};
    const _this = this;
    this.$onInit = function () {
      _this.changeitems = _this.resolve.items;
      this.text = _this.resolve.items;
      this.$log.log(_this.resolve.idokbtn);
      this.hiddenbtn = _this.resolve.idokbtn;
      this.Modelname = _this.resolve.Modelname;
      this.SelectedRows = _this.resolve.SelectedRows;
    };
  }

  okbutton() {
    this.$log.log("确定删除");
    this.$log.log(this.SelectedRows);
    this.$log.log(this.Modelname);
    for (let i = 0; i < this.SelectedRows.length; i++) {
      this.$log.log(this.SelectedRows[i].id);
      this.CommonUtilsService.deleteDetailByModelName(this.Modelname, this.SelectedRows[i].id).then(obj => {
        this.text = "删除成功";
        this.hiddenbtn = false;
      }).catch(err => {
        this.$log.log(err);
        alert(err); // eslint-disable-line no-alert
      });
    }
  }

}
export const modifycunitcomponen = {
  template: require('./modifycunitcomponent.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: modifycunitcomponentController
};
