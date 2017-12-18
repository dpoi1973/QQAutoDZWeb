import baseGridComponent from '../../basejs/baseGrid.js';
const APPAPI = '/api';
class SpGuiLeiComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $window, $http, $uibModal) {
    super($log, 'CustClassifyProductInfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.$scope.onRowclicked = this.onRowclicked;
    this.$http = $http;
    this.APPAPI = APPAPI;
    this.search();
    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.CommonUtilsService = CommonUtilsService;
    this.searchcustid = [];
    this.checkequal = 1;
    this.getselectbtn();
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a target="_blank" ui-sref="spGuiLei.detail({id: row.entity.id})">{{row.entity.HScode}} </a></ui>';
    columelist[3].cellTemplate = '<ui><button type="button" id=id{{row.entity.id}} class="changeid"  ng-click="grid.appScope.$ctrl.selectedshowbtn()" style="float:right; display:none">修改</button>{{row.entity.fakeCspec}}</ui>';
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
  selectedshowbtn() {
    this.checkequal = 1;
    for (let j = 0; j < this.gridApi.selection.getSelectedRows().length; j++) {
      this.$log.log(this.gridApi.selection.getSelectedRows()[j].fakeCspec);
      const firstselect = this.gridApi.selection.getSelectedRows()[0].fakeCspec;
      if (this.gridApi.selection.getSelectedRows()[j].fakeCspec !== firstselect) { // eslint-disable-line
        this.$log.log("不全等");
        this.checkequal = 0;
      }
    }
    if (this.checkequal == 0) { // eslint-disable-line
      this.text = "所选fakeCspec不相等";
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
        component: 'equalcspecdlgcomponent',
        resolve: {
          items: () => {
            return this.gridApi.selection.getSelectedRows()[0].R2Distinct;
          },
          proinfoconfig: () => {
            return this.gridApi.selection.getSelectedRows()[0].custid.proinfoconfig;
          },
          Cspec: () => {
            return this.gridApi.selection.getSelectedRows()[0].fakeCspec;
          }
        },
        backdrop: false
      });
      modalInstance.result.then(finresult => {
        for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
          this.gridApi.selection.getSelectedRows()[i].fakeCspec = finresult.hode;
          this.gridApi.selection.getSelectedRows()[i].Cspec = this.gridApi.selection.getSelectedRows()[i].fakeCspec.replace(/\[.*?\]/g, word => {
            word = word.replace('[', '').replace(']', '');
            const wj = angular.fromJson(this.gridApi.selection.getSelectedRows()[i].custid.proinfoconfig)[word];
            return wj;
          });
          if (this.gridApi.selection.getSelectedRows()[i].Cspec.substr(0, 1) === "|") {
            this.gridApi.selection.getSelectedRows()[i].Cspec = this.gridApi.selection.getSelectedRows()[i].Cspec.substr(1, this.gridApi.selection.getSelectedRows()[i].Cspec.length);
          }
          this.$log.log("ceshi2");
          this.$log.log(this.gridApi.selection.getSelectedRows()[i].pracGoodsname);
          this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].id, this.gridApi.selection.getSelectedRows()[i]).then(data => {
            this.$log.log(data);
          });
        }
        this.search();
        this.text = "保存成功";
        this.$uibModal.open({
          component: 'templatetext',
          resolve: {
            items: () => {
              return this.text;
            }
          }
        });
        for (let j = 0; j < this.gridOptions.data.length; j++) {
          document.getElementById(`id${this.gridOptions.data[j].id}`).style.display = "none"; //eslint-disable-line
        }
        this.search();
      });
    }
  }
  Daoru() {
    const url = this.$state.href('spGuiLei.detail', {id: 0});
    this.$window.open(url, '_blank');
  }
  findAll(modelkey, $model) {
    // for (let j = 0; j < this.gridOptions.data.length; j++) {
    //       document.getElementById(`id${this.gridOptions.data[j].id}`).style.display = "none"; //eslint-disable-line
    // }
    this.gridOptions.data.forEach(row => {
      if (document.getElementById(`id${row.id}`) == null) { //eslint-disable-line
        return false;
      }
        document.getElementById(`id${row.id}`).style.display = "none"; // eslint-disable-line
    });
    if (angular.isUndefined(this.selectcompany)) {
      if (modelkey === null) {
        return;
      }
      this.searchCondition.condition = {orHSCode: modelkey, orCgoodsname: modelkey, orStatus: modelkey, orR2Distinct: modelkey, orCspec: modelkey};
      this.searchCondition.pageIndex = 1;
      this.search();
    } else {
      if (modelkey === null) {
        return;
      }
      this.searchCondition.condition = {orHSCode: modelkey, orCgoodsname: modelkey, orStatus: modelkey, orR2Distinct: modelkey, orCspec: modelkey, custid: this.selectcompany};
      this.searchCondition.pageIndex = 1;
      this.search();
      this.$log.log(this.searchCondition);
    }
  }

  searchasynccustname(query, $model) {
    this.searchCondition = {condition: {custname: query}, pageIndex: 1, pageSize: 20};
    if (!query) {
      this.searchCondition.condition = {custid: this.selectcompany};
    }
    this.CommonUtilsService.getSearchList('CustInfo', this.searchCondition)
      .then(results => {
        this.$log.log(results.datas);
        this.selsource1 = results.datas;
      });
  }
  beCustidSelected($item, $model) {
    const tthis = this;
    this.$log.log($model);
    tthis.searchCondition.condition = {custid: $model};
    tthis.search();
  }
  fillallprodetail() {
    this.CommonUtilsService.fillallprodetail()
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  checkCspec() {
    if (document.getElementById('searchproductid').checked) { //eslint-disable-line
      this.searchCondition.condition = {equalCspec: ""};
      this.$log.log(this.searchCondition.condition);
      this.search();
    } else {
      this.searchCondition.condition = {custid: this.selectcompany};
      this.search();
    }
  }
  copyHsbysel() {
    const ids = [];
    for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
      ids.push(this.gridApi.selection.getSelectedRows()[i].id);
    }
    /* eslint-disable */
    console.log(ids);
    this.$http.post(`${APPAPI}/CustClassifyProductInfo/copyHsbysel`, { ids: ids })
      .then(resp => {
        this.$log.log(resp);
        alert(resp.data);
      }, err => {
        this.text = resp.message;
        alert(err.data);
      });
  }
  fillHsinfos() {
    const ids = [];
    for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
      ids.push(this.gridApi.selection.getSelectedRows()[i].id);
    }
    /* eslint-disable */
    console.log(ids);
    this.$http.post(`${APPAPI}/CustClassifyProductInfo/fillHsinfos`, { ids: ids })
      .then(resp => {
        this.$log.log(resp);
        alert(resp.data);
      }, err => {
        this.text = resp.message;
        alert(err.data);
      });
  }
  fillallHsinfos() {
    if (angular.isUndefined(this.selectcompany)) {
      alert("请先选择客户");
      return;
    }
    // this.CommonUtilsService.fillallcspec(this.selectcompany)
    //   .then(results => {
    //     alert("完成");// eslint-disable-line
    //   });
    this.$http.post(`${APPAPI}/CustClassifyProductInfo/fillallHsinfos`)
      .then(resp => {
        this.$log.log(resp);
        alert(resp.data);
      }, err => {
        this.text = resp.message;
        alert(err.data);
      });
  }
  fillpracname() {
    if (angular.isUndefined(this.selectcompany)) {
      alert("请先选择客户");
      return;
    }
    this.CommonUtilsService.fillpracname(this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }

  fillfakegoodsname() {
    if (angular.isUndefined(this.selectcompany)) {
      alert("请先选择客户");
      return;
    }
    this.CommonUtilsService.fillfake(this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  fillallcspec() {
    if (angular.isUndefined(this.selectcompany)) {
      alert("请先选择客户");
      return;
    }
    this.CommonUtilsService.fillallcspec(this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line
      });
  }
  openupload() {
    const el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
  upload() {
    const _this = this;
    const ftype = document.getElementById("ftype").value;
    const myfile = document.getElementById('myfile');
    // && myfile1.files.length > 0 && myfile2.files.length > 0
    if (myfile.files.length > 0) {
      const file = myfile.files[0];
      // file.filename = file.name + '_' + custywno;
      const url = '/api/CustClassifyProductInfo/import';
      const xhr = new XMLHttpRequest();
      const fd = new FormData();
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Every thing ok, file uploaded
          console.log('上传结果');
          const testresponseText = JSON.parse(xhr.responseText);
          if (xhr.responseText == '"ok"') {
            alert('上传成功');
            document.getElementById("ftype").value = '';
            document.getElementById('myfile').value = '';
            const el = document.getElementById("overlay");
            el.style.visibility = "hidden";
            _this.search();
          } else {
            alert(xhr.responseText);
            this.text = xhr.responseText;
            // alert(xhr.responseText);
          }
        }
      };
      fd.append("ftype", ftype);
      fd.append("newFile", file);
      xhr.send(fd);
    } else {
      this.text = "请选择一个文件";
      alert('请选择一个文件')
    }
  }
  cancle() {
    document.getElementById("ftype").value = '';
    document.getElementById('myfile').value = '';
    const el = document.getElementById("overlay");
    el.style.visibility = "hidden";
  }
  dragbackpro() {
    this.$log.log(this.gridApi.selection.getSelectedRows());
    this.$log.log("chenggong");
    this.CommonUtilsService.postxinxicesi(this.ModelName, this.gridApi.selection.getSelectedRows()).then(data=>{
      alert("完成");
      this.$log.log("chenggong");
      this.$log.log(data);
    })
  }
}

export const spguileicomponent = {
  template: require('./spGuiLeiComponent.html'),
  controller: SpGuiLeiComponentController
};
