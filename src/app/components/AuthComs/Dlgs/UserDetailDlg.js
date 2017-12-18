import baseGridComponent from '../../../basejs/baseGrid.js';
class UserDetailDlgController extends baseGridComponent {
    // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, AdminControllerServic, $uibModal, $scope, _) {
    super($log, 'ActionAuth', GridOptionService, CommonUtilsService, $scope);
   // super($log, 'ControllerActionAuth', GridOptionServices, CommonUtilsServices, $scope);
    // super($log);
    this.$log = $log;
    this.AdminControllerServic = AdminControllerServic;
    this.searchCondition = {condition: {}, pageIndex: 1};
    //  this.text = 'My brand new component!';
    // this.UserAdminServices = UserAdminService;
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
    this.$log.log(this.actionitem);
    if (this.actionitem.id === 0) {
      this.CommonUtilsServic.getSearchList('User', this.searchCondition).then(results => {
        this.allusersdata = results.datas;
      });
      return this.allusersdata;
    }
    this.AdminControllerServic.getRoleUsers(this.actionitem.id).then(result => {
      this.roleusersdata = result.data;
      return this.CommonUtilsService.getSearchList('User', this.searchCondition);
    })
    .then(result => {
      // 将roleuserdata中有的数据去掉
      const _this = this;
      const roleusersdata = this.roleusersdata;
      this.allusersdata = _this._.filter(result.datas, ele => {
        const roleexsist = _this._.filter(roleusersdata, role => {
          return role.username === ele.username;
        });
        return roleexsist.length === 0;
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }

  ok() {
    if (this.actionitem.id === 0) {
      this.CommonUtilsService.createDetailByModelName('Role', this.actionitem)
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
    this.CommonUtilsService.putDetailbyModelName('Role', this.actionitem.id, this.actionitem)
      .then(dataresult => {
        this.close({
          $value: 'dataresult'
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
  addUser(username) {
    this.AdminControllerServic.addUsersToRole([username], this.actionitem.name).then(result => {
      const user = this._.findWhere(this.allusersdata, {username: username}); //eslint-disable-line
      this.roleusersdata.push(user);
      this.allusersdata = this._.filter(this.allusersdata, ele => {
        return ele.username !== user.username;
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }
  removeUser(username) {
    this.$log.log("remove");
    this.$log.log(username);
    this.AdminControllerServic.removeUserFromRole([username], this.actionitem.name).then(result => {
      const user = this._.findWhere(this.roleusersdata, {username: username}); //eslint-disable-line
      this.allusersdata.push(user);
      this.roleusersdata = this._.filter(this.roleusersdata, ele => {
        return ele.username !== user.username;
      });
    })
    .catch(err => {
      this.$log.log(err);
    });
  }
}

// angular
//   .module('app')
//   .component('userDetailDlg', {
//     templateUrl: 'app/components/AuthComs/Dlgs/UserDetailDlg.html',
//     bindings: {
//       resolve: '<',
//       close: '&',
//       dismiss: '&'
//     },
//     controller: UserDetailDlgController
//   });

export const userdetaildlg = {
  template: require('./UserDetailDlg.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: UserDetailDlgController
};

