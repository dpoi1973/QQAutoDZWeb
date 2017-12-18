import baseGridComponent from '../../basejs/baseGrid.js';
class UserListComponentController extends baseGridComponent {
  // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, $uibModal, $scope) {
    super($log, 'user', GridOptionService, CommonUtilsService, $scope);

    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$uibModal = $uibModal;
    this.$scope = $scope;

    this.selectRow = {};
    this.search();
  }

  add() {
    const _this1 = this;
    const log = _this1.$log;
    const temp = {
      id: 0,
      username: '',
      email: '',
      active: false
    };
    const modalInstance = _this1.$uibModal.open({
      component: 'roletouserComponent',
      resolve: {
        actionitem: temp
      }
    });
    modalInstance.result.then(result => {
      if (result) {
        this.$log.log(11111);
        for (let i = 0; i < _this1.gridOptions.data.length; i++) {
          if (_this1.gridOptions.data[i].id === _this1.selectRow.id) {
            _this1.gridOptions.data[i] = result;
          }
        }
        alert("修改成功"); // eslint-disable-line no-alert
      }
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }

  modify() {
    const _this2 = this;
    const log = _this2.$log;
    const temp = {
      id: _this2.selectRow.id,
      username: _this2.selectRow.username,
      email: _this2.selectRow.email,
      active: _this2.selectRow.active
    };
    this.$log.log(angular.isUndefined(_this2.selectRow.id));
    if (angular.isUndefined(_this2.selectRow.id)) {
      alert("请选择对象");  // eslint-disable-line no-alert
      return;
    }
    const modalInstance = _this2.$uibModal.open({
      component: 'roletouserComponent',
      resolve: {
        actionitem: temp
      }
    });
    modalInstance.result.then(result => {
      if (result) {
        for (let i = 0; i < _this2.gridOptions.data.length; i++) {
          if (_this2.gridOptions.data[i].id === _this2.selectRow.id) {
            _this2.gridOptions.data[i] = result;
          }
        }
        alert("修改成功");  // eslint-disable-line no-alert
      }
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }

  del() {
    const pp = this;
    const log = pp.$log;
    if (angular.isUndefined(pp.selectRow.id)) {
      alert("请选择对象");  // eslint-disable-line no-alert
      return;
    }
    this.CommonUtilsService.deleteDetailByModelName('User', pp.selectRow.id)
      .then(dataresult => {
        for (let i = 0; i < pp.gridOptions.data.length; i++) {
          if (pp.gridOptions.data[i].id === pp.selectRow.id) {
            pp.gridOptions.data.splice(i, 1);
          }
        }
        alert("删除成功");  // eslint-disable-line no-alert
      })
      .catch(err => {
        log.log(err);
      });
  }

  findAll(keyword) {
    if (keyword === null) {
      return;
    }
    this.searchCondition.condition = {or: [
                          {username: {like: `%${keyword}%`}},
                          {email: {like: `%${keyword}%`}}
    ]
    };
    this.searchCondition.pageIndex = 1;
    this.search();
  }
}

export const userlistcomponent = {
  template: require('./UserListComponent.html'),
  controller: UserListComponentController
};

