import baseGridComponent from '../../basejs/baseGrid.js';
class HsCodeHelpComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $uibModal) {
    super($log, 'ClassifyInfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {HSCode: '', GName: ''}, pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$log = $log;
    this.$uibModal = $uibModal;
    this.GridOptionService = GridOptionService;
    this.inputsearch = this.searchCondition.condition.HSCode + this.searchCondition.condition.GName;
    this.$log.log(this.inputsearch);
    this.search();
    this.$state = $state;
    this.initgridopion(this.GridOptionService);
    this.getselectbtn();
  }

  initgridCellTemplate(columelist) {
    this.$log.log('enter');
    columelist[0].cellTemplate = '<ui> <a ui-sref="hsCodeHelp.detail({id: row.entity.HSCode})">{{row.entity.HSCode}} </a></ui>';
    columelist[3].cellTemplate = '<ui><button type="button" id=id{{row.entity.HSCode}} class="changeid"  ng-click="grid.appScope.$ctrl.selectedfakeCspec()" style="float:right; display:none">修改</button>{{row.entity.Cspec}}</ui>';
    columelist[2].cellTemplate = '<ui><button type="button" id=idnamestruct{{row.entity.HSCode}} class="changeid"  ng-click="grid.appScope.$ctrl.selectednamestruct()" style="float:right; display:none">修改</button>{{row.entity.namestruct}}</ui>';
  }
  onRowclicked(hscode) {
    this.$log.log(hscode);
  }
  Daoru() {
    this.$state.go('hsCodeHelp.detail', {id: 0});
  }
  getselectbtn() {
    const pp = this;
    pp.gridOptions.onRegisterApi = function (gridApi) {
      pp.gridApi = gridApi;
      pp.$log.log(pp.gridApi.grid.isScrollingHorizontally);
      pp.pageinagtion();
      pp.sorting();
      pp.gridApi.selection.on.rowSelectionChangedBatch(pp.$scope, row => {
        if (pp.gridApi.selection.getSelectedRows().length < 1) {
          for (let j = 0; j < pp.gridOptions.data.length; j++) {
          document.getElementById(`id${pp.gridOptions.data[j].HSCode}`).style.display = "none"; //eslint-disable-line
           document.getElementById(`idnamestruct${pp.gridOptions.data[j].HSCode}`).style.display = "none"; //eslint-disable-line
          }
        } else {
          for (let j = 0; j < pp.gridOptions.data.length; j++) {
           document.getElementById(`id${pp.gridOptions.data[j].HSCode}`).style.display = "block"; //eslint-disable-line
           document.getElementById(`idnamestruct${pp.gridOptions.data[j].HSCode}`).style.display = "block"; //eslint-disable-line
          }
        }
      });
      pp.gridApi.selection.on.rowSelectionChanged(pp.$scope, row => {
        for (let j = 0; j < pp.gridOptions.data.length; j++) {
           document.getElementById(`id${pp.gridOptions.data[j].HSCode}`).style.display = "none"; //eslint-disable-line
           document.getElementById(`idnamestruct${pp.gridOptions.data[j].HSCode}`).style.display = "none"; //eslint-disable-line
        }
        if (pp.gridApi.selection.getSelectedRows().length > 0) {
          for (let i = 0; i < pp.gridApi.selection.getSelectedRows().length; i++) {
            document.getElementById(`id${pp.gridApi.selection.getSelectedRows()[i].HSCode}`).style.display = "block"; // eslint-disable-line
            document.getElementById(`id${pp.gridApi.selection.getSelectedRows()[i].HSCode}`).style.cssFloat = "right"; // eslint-disable-line
            document.getElementById(`idnamestruct${pp.gridApi.selection.getSelectedRows()[i].HSCode}`).style.display = "block"; // eslint-disable-line
            document.getElementById(`idnamestruct${pp.gridApi.selection.getSelectedRows()[i].HSCode}`).style.cssFloat = "right"; // eslint-disable-line
          }
        }
      });
    };
  }
  selectednamestruct() {
    this.checkequal = 1;
    for (let j = 0; j < this.gridApi.selection.getSelectedRows().length; j++) {
      const firstselect = this.gridApi.selection.getSelectedRows()[0].namestruct;
      if (this.gridApi.selection.getSelectedRows()[j].namestruct !== firstselect) { // eslint-disable-line
        this.$log.log("不全等");
        this.checkequal = 0;
      }
    }
      if (this.checkequal == 0) { // eslint-disable-line
        this.text = "所选namestruct不相等";
        this.$uibModal.open({
          component: 'templatetext',
          resolve: {
            items: () => {
              return this.text;
            }
          }
        });
      } else {
        const modalInstance = this.$uibModal.open({
          component: 'fakegoodsnamecomponent',
          resolve: {
            items: () => {
              return this.gridApi.selection.getSelectedRows()[0].TempJson;
            },
            gname: () => {
              return this.gridApi.selection.getSelectedRows()[0].GName;
            },
            Cspec: () => {
              return this.gridApi.selection.getSelectedRows()[0].namestruct;
            }
          },
          backdrop: false
        });
        modalInstance.result.then(finresult => {
          for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
            this.gridApi.selection.getSelectedRows()[i].namestruct = finresult.hode.trim();
            this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].HSCode, this.gridApi.selection.getSelectedRows()[i]).then(data => {
              this.$log.log(data);
            });
            document.getElementById(`id${this.gridApi.selection.getSelectedRows()[i].HSCode}`).style.display = "none"; //eslint-disable-line
            document.getElementById(`idnamestruct${this.gridApi.selection.getSelectedRows()[i].HSCode}`).style.display = "none"; //eslint-disable-line
          }
          this.text = "保存成功";
          this.$uibModal.open({
            component: 'templatetext',
            resolve: {
              items: () => {
                return this.text;
              }
            }
          });
          this.search();
        });
      }
  }
  selectedfakeCspec() {
    this.checkequal = 1;
    for (let j = 0; j < this.gridApi.selection.getSelectedRows().length; j++) {
      const firstselect = this.gridApi.selection.getSelectedRows()[0].Cspec;
      if (this.gridApi.selection.getSelectedRows()[j].Cspec !== firstselect) { // eslint-disable-line
        this.$log.log("不全等");
        this.checkequal = 0;
      }
    }
      if (this.checkequal == 0) { // eslint-disable-line
        this.text = "所选Cspec不相等";
        this.$uibModal.open({
          component: 'templatetext',
          resolve: {
            items: () => {
              return this.text;
            }
          }
        });
      } else {
        const modalInstance = this.$uibModal.open({
          component: 'hsCodeCspecmodelcomponent',
          resolve: {
            items: () => {
              return this.gridApi.selection.getSelectedRows()[0].TempJson;
            },
            gname: () => {
              return this.gridApi.selection.getSelectedRows()[0].GName;
            },
            Cspec: () => {
              return this.gridApi.selection.getSelectedRows()[0].Cspec;
            }
          },
          backdrop: false
        });
        modalInstance.result.then(finresult => {
          for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
            this.gridApi.selection.getSelectedRows()[i].Cspec = finresult.hode;
            // if (this.gridApi.selection.getSelectedRows()[i].Cspec.substr(0, 1) === "|") {
            //   this.gridApi.selection.getSelectedRows()[i].Cspec = this.gridApi.selection.getSelectedRows()[i].Cspec.substr(1, this.gridApi.selection.getSelectedRows()[i].Cspec.length);
            // }
            this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].HSCode, this.gridApi.selection.getSelectedRows()[i]).then(data => {
              this.$log.log(data);
            });
           document.getElementById(`id${this.gridApi.selection.getSelectedRows()[i].HSCode}`).style.display = "none"; //eslint-disable-line
           document.getElementById(`idnamestruct${this.gridApi.selection.getSelectedRows()[i].HSCode}`).style.display = "none"; //eslint-disable-line
          }
          this.text = "保存成功";
          this.$uibModal.open({
            component: 'templatetext',
            resolve: {
              items: () => {
                return this.text;
              }
            }
          });
          this.search();
        });
      }
  }
  initgridopion(GridOptionServices) {
    GridOptionServices.getModelOpitons('ClassifyInfo').then(data => {
      this.initgridCellTemplate(data.result);
      this.gridOptions.columnDefs = data.result;
    });
    const pp = this;
    this.gridOptions.onRegisterApi = function (gridApi) {
      pp.gridApi = gridApi;
      pp.pageinagtion();
      pp.gridApi.selection.on.rowSelectionChanged(pp.$scope, row => {
        // const msg = `row selected ${row.isSelected}`;
        if (row.isSelected) {
          pp.selectRow = row.entity;
        } else {
          pp.selectRow = {};
        }
        pp.$log.log(pp.selectRow);
      });
    };
  }
  findAll(keyword) {
    this.gridOptions.data.forEach(row => {
            if (document.getElementById(`id${row.HSCode}`) == null) { //eslint-disable-line
              return false;
            }
         document.getElementById(`id${row.HSCode}`).style.display = "none"; // eslint-disable-line
        document.getElementById(`idnamestruct${row.HSCode}`).style.display = "none"; //eslint-disable-line 
    });
    if (keyword === null) {
      return;
    }
    this.searchCondition.condition = {
      orHSCode: keyword, orGName: keyword
    };
    this.searchCondition.pageIndex = 1;
    this.search();
  }
}

export const hscodehelpcomponent = {
  template: require('./hsCodeHelpComponent.html'),
  controller: HsCodeHelpComponentController
};

