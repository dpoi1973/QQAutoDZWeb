class RegisterComponentController {
  constructor(CommonUtilsService, $log, $scope) {
    this.$scope = $scope;
    this.$log = $log;
    this.text = '注册一个新的用户';
    this.newModel = {userid: '', psword: '', password: ''};
    this.CommonUtilsService = CommonUtilsService;
    this.$scope.alerts = [];
  }

  register() {
    this.$log.log('register clicked');
    this.$log.log(this.newModel.userid, this.newModel.psword, this.newModel.password);
    const eml = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (eml.test(this.newModel.userid) !== true) {
      this.$scope.alerts.splice(0, 1, {msg: '用户名必须为有效邮箱！'});
    } else if (this.newModel.psword === null || this.newModel.psword === '') {
      this.$scope.alerts.splice(0, 1, {msg: '密码不能为空！'});
    } else if (this.newModel.psword.length < 8) {
      this.$scope.alerts.splice(0, 1, {msg: '密码长度必须超过8位！'});
    } else if // eslint-disable-line
     (this.newModel.psword !== this.newModel.password) {
      this.$scope.alerts.splice(0, 1, {msg: '两次输入密码不一致！'});
    } else {
      this.CommonUtilsService.doregister(this.newModel.userid, this.newModel.psword).then(dataresult => {
        this.$log.log(dataresult);
        this.close({$value: this.newModel});
      }, err => {
        if (err.error === '用户已存在') {
          this.$scope.alerts.splice(0, 1, {msg: '该用户已存在！'});
        }
        this.$log.log(err);
      });
    }
  }

  cancel() {
    this.$log.log('close');
    this.dismiss({$value: 'cancel'});
  }

  replay() {
    this.$scope.alerts.splice(0, 1);
  }
}

export const registercomponent = {
  template: require('./registerComponent.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: RegisterComponentController
};

