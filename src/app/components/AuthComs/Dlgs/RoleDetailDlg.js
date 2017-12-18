
import baseGridComponent from '../../../basejs/baseGrid.js';
class RoleDetailDlgController extends baseGridComponent {
    // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, AdminControllerServic, $uibModal, $scope, _) {
    super($log, 'ActionAuth', GridOptionService, CommonUtilsService, $scope);
    // super($log);
    this.$log = $log;
    this.AdminControllerServic = AdminControllerServic;
    this.CommonUtilsService = CommonUtilsService;
    this.searchCondition = {condition: {}, pageIndex: 1};
    //  this.text = 'My brand new component!';
    // this.UserAdminService = UserAdminService;
    //  请求获得的数据
    this.basicData = [];
    //  去除相同controllername
    this.hashDate = [];
    this._ = _;
    const _this = this;
    this.$onInit = function () {
      _this.actionitem = _this.resolve.actionitem;
      _this.initRole();
    };
  }

  initRole() {
    const _this = this;
    if (this.actionitem.id === 0) {
      this.CommonUtilsService.getSearchList('ActionAuth', this.searchCondition).then(results => {
        this.hashDate = results.datas;
      });
      return this.hashDate;
    }
    this.AdminControllerServic.getActionAuth(this.actionitem.id).then(results => {
      this.basicData = results.data;
      return this.CommonUtilsService.getSearchList('ActionAuth', this.searchCondition);
    }).then(result => {
      const basicData = this.basicData;
      this.hashDate = _this._.filter(result.datas, ele => {
        const roleexsist = _this._.filter(basicData, role => {
          this.$log.log(11111);
          return role.controlleraction.readableActionName == ele.readableActionName; //eslint-disable-line
        });
        return roleexsist.length === 0;
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }

  ok() {
    if (this.actionitem.id == 0) { //eslint-disable-line
      this.CommonUtilsService.createDetailByModelName('Role', this.actionitem)
      .then(dataresult => {
        this.$log.log("ok");
        this.close({
          $value: dataresult
        });
      })
      .catch(err => {
        this.$log.log(err);
      });
      return this.actionitem;
    }
    this.$log.log("确定后");
    this.$log.log(this.actionitem);
    this.CommonUtilsService.putDetailbyModelName('Role', this.actionitem.id, this.actionitem)
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
  addAction(readableActionName) {
    this.$log.log("添加按钮");
    this.$log.log(readableActionName);
    this.$log.log(this.actionitem);
    const permissions = {role: this.actionitem.name, actionname: readableActionName};
    this.AdminControllerServic.grantRoleActions(permissions).then(result => {
      this.initRole();
    })
    .catch(err => {
      this.$log.log(err);
    });
  }
  delAction(rol) {
    this.$log.log(11111111);
    this.$log.log(this.actionitem);
    this.$log.log(rol);
    const permissions = {role: this.actionitem.name, actionname: rol.controlleraction.readableActionName, relation: rol.relation};
    this.AdminControllerServic.revokeRleActions(permissions).then(result => {
      this.initRole();
    })
    .catch(err => {
      this.$log.log(err);
    });
  }

}

export const roledetaildlg = {
  template: require('./RoleDetailDlg.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: RoleDetailDlgController
};

