import baseGridComponent from '../../basejs/baseGrid.js';
class UserAdminComponentController extends baseGridComponent {
    // @ngInject
  constructor(GridOptionService, UserAdminService, CommonUtilsService, $uibModal, $scope, $log) {
    super($log, 'openuser', GridOptionService, CommonUtilsService, $scope);

    this.UserAdminService = UserAdminService;
    this.$uibModal = $uibModal;
    this.$scope = $scope;
    this.selectRow = {};
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 5};
    this.search();
  }
  gridOnRegAPI(gridApi) {
    const scope = this.$scope;

    gridApi.selection.on.rowSelectionChanged(this.$scope, function (row) {
      const msg = `row selected ${row.isSelected}`;
      this.$log.log(row);
      if (row.isSelected) {
        ctrl.selectedids.push(row.entity.id); // eslint-disable-line
      } else {
        const index = ctrl.selectedids.indexOf(row.entity.id); // eslint-disable-line
        ctrl.selectedids.splice(index, 1); // eslint-disable-line
      }
    });
  }

  login1() {
    const modalInstance = this.$uibModal.open({
      component: 'userCustSelDlgComponent',
      resolve: {
        useritem: this.selectRow
      }
    });

    const log = this.$log;
    modalInstance.result.then(selectedItem => {
      log.log(selectedItem);
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }
}

// angular
//     .module('app')
//     .component('userAdminComponent', {
//       templateUrl: 'app/components/UserAdmin/UserAdminComponent.html',
//       controller: UserAdminComponentController
//     });

export const useradmincomponent = {
  template: require('./UserAdminComponent.html'),
  controller: UserAdminComponentController
};

