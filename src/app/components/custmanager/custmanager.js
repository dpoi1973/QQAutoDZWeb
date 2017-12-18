import baseGridComponent from '../../basejs/baseGrid.js';
const APPAPI = '/api';
const APPURL = '/api/printer';
class custmanagerController extends baseGridComponent {
  // @ngInject
  constructor($log, GridOptionService, CommonUtilsService, $state, $scope, $window, $http, $uibModal) {
    super($log, 'custinfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, sortby: '', pageSize: 20};
    this.CommonUtilsService = CommonUtilsService;
    this.$log = $log;
    this.$uibModal = $uibModal;
    this.initGridAPIedit();
    this.search();
    this.getselectbtn();
  }
  initgridCellTemplate(columelist) {
    columelist[6].enableCellEdit = false;
    columelist[6].cellTemplate = '<ui><button type="button" id=id{{row.entity.id}} class="changeid"  ng-click="grid.appScope.$ctrl.editproinfoconfig()" style="float:right; display:none">修改</button>{{row.entity.proinfoconfig}}</ui>';
  }
  editproinfoconfig() {
    if (this.gridApi.selection.getSelectedRows().length == 1) { //eslint-disable-line
      const modalInstance = this.$uibModal.open({
        component: 'custinfomodelcomponent',
        resolve: {
          items: () => {
            return this.gridApi.selection.getSelectedRows()[0].proinfoconfig;
          }
        },
        backdrop: false
      });
      modalInstance.result.then(finresult => {
        this.$log.log("ceshi");
        this.$log.log(finresult.hode);
        this.gridApi.selection.getSelectedRows()[0].proinfoconfig = finresult.hode;
        this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[0].id, this.gridApi.selection.getSelectedRows()[0]).then(data => {
        alert("修改成功"); //eslint-disable-line
          this.$log.log(data);
        });
      });
    } else {
      alert("请选择一条进行操作"); //eslint-disable-line
    }
  }
  okbtn() {
    const _this = this;
    if (this.gridApi.selection.getSelectedRows().length === 0) {
    document.getElementById('myModal').style.opacity = 2; // eslint-disable-line
    document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
      this.text = "请选择相应报关单";
    }
    for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
      this.CommonUtilsService.deleteDetailByModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].id).then(obj => {
        this.$log.log(obj);
        this.text = "删除成功";
        this.search();
      }).catch(err => {
        alert(err); // eslint-disable-line no-alert
      });
    }
    document.getElementById('okbtn').style.display = "none"; // eslint-disable-line
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }

  addnew() {
    const tthis = this;
    const data = {};
    this.CommonUtilsService.createDetailByModelName('custinfo', data).then(data => {
      this.$log.log(data);
      alert("新建成功");  // eslint-disable-line no-alert
      this.search();
    });
  }
  findAll(modelkey) {
    this.gridOptions.data.forEach(row => {
        document.getElementById(`id${row.id}`).style.display = "none"; // eslint-disable-line
    });
    if (modelkey === null) {
      return;
    }
    this.$log.log(modelkey);
    this.searchCondition.condition = {orcustno: modelkey, orcustname: modelkey, orcustomno: modelkey};
    this.searchCondition.pageIndex = 1;
    this.search();
  }

  getselectbtn() {
    const pp = this;
    pp.gridOptions.onRegisterApi = function (gridApi) {
      pp.gridApi = gridApi;
      pp.pageinagtion();
      pp.sorting();
      pp.gridApi.selection.on.rowSelectionChangedBatch(pp.$scope, row => {
        pp.$log.log(pp.gridApi.selection.getSelectedRows());
        if (pp.gridApi.selection.getSelectedRows().length < 1) {
          for (let j = 0; j < pp.gridOptions.data.length; j++) {
          document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "none"; //eslint-disable-line
          }
        } else {
          for (let j = 0; j < pp.gridOptions.data.length; j++) {
          document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "block"; //eslint-disable-line
          }
        }
      });
      pp.gridApi.selection.on.rowSelectionChanged(pp.$scope, row => {
        for (let j = 0; j < pp.gridOptions.data.length; j++) {
          document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "none"; //eslint-disable-line
        }
        if (pp.gridApi.selection.getSelectedRows().length > 0) {
          for (let i = 0; i < pp.gridApi.selection.getSelectedRows().length; i++) {
            document.getElementById(`id${pp.gridApi.selection.getSelectedRows()[i].id}`).style.display = "block"; // eslint-disable-line
            document.getElementById(`id${pp.gridApi.selection.getSelectedRows()[i].id}`).style.cssFloat = "right"; // eslint-disable-line
          }
        }
      });
      if (pp.gridApi.selection.getSelectAllState() === true) {
        for (let j = 0; j < pp.gridOptions.data.length; j++) {
          document.getElementById(`id${pp.gridOptions.data[j].id}`).style.display = "block"; //eslint-disable-line
        }
      }
    };
  }
}

export const custmanagercomponent = {
  template: require('./custmanager.html'),
  controller: custmanagerController
};
