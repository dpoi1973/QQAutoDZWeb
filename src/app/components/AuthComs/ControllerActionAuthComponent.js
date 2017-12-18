
import baseGridComponent from '../../basejs/baseGrid.js';
class ControllerActionAuthComponentController extends baseGridComponent {
  // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, $uibModal, $scope) {
    super($log, 'ActionAuth', GridOptionService, CommonUtilsService, $scope);
    // this.searchCondition = { condition: { controllername: '', actionname: '' }, pageIndex: 1, pageSize: 20 };

    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$uibModal = $uibModal;

    this.$scope = $scope;

    this.selectRow = {};
    this.search();
  }

  update() {
    /* eslint angular/definedundefined: 2*/
     // valid
    if (angular.isUndefined(this.selectRow.id)) {
      alert("请选择对象"); // eslint-disable-line no-alert
      return;
    }
    const pp = this;
    const editvalue = {};
    angular.copy(pp.selectRow, editvalue);

    const modalInstance = this.$uibModal.open({
      component: 'controlleractiondetaildlgComponent',
      resolve: {
        actionitem: editvalue
      }
    });
    const log = this.$log;
    modalInstance.result.then(result => {
      if (result) {
        angular.copy(result, pp.selectRow);
      }
      alert("修改成功"); //eslint-disable-line
      this.search();
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }
  findAll(keyword) {
    if (keyword === null) {
      return;
    }
    this.searchCondition.condition = {
      or: [
                 {controllername: {like: `%${keyword}%`}},
                 {actionname: {like: `%${keyword}%`}}
      ]
    };
    this.searchCondition.pageIndex = 1;
    this.search();
  }
}

export const controlleractionauthcomponent = {
  template: require('./ControllerActionAuthComponent.html'),
  controller: ControllerActionAuthComponentController
};
