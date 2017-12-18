import baseGridComponent from '../../../basejs/baseGrid.js';
class RoleToUserController extends baseGridComponent {
  // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, AdminControllerServic, $uibModal, $scope, _) {
    super($log, 'User', GridOptionService, CommonUtilsService, $scope);
    this.$log = $log;
    this.AdminControllerServic = AdminControllerServic;
    this.CommonUtilsService = CommonUtilsService;
    this.searchCondition = {condition: {}, pageIndex: 1};
    //  this.text = 'My brand new component!';
    // this.UserAdminServices = UserAdminServices;
    // this.actionitem = this.resolve.actionitem;
    //  请求获得的数据
    this.roleusersdata = [];
    //  去除相同controllername
    this.allusersdata = [];
    this._ = _;
    const _this = this;
    this.$onInit = function () {
      _this.actionitem = _this.resolve.actionitem;
      _this.initUsers();
    };
  }
  initUsers() {
    if (this.actionitem.id === 0) {
      this.CommonUtilsService.getSearchList('Role', this.searchCondition).then(result => {
        this.allusersdata = result.datas;
      });
      return this.allusersdata;
    }
    this.AdminControllerServic.getUserRoles(this.actionitem.id).then(result => {
      this.$log.log(111111);
      this.$log.log(result);
      this.roleusersdata = result.data;
      return this.CommonUtilsService.getSearchList('Role', this.searchCondition);
    })
    .then(result => {
      // 将roleuserdata中有的数据去掉
      const _this = this;
      const roleusersdata = this.roleusersdata;
      this.allusersdata = _this._.filter(result.datas, ele => {
        const roleexsist = _this._.filter(roleusersdata, role => {
          return role.name === ele.name;
        });
        return roleexsist.length === 0;
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }

  ok() {
    this.$log.log(this.actionitem);
    if (this.actionitem.id === 0) {
      this.CommonUtilsService.createDetailByModelName('User', this.actionitem)
      .then(dataresult => {
        this.close({
          $value: dataresult
        });
        this.search();
      })
      .catch(err => {
        this.$log.log(err);
      });
      return this.actionitem;
    }
    this.CommonUtilsService.putDetailbyModelName('User', this.actionitem.id, this.actionitem)
      .then(dataresult => {
        this.close({
          $value: dataresult
        });
        this.search();
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
  addRole(name) {
    const _this = this;
    this.AdminControllerServic.addRolesToUser(this.actionitem.username, [name]).then(result => {
      const user = _this._.findWhere(this.allusersdata, {name});
      this.roleusersdata.push(user);
      this.allusersdata = _this._.filter(this.allusersdata, ele => {
        return ele.name !== user.name;
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }
  removeRole(name) {
    const _this = this;
    this.AdminControllerServic.removeRolesFromUser(this.actionitem.username, [name]).then(result => {
      /* eslint object-shorthand: "error"*/
      /* eslint-env es6*/
      const user = _this._.findWhere(this.roleusersdata, {name});
      this.allusersdata.push(user);
      this.roleusersdata = _this._.filter(this.roleusersdata, ele => {
        return ele.name !== user.name;
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }

}

export const roletouser = {
  template: require('./RoleToUser.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: RoleToUserController
};

