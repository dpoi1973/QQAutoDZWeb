import baseGridComponent from '../../basejs/baseGrid.js';
class RoleListComponentController extends baseGridComponent {
    // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, $uibModal, $scope) {
    super($log, 'Role', GridOptionService, CommonUtilsService, $scope);

    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$uibModal = $uibModal;
    this.$scope = $scope;

    this.selectRow = {};
    this.search();
  }

  add() {
    const pp = this;
    const log = this.$log;
    const temp = {
      id: 0,
      name: "",
      active: false
    };
    const modalInstance = pp.$uibModal.open({
      component: 'roledetaildlgComponent',
      resolve: {
        actionitem: temp
      }
    });
    modalInstance.result.then(result => {
      if (result) {
        alert("添加成功"); // eslint-disable-line no-alert
        pp.search();
      }
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }
  modify() {
        /* eslint angular/definedundefined: 2*/
     // valid
    if (angular.isUndefined(this.selectRow.id)) {
      alert("请选择对象"); // eslint-disable-line no-alert
      return;
    }
    const pp = this;
    const log = this.$log;
    const temp = {
      id: pp.selectRow.id,
      name: pp.selectRow.name,
      active: pp.selectRow.active
    };
    const modalInstance = pp.$uibModal.open({
      component: 'roledetaildlgComponent',
      resolve: {
        actionitem: temp
      }
    });

    modalInstance.result.then(result => {
      if (result) {
        for (let i = 0; i < pp.listData.length; i++) {
          if (pp.listData[i].id === pp.selectRow.id) {
            pp.listData[i] = result;
          }
        }
        alert("修改成功"); // eslint-disable-line no-alert
        this.search();
      }
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }
  del() {
    const pp = this;
    const log = pp.$log;
        /* eslint angular/definedundefined: 2*/
     // valid
    if (angular.isUndefined(pp.selectRow.id)) {
      alert("请选择对象"); // eslint-disable-line no-alert
      return;
    }
    this.CommonUtilsService.deleteDetailByModelName('Role', pp.selectRow.id)
      .then(dataresult => {
        for (let i = 0; i < pp.gridOptions.data.length; i++) {
          if (pp.gridOptions.data[i].id === pp.selectRow.id) {
            pp.gridOptions.data.splice(i, 1);
          }
        }
        alert("删除成功"); // eslint-disable-line no-alert
      })
      .catch(err => {
        log.log(err);
      });
  }
  yonghu() {
    const pp = this;
    const log = this.$log;
    const temp = {
      id: pp.selectRow.id,
      name: pp.selectRow.name,
      active: pp.selectRow.active
    };
        /* eslint angular/definedundefined: 2*/
     // valid
    if (angular.isUndefined(pp.selectRow.id)) {
      alert("请选择对象"); // eslint-disable-line no-alert
      return;
    }
    const modalInstance = this.$uibModal.open({
      component: 'userdetaildlgComponent',
      resolve: {
        actionitem: temp
      }
    });

    modalInstance.result.then(result => {
      if (result) {
        for (let i = 0; i < pp.listData.length; i++) {
          if (pp.listData[i].id === pp.selectRow.id) {
            pp.listData[i] = result;
          }
        }
        alert("修改成功"); // eslint-disable-line no-alert
        this.search();
      }
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }
  findAll(keyword) {
    if (keyword === null) {
      return;
    }
    this.searchCondition.condition = {Name: keyword};
    this.searchCondition.pageIndex = 1;
    this.search();
  }
}

export const rolelistcomponent = {
  template: require('./RoleListComponent.html'),
  controller: RoleListComponentController
};
