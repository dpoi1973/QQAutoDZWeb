  export default class baseGridComponent {
    constructor($log, modelname, GridOptionService, CommonUtilsService, $scope, $q, $http) {
      this.$log = $log;
      this.ModelName = modelname;
      this.GridOptionService = GridOptionService;
      this.CommonUtilsService = CommonUtilsService;
      this.$scope = $scope;
      this.$q = $q;
      this.$http = $http;
      this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20, sortby: ''};
      this.selectRow = {};
      this.msg = {};
      this.listData = [];
      this.init();
      this.initgridopion(GridOptionService);
      this.initGridAPI();
      // this.getOneData(this.searchcondition);
     // this.gridapidselect(this.$scope);
    }
    init() {
      this.gridOptions = {
        paginationPageSizes: [20, 40, 80],
        paginationPageSize: 20,
        useExternalPagination: true,
        useExternalSorting: true,
        enableGridMenu: true,
        multiSelect: true,
        columnDefs: []
      };
    }
    search() {
    // this.searchCondition.pageIndex = this.page;
      this.CommonUtilsService.getSearchList(this.ModelName, this.searchCondition)
      .then(results => {
        this.$log.log(results);
        this.gridOptions.totalItems = results.totalCount;
        this.listData = results.datas;
        this.gridOptions.data = this.listData;
      });
    }
    gridapidselect() {
      const pp = this;
      pp.gridApi.selection.on.rowSelectionChanged(pp.$scope, row => {
        const msg = `row selected ${row.isSelected}`;
        if (row.isSelected) {
          pp.selectRow = row.entity;
        } else {
          pp.selectRow = {};
        }
        this.$log.log(pp.gridApi.selection.getSelectedRows());
      });
    }
    pageinagtion() {
      this.$log.log(11111);
      const pthis = this;
      this.$log.log(this.searchCondition);
      this.gridApi.pagination.on.paginationChanged(pthis.$scope, (newPage, pageSize) => {
        pthis.searchCondition.pageIndex = newPage;
        pthis.searchCondition.pageSize = pageSize;
        pthis.$log.log(this.searchCondition);
        pthis.search();
      });
    }

    sorting() {
      const pthis = this;
      this.gridApi.core.on.sortChanged(pthis.$scope, (grid, sortColumns) => {
        if (sortColumns.length === 0) {
        // aginationOptions.sort = null;
        } else {
          let direction = "ASC";
          if (sortColumns[0].sort.direction !== "asc") {
            direction = "DESC";
          }
          pthis.searchCondition.sortby = `${sortColumns[0].field} ${direction}`;
          pthis.search();
        }
      });
    }
    gridapiupdate() {
      const pp = this;
      pp.gridApi.edit.on.afterCellEdit(pp.$scope, (rowEntity, colDef, newValue, oldValue) => {
        pp.CommonUtilsService.putDetailbyModelName(this.ModelName, rowEntity.id, rowEntity).then(data => {
          this.$log.log(data);
        }).catch(err => {
          alert("修改失败"); //eslint-disable-line 
          this.$log.log(err);
          this.search();
        });
        this.$log.log(pp.msg);
        pp.msg.lastCellEdited = `edited row id:${rowEntity.id} Column:${colDef.name} newValue:${newValue} oldValue:${oldValue}`;
        pp.$scope.$apply();
      });
    }
    initGridAPI() {
      const pp = this;
      pp.gridOptions.onRegisterApi = function (gridApi) {
        pp.gridApi = gridApi;
        pp.gridapidselect();
        pp.pageinagtion();
        pp.sorting();
      };
    }
    initGridAPIedit() {
      const pp = this;
      pp.gridOptions.onRegisterApi = function (gridApi) {
        pp.gridApi = gridApi;
        pp.gridapidselect();
        pp.pageinagtion();
        pp.sorting();
        pp.gridapiupdate();
      };
    }
    initgridCellTemplate(columelist) {// eslint-disable-line
      this.$log.log('super');
    // add celle or row temple here on derived class
      return '';
    }
    initgridopion(GridOptionService) {
      const tthis = this;
      GridOptionService.getModelOpitons(this.ModelName).then(data => {
        if (data.result) {
         // data.result[0].cellTemplate = tthis.initgridCellTemplate();
          tthis.initgridCellTemplate(data.result);
          tthis.gridOptions.columnDefs = data.result;
        }
      });
    // const scope = this.$scope;
    // const pp = this;
    }
    deleteone(callback) {
      this.CommonUtilsService.deleteDetailByModelName(this.ModelName, this.selectRow.id).then(obj => {
        callback(null, "ok");
      }).catch(err => {
        callback(err, "err");
      });
    }
    detailall(callback) {
      for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
        this.CommonUtilsService.deleteDetailByModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].id).then(obj => {
          callback(obj, "ok");
        }).catch(err => {
          callback(err, "err");
        });
      }
    }
          /*eslint-disable*/
  open(verb, url, data, target) {
    const form = document.createElement("form");
    form.action = url;
    form.method = verb;
    form.target = target || "_self";
    if (data) {
        const input = document.createElement("input");
        input.name = "liwei";
        input.value =  JSON.stringify(data);
        form.appendChild(input); 
    }
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
  }
delete() {
    if (this.gridApi.selection.getSelectedRows() == 0) { //eslint-disable-line
      this.text = "请选择相应报关单";
      this.$uibModal.open({
        component: 'templatetext',
        resolve: {
          items: () => {
            return this.text;
          }
        }
      });
    } else {
     // document.getElementById('okbtn').style.display = "inline-block"; //eslint-disable-line
      this.text = "确定删除？";
      const idokbtn = true;
       const modalInstance = this.$uibModal.open({
        component: 'templatetext',
        resolve: {
          items: () => {
            return this.text;
          },
          idokbtn: () => {
            return idokbtn;
          },
          Modelname: () => {
            return this.ModelName
          },
          SelectedRows: ()=> {
            return this.gridApi.selection.getSelectedRows();
          }
        }
      });
        modalInstance.result.then(finresult => {
            this.search();
        }, event => {
          log.info(`modal-component dismissed at: {{$new Date()}}`);
        });
    }
  }

  close(){
    this.textdenger = "";
    document.getElementById('modalcont').innerHTML = "";
    document.getElementById('myModal').style.display = 'none';
    this.text = "";
  }

}





