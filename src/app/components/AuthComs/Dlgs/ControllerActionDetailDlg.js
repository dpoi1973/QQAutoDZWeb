class ControllerActionDetailDlgController {
  constructor($log, CommonUtilsService, $uibModal) {
    // @ngInject
    // super($log);
    this.$log = $log;
    this.text = '权限修改';
    this.CommonUtilsService = CommonUtilsService;
    const _this = this;
    this.$onInit = function () {
      _this.actionitem = _this.resolve.actionitem;
    };
  }
  ok() {
    this.CommonUtilsService.putDetailbyModelName('ActionAuth', this.actionitem.id, this.actionitem)
    .then(dataresult => {
      this.$log.log(dataresult);
      this.close({
        $value: dataresult
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }
  cancel() {
    this.$log.log(this.resolve.actionitem);
    this.$log.log('close');
    this.dismiss('');
  }
}

export const controlleractiondetaildlg = {
  template: require('./ControllerActionDetailDlg.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: ControllerActionDetailDlgController
};

