import baseGridComponent from '../../../basejs/baseGrid.js';
class EmployeeDetailController extends baseGridComponent {
  // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, AdminControllerServic, $uibModal, $scope, _) {
    super($log, 'Empinfo', GridOptionService, CommonUtilsService, $scope);
    this.$log = $log;
    this.AdminControllerServic = AdminControllerServic;
    // this.UserAdminServices = UserAdminServices;
    // this.actionitem = this.resolve.actionitem;
    this.$uibModal = $uibModal;
    //  请求获得的数据
    this.roleusersdata = [];
    //  去除相同controllername
    this._ = _;
    const _this = this;
    this.$onInit = function () {
      _this.actionitem = _this.resolve.actionitem;
      _this.initEmployee();
    };
  }
  initEmployee() {
    this.AdminControllerServic.getValidUser(this.actionitem.id).then(result => {
      this.$log.log(111111);
      this.$log.log(result);
      this.roleusersdata = result.data;
    });
  }

  ok() {
    if (this.actionitem.id === 0) {
      this.CommonUtilsService.createDetailByModelName('Empinfo', this.actionitem)
          .then(dataresult => {
            this.close({
              $value: dataresult
            });
          })
      .catch(err => {
        this.$log.log(err);
      });
      return this.actionitem;
    }
    this.CommonUtilsService.putDetailbyModelName('Empinfo', this.actionitem.id, this.actionitem)
      .then(dataresult => {
        this.close({
          $value: dataresult
        });
      })
      .catch(err => {
        this.$log.log(err);
      });
    return this.actionitem;
  }
  cancel() {
    this.$log.log('close');
    this.dismiss('');
  }
}

export const employeedetail = {
  template: require('./EmployeeDetail.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: EmployeeDetailController
};
