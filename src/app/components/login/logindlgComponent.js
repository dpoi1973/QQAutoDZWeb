const APPAPI = '/api';
class LogindlgComponentController {
    // @ngInject
  constructor(CommonUtilsService, $log, $scope, $http, socketService, $window, $timeout) {
    this.$log = $log;
    this.$scope = $scope;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$window = $window;
    this.text = '请登录您的账号！';
    this.socketService = socketService;
    this.newModel = {userid: '', psword: ''};
    this.CommonUtilsService = CommonUtilsService;
    this.$scope.alerts = [];
    this.img = `${APPAPI}/Wechat/weiChartQR`;
    const _this = this;
    this.$onInit = function () {
      _this.$log.log(_this.resolve);
      _this.resolve.items[0] = this.newModel.userid;
    };
    this.socketService.on('renderhtml', data => {
      this.$log.log(data);
      $http.get(`${APPAPI}/wechat/weichatLogin`).then(resp => {
        this.$log.log(resp);
        this.close({$value: this.newModel});
        this.$window.location.reload();
      });
    });
  }
  ok() {
    this.$log.log("click");
    this.CommonUtilsService.dologin(this.newModel.userid, this.newModel.psword).then(dataresult => {
      this.$log.log(dataresult);
      this.$scope.alerts.splice(0, 1, {msg: '登录成功'});
      this.$timeout(() => {
        this.close({$value: this.newModel});
        this.$window.location.reload();
      }, 1000);
    }, err => {
      this.$scope.alerts.splice(0, 1, {msg: '用户名或者密码错误'});
      this.$log.log(err);
    });
  }
  cancel() {
    this.dismiss({$value: 'cancel'});
  }
  replay() {
    this.$scope.alerts.splice(0, 1);
  }
  loginweixin() {
    const _this = this;
    _this.$http({
      method: 'GET',
      url: `${APPAPI}/Wechat/getSessionid`
    }).then(data => {
      _this.$log.log(data.data.grid);
      _this.socketService.emit('session', data.data.qrid);
    });
  }
}

export const logindlgcomponent = {
  template: require('./logindlgComponent.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: LogindlgComponentController
};
