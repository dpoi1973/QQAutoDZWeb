import baseGridComponent from '../../basejs/baseGrid.js';
class EmployeeListComponentController extends baseGridComponent {
   // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, $uibModal, $scope) {
    super($log, 'Empinfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$uibModal = $uibModal;
    this.$scope = $scope;
    this.$log = $log;
    this.selectRow = {};
    this.search();
  }

  add() {
    const _this0 = this;
    const temp = {
      id: 0,
      empname: "",
      empNo: "",
      active: false
    };
    const modalInstance = this.$uibModal.open({
      component: 'employeedetailComponent',
      resolve: {
        actionitem: temp
      }
    });
    modalInstance.result.then(result => {
      if (result) {
        _this0.gridOptions.data.push(result);
        alert("添加成功"); // eslint-disable-line no-alert
        _this0.search();
      }
    }, () => {
      _this0.$log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }

  modify() {
    const _this1 = this;
    const temp = {
      id: this.selectRow.id,
      empname: this.selectRow.empname,
      empNO: this.selectRow.empNO,
      active: this.selectRow.active,
      userinfo: this.selectRow.userinfo
    };
       /* eslint angular/definedundefined: 2*/
     // valid
    if (angular.isUndefined(this.selectRow.id)) {
      alert("请选择对象"); // eslint-disable-line no-alert
      return;
    }
    const modalInstance = this.$uibModal.open({
      component: 'roledetaildlgComponent',
      resolve: {
        actionitem: temp
      }
    });
    modalInstance.result.then(result => {
      if (result) {
        for (let i = 0; i < _this1.gridOptions.data.length; i++) {
          if (_this1.gridOptions.data[i].id == _this1.selectRow.id) { //eslint-disable-line
            _this1.gridOptions.data[i] = result;
          }
        }
        alert("修改成功"); // eslint-disable-line no-alert
        _this1.search();
      }
    }, () => {
      _this1.$log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }

  del() {
    if (angular.isUndefined(this.selectRow.id)) {
      alert("请选择对象"); // eslint-disable-line no-alert
      return;
    }
    this.CommonUtilsService.deleteDetailByModelName('Empinfo', this.selectRow.id)
      .then(dataresult => {
        for (let i = 0; i < this.gridOptions.data.length; i++) {
          if (this.gridOptions.data[i].id === this.selectRow.id) {
            this.gridOptions.data.splice(i, 1);
          }
        }
        alert("删除成功"); // eslint-disable-line no-alert
        this.search();
      })
      .catch(err => {
        this.$log.log(err);
      });
  }

  findAll(keyword) {
    if (keyword === null) {
      return;
    }

    // const conditionstr=`%${keyword}%`;
    this.searchCondition.condition = {
      or: [
                          {empname: {like: `%${keyword}%`}},
                          {empNO: {like: `%${keyword}%`}}
      ]
    };
    this.searchCondition.pageIndex = 1;
    this.search();
  }
}

export const employeelistcomponent = {
  template: require('./EmployeeListComponent.html'),
  controller: EmployeeListComponentController
};
