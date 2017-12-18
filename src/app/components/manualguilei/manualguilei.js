const APPAPI = '/api';
import baseGridComponent from '../../basejs/baseGrid.js';
class manualguileiController extends baseGridComponent {
   // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $window, $uibModal) {
    super($log, 'manualcustproductdetail', GridOptionService, CommonUtilsService);
    this.searchCondition = {condition: {}, filename: '', pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.$scope.onRowclicked = this.onRowclicked;
    this.search();
    this.$state = $state;
    this.uploadusername();
  }
  uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.userName = result.data.empinfo.Empname;
    });
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a target="_blank" ui-sref="manualguilei.detail({id: row.entity.id})">{{row.entity.SKU}} </a></ui>';
  }
  onRowclicked(hscode) {
    this.$log.log(hscode);
  }
  Daoru() {
    const url = this.$state.href('manualguilei.detail', {id: 0});
    this.$window.open(url, '_blank');
  }
  findAll(modelkey, $model) {
    if (modelkey === null) {
      return;
    }
    if (this.selectcompany) {
      this.$log.log(this.selectcompany);
    }
    // if(document.getElementById('searchproductid').checked){ //eslint-disable-line
    //   this.searchCondition.condition = {custid: this.selectcompany, orSKU: modelkey, orHScode: modelkey, orStatus: modelkey, orCgoodsname: modelkey, orCspec: modelkey, orstatus: modelkey, ClassifiedProductid: 0};
    //   this.searchCondition.pageIndex = 1;
    //   this.search();
    // } else {
    this.searchCondition.condition = {custid: this.selectcompany, orSKU: modelkey, orHScode: modelkey, orStatus: modelkey, orCgoodsname: modelkey, orCspec: modelkey, orstatus: modelkey};
    this.searchCondition.pageIndex = 1;
    this.search();
    // }
  }
  checkproductid() {
    this.$log.log(document.getElementById('searchproductid').checked); //eslint-disable-line
    if(document.getElementById('searchproductid').checked){ //eslint-disable-line
      this.searchCondition.condition = {ClassifiedProductid: 0, custid: this.selectcompany};
      this.search();
    } else {
      this.searchCondition.condition = {custid: this.selectcompany};
      this.search();
    }
  }
  searchasynccustname(query, $model) {
    this.searchCondition = {condition: {custname: query}, pageIndex: 1, pageSize: 20};
    if (!query) {
      this.searchCondition.condition = {custid: this.selectcompany};
    }
    this.CommonUtilsService.getSearchList('CustInfo', this.searchCondition)
      .then(results => {
        this.selsource1 = results.datas;
      });
  }
  beCustidSelected($item, $model) {
    const tthis = this;
    this.$log.log($model);
    tthis.searchCondition.condition = {custid: $model};
    tthis.search();
  }
  // syntemj() {
  //   this.CommonUtilsService.syntemj(this.ModelName, this.selectcompany)
  //     .then(results => {
  //       alert("完成");// eslint-disable-line no-alert
  //     });
  // }
  // syntemjlocal() {
  //   this.CommonUtilsService.syntemjlocal(this.ModelName, this.selectcompany)
  //     .then(results => {
  //       alert("完成");// eslint-disable-line no-alert
  //     });
  // }
  // refreshmd5andlink() {
  //   this.CommonUtilsService.refreshmd5andlink(this.ModelName, this.selectcompany)
  //     .then(results => {
  //       alert("完成");// eslint-disable-line no-alert
  //     });
  // }
  // downloadnewsku() {
  //   this.$log.log(this.selectcompany);
  //   if (this.selectcompany == undefined) {// eslint-disable-line
  //     alert("请先选择客户"); // eslint-disable-line no-alert
  //   }
  // }
  // modifyCunit() {
  //   if (this.gridApi.selection.getSelectedRows().length > 0) {
  //   document.getElementById('myModal').style.opacity = 2; // eslint-disable-line
  //   document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
  //   document.getElementById('modalbodyinput').style.display = 'block'; // eslint-disable-line
  //   document.getElementById('okbtn').style.display = 'inline-block'; //eslint-disable-line
  //     this.text = "请输入想要修改的单位";
  //   } else {
  //     document.getElementById('myModal').style.opacity = 2;
  //     document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
  //     document.getElementById('modalbodyinput').style.display = 'none'; // eslint-disable-line
  //     this.text = "请选择相应条目";
  //   }
  // }
  // okbtn() {
  //   this.$log.log(this.revisedCunit);
  //   this.gridApi.selection.getSelectedRows().forEach(resp => {
  //     this.$log.log(resp.Cunit);
  //     resp.Cunit = this.revisedCunit;
  //     this.CommonUtilsService.putDetailbyModelName(this.ModelName, resp.id, resp).then(data => {
  //       this.$log.log(data);
  //     });
  //   });
  // }

  // close() {
  //   document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
  //   this.text = "";
  // }

  openupload() {
    const el = document.getElementById("overlay");  //eslint-disable-line
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";  //eslint-disable-line
  }
  cancle() {
    document.getElementById('myFile').value = ''; //eslint-disable-line
    const el = document.getElementById("overlay"); //eslint-disable-line
    el.style.visibility = "hidden";
  }
    /*eslint-disable*/
  savetest() {
    console.log("test");
    console.log(this.companyid);
    if (this.selectcompany == undefined) {
      alert("请选择客户");
    }
    const myfile = document.getElementById('myFile');
    // && myfile1.files.length > 0 && myfile2.files.length > 0
    const file = myfile.files[0];
    const url = `${APPAPI}/manualcustproductdetail/import`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Every thing ok, file uploaded
        console.log('上传结果');
        console.log(JSON.parse(xhr.responseText)); // handle response.
        const testresponseText = JSON.parse(xhr.responseText);
        if (testresponseText.status.indexOf('OK') != -1) {
              alert('上传成功');
              const el = document.getElementById("overlay");
              el.style.visibility = "hidden";
            } else {
              alert(testresponseText.message);
            }
      }
    };
    fd.append("Custname", this.companyid.custname);
    fd.append('Custid', this.companyid.id);
    fd.append("newFile", file);
    xhr.send(fd);
  }
}

export const manualguileicomponent = {
  template: require('./manualguilei.html'),
  controller: manualguileiController
};

