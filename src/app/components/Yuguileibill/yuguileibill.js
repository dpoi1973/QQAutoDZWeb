const APPAPI = '/api';
import baseGridComponent from '../../basejs/baseGrid.js';
class yuguileibillComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $interval, $uibModal) {
    super($log, 'Company', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20, sortby: 'updatedAt DESC'};
    this.$scope = $scope;
    this.$scope.onRowclicked = this.onRowclicked;
    this.text = "";
    this.$q = $q;
    this.$interval = $interval;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.$http = $http;
    this.initGridAPIedit();
    this.search();
    this.filtypelist = ["企业资质归档", "合同归档"];
    this.goodsnamelist = [];
    this.userName = "";
    this.goods_no = "";
    this.uploadusername();
    this.options = {
      customClass: this.getDayClass,
      minDate: new Date(),
      showWeeks: true
    };
    this.popup2 = {
      opened: false
    };
    // ----------
    this.endoptions = {
      customClass: this.getDayClass,
      minDate: new Date(),
      showWeeks: true
    };
    this.endpopup2 = {
      opened: false
    };
  }
  open() {
    this.popup2.opened = true;
  }
  endopen() {
    this.endpopup2.opened = true;
  }
  getDayClass(data) {
    const date = data.date;
    const mode = data.mode;
    if (mode === 'day') {
      const dayToCheck = new Date(date).setHours(0, 0, 0, 0);
    }
    return '';
  }
  translateDateToStr(dt) {
    if (!dt) {
      return '';
    }
    const time = new Date(dt);
    const year = time.getFullYear();
    const month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`;
    const day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
    const dateStr = `${year}-${month}-${day}`;
    return dateStr;
  }
  uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.$log.log(result);
      this.userName = result.data.empinfo.Empname;
    });
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a target="_blank" ui-sref="yuguileibill.detail({id: row.entity.id})">{{row.entity.trade_name}} </a></ui>';
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
        this.text = err;
        // alert(err); // eslint-disable-line no-alert
      });
    }
    document.getElementById('okbtn').style.display = "none"; // eslint-disable-line
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  findAll(modelkey) {
    if (modelkey === null) {
      return;
    }
    this.$log.log(modelkey);
    this.searchCondition.condition = {orsettlement_name: modelkey, ortrade_name: modelkey, orcontract_name: modelkey};
    this.searchCondition.pageIndex = 1;
    this.search();
  }
  findfile(findfile) {
    this.$log.log(findfile);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20, doctitle: findfile};
    this.search();
  }
  addnew() {
    // this.settlement_name = "";
    // this.business_name = "";
    // this.contract_name = "";
    // this.account = "";
    // this.password = "";
    // this.settlement_mode = "";
    // this.unsettlement_money = "";
    // this.unback_money = "";
    // document.getElementById('myModal').style.opacity = 3; // eslint-disable-line
    // document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
    // document.getElementById('addonelist').style.display = "block"; // eslint-disable-line
    // document.getElementById('uploadbodyul').style.display = "none"; // eslint-disable-line
    // document.getElementById('confirmuploadbtn').style.display = "none"; // eslint-disable-line
    // document.getElementById('modifyonelist').style.display = "none"; // eslint-disable-line
    // document.getElementById('addnewOkbtn').style.display = "inline-block"; //eslint-disable-line
    // const data = {};
    // this.CommonUtilsService.createDetailByModelName('Company', data).then(resp => {
    //   this.$log.log(resp);
    // });
    this.$state.go('yuguileibill.detail', {id: 0});
  }
  modify() {
    if (this.gridApi.selection.getSelectedRows().length !== 1) { // eslint-disable-line
      alert("请选择一条进行操作"); //eslint-disable-line
    } else {
    document.getElementById('myModal').style.opacity = 3; // eslint-disable-line
    document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
    document.getElementById('addonelist').style.display = "block"; // eslint-disable-line
    document.getElementById('uploadbodyul').style.display = "none"; // eslint-disable-line
    document.getElementById('confirmuploadbtn').style.display = "none"; // eslint-disable-line 
    document.getElementById('addnewOkbtn').style.display = "none"; //eslint-disable-line
    document.getElementById('modifyonelist').style.display = "inline-block"; // eslint-disable-line
    document.getElementById('spinner').style.display = "none"; //eslint-disable-line
      this.settlement_name = this.gridApi.selection.getSelectedRows()[0].settlement_name;
      this.business_name = this.gridApi.selection.getSelectedRows()[0].business_name;
      this.contract_name = this.gridApi.selection.getSelectedRows()[0].contract_name;
      this.account = this.gridApi.selection.getSelectedRows()[0].account;
      this.password = this.gridApi.selection.getSelectedRows()[0].password;
      this.settlement_mode = this.gridApi.selection.getSelectedRows()[0].settlement_mode;
      this.unsettlement_money = this.gridApi.selection.getSelectedRows()[0].unsettlement_money;
      this.unback_money = this.gridApi.selection.getSelectedRows()[0].unback_money;
    }
  }
  upload() {
    if (this.gridApi.selection.getSelectedRows().length !== 1) { // eslint-disable-line
      alert("请选择一条进行操作"); //eslint-disable-line
    } else {
      document.getElementById('myModal').style.opacity = 3; // eslint-disable-line
      document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
      document.getElementById('uploadbodyul').style.display = "block"; // eslint-disable-line
      document.getElementById('spinner').style.display = "none"; // eslint-disable-line
      document.getElementById('confirmuploadbtn').style.display = "inline-block"; //eslint-disable-line
      document.getElementById('addonelist').style.display = "none"; //eslint-disable-line
      document.getElementById('addnewOkbtn').style.display = "none"; //eslint-disable-line
      document.getElementById('modifyonelist').style.display = "none"; // eslint-disable-line
      // document.getElementById("goodsnumber").style.display = "none"; // eslint-disable-line
      document.getElementById("strrtli").style.display = "none"; //eslint-disable-line
      document.getElementById("endli").style.display = "none"; //eslint-disable-line
      this.goodsnamelist = [];
      this.text = "";
    }
  }
  classfiedtype() {
    if (this.uploadfiletype === "合同归档") {
      document.getElementById("strrtli").style.display = "block"; //eslint-disable-line
      document.getElementById("endli").style.display = "block"; //eslint-disable-line
    } else {
      document.getElementById("strrtli").style.display = "none"; //eslint-disable-line
      document.getElementById("endli").style.display = "none"; //eslint-disable-line
    }
  }
  confirmupload() {
    this.$log.log(this.uploadfiletype);
    this.$log.log(this.uploadtit);
    this.$log.log(this.userName);
    this.$log.log(this.uploadgoodsnumber);
    this.$log.log(this.gridApi.selection.getSelectedRows()[0].id);
    document.getElementById('uploadbodyul').style.display = "none"; // eslint-disable-line
    document.getElementById('spinner').style.display = "block"; // eslint-disable-line
    document.getElementById('confirmuploadbtn').style.display = "none"; //eslint-disable-line
    const fillvalue = document.getElementById('uploadfile').files[0]; //eslint-disable-line
    const strattime = document.getElementById('strattime').value; // eslint-disable-line
    const endtime = document.getElementById('endtime').value; // eslint-disable-line
    this.$log.log(fillvalue);
    const url = '/api/Docinfo/import';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Every thing ok, file uploaded
          /*eslint-disable */
        console.log('上传结果');
        console.log(JSON.parse(xhr.responseText)); // handle response.
        const testresponseText = JSON.parse(xhr.responseText);
        if (testresponseText.status.indexOf('OK') != -1) {
            alert(testresponseText.message);
          } else {
            this.text = xhr.responseText;
          }
      }
    };
    fd.append("doctitle", this.uploadtit);
    fd.append('filetype', this.uploadfiletype);
    fd.append('parentid', this.gridApi.selection.getSelectedRows()[0].id);
    fd.append("uploadperson", this.selectcompany);
    fd.append("goods_no", this.uploadgoodsnumber);
    fd.append("newFile", fillvalue);
    fd.append("stratdata", strattime);
    fd.append("enddata", endtime);
    xhr.send(fd);
  }
  addnewOkbtn() {
    this.$log.log(this.settlement_name);
    const data = {
      settlement_name: this.settlement_name,
      business_name: this.business_name,
      contract_name: this.contract_name,
      account: this.account,
      password: this.password,
      settlement_mode: this.settlement_mode,
      unsettlement_money: this.unsettlement_money,
      unback_money: this.unback_money
    };
    this.CommonUtilsService.createDetailByModelName('Company', data).then(data => {
      this.$log.log(data);
      if (data.statusText == "Created") { // eslint-disable-line
        document.getElementById('addonelist').style.display = "none"; // eslint-disable-line
        document.getElementById('addnewOkbtn').style.display = "none"; //eslint-disable-line
        this.text = "新建成功";
      } else {
        alert(data.statusText); // eslint-disable-line no-alert
      }
      this.search();
    });
  }
  modifyonelist() {
    const data = {
      settlement_name: this.settlement_name,
      business_name: this.business_name,
      contract_name: this.contract_name,
      account: this.account,
      password: this.password,
      settlement_mode: this.settlement_mode,
      unsettlement_money: this.unsettlement_money,
      unback_money: this.unback_money
    };
    this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[0].id, data).then(data => {
      this.$log.log(data);
      alert("修改成功"); //eslint-disable-line 
    }).catch(err => {
      alert("修改失败"); //eslint-disable-line
      this.$log.log(err);
    });
    this.search();
  }
}
export const yuguileibillcomponent = {
  template: require('./yuguileibill.html'),
  controller: yuguileibillComponentController
};

