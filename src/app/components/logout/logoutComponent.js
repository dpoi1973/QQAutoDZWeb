class LogoutComponentController {
  // @ngInject
  constructor(CommonUtilsService, $log, $window) {
    this.$log = $log;
    this.text = '是否退出？';
    this.$window = $window;
    this.newModel = {userid: 'admin', psword: 'admin1234'};
    this.CommonUtilsService = CommonUtilsService;
  }
  exit() {
    this.$log.log('exit clicked');
    this.CommonUtilsService.dologout().then(dataresult => {
      this.close({$value: this.newModel});
      this.$window.location.reload();
    }, err => {
      this.$log.log(err);
    });
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }
}

export const logoutcomponent = {
  template: require('./logoutComponent.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: LogoutComponentController
};

