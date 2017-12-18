const APPAPI = '/api';
import baseDetailComponent from '../../basejs/basetwo.js';
class yuguileibilldetailController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $uibModal, GridOptionService, $state, $window, $scope, $http) {
    super($log, CommonUtilsService, 'Company', $stateParams.id);
    this.$state = $state;
    this.$window = $window;
    this.$scope = $scope;
    this.$http = $http;
    this.getdetailinfo();
    this.$uibModal = $uibModal;
    this.GridOptionService = GridOptionService;
    this.text = "";
    this.filtypelist = ["企业资质归档", "合同归档"];
    this.goodsnamelist = [];
    this.userName = "";
    this.goods_no = "";
    this.uploadusername();
    this.settlementModellist = ["财务做账", "月结开票", "年结开票", "次结开票", "现金交款"];
    this.hand_modellist = ["到付快递", "记账快递", "交接", "第三方交接"];
    this.findywinf();
    this.initGridAPI();
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
  findywinf() {
    this.gridOptions = {
      paginationPageSizes: [15, 20, 25],
      paginationPageSize: 15,
      useExternalPagination: true,
      useExternalSorting: true,
      enableGridMenu: true,
      multiSelect: false,
      columnDefs: [],
      data: []
    };
  }
  afterDetailinit() {
    this.$log.log("test");
    const tthis = this;
    this.showcharge = {};
    tthis.$log.log(this.detailInfoData);
    const showcharge = this.detailInfoData.charge;
    if (showcharge.length > 0) {
      showcharge.forEach(cd => {
        this.showcharge[cd.charge_type] = cd.chargenum;
      });
    }
    if (!this.showcharge.ywfee) {
      this.showcharge.ywfee = 0;
    }
    if (!this.showcharge.secfee) {
      this.showcharge.secfee = 0;
    }
    if (!this.showcharge.delayfee) {
      this.showcharge.delayfee = 0;
    }
    if (!this.showcharge.consfee) {
      this.showcharge.consfee = 0;
    }
    this.GridOptionService.getModelOpitons('Docinfo').then(options => {
      tthis.gridOptions.columnDefs = options.result;
    //   tthis.gridOptions.data = tthis.detailInfoData.formhead;
    });
    this.CommonUtilsService.getSearchList("Docinfo", {condition: {doctype: "企业归档", parentid: this.detailInfoData.id}, pageIndex: 1, pageSize: 20}).then(data => {
      this.$log.log(data);
      tthis.gridOptions.data = data.datas;
    });
  }
  uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.$log.log(result);
      this.userName = result.data.empinfo.Empname;
    });
  }
  upload() {
      document.getElementById('myModal').style.opacity = 3; // eslint-disable-line
      document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
      document.getElementById('uploadbodyul').style.display = "block"; // eslint-disable-line
      document.getElementById('confirmuploadbtn').style.display = "inline-block"; // eslint-disable-line
      document.getElementById('spinner').style.display = "none"; // eslint-disable-line
      document.getElementById('strattime').value = ""; // eslint-disable-line
      document.getElementById('endtime').value="";// eslint-disable-line
      document.getElementById('uploadfile').value = ""; // eslint-disable-line
    this.uploadtit = "";
    this.goodsnamelist = [];
    this.text = "";
    document.getElementById('message').innerText = ""; //eslint-disable-line
  }
  confirmupload() {
    const strattime = document.getElementById('strattime').value; // eslint-disable-line
    const endtime = document.getElementById('endtime').value; // eslint-disable-line
    document.getElementById('uploadbodyul').style.display = "none"; // eslint-disable-line
    document.getElementById('spinner').style.display = "block"; // eslint-disable-line
    const fillvalue = document.getElementById('uploadfile').files[0]; //eslint-disable-line
    this.$log.log(fillvalue);
    const tthis = this;
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
       tthis.CommonUtilsService.getSearchList("Docinfo", {condition: {doctype: "企业归档", parentid: tthis.detailInfoData.id}, pageIndex: 1, pageSize: 20}).then(data => {
            this.$log.log(data);
          tthis.gridOptions.data = data.datas;
        });
        if (testresponseText.status.indexOf('OK') != -1) {
            // alert(testresponseText.message);
            document.getElementById('spinner').style.display = "none";
            document.getElementById('confirmuploadbtn').style.display = "none";
            // tthis.text = testresponseText.message;
            document.getElementById('message').innerText = testresponseText.message;
            tthis.afterdetailsearch('企业归档');
          } else {
           // this.text = xhr.responseText;
           alert(xhr.responseText);
          }
      }
    };
    this.$log.log(this.uploadtit);
    this.$log.log(this.userName);
    this.$log.log(strattime);
    this.$log.log(endtime);
    fd.append("doctitle", this.uploadtit);
    fd.append('filetype', "企业归档");
    fd.append('parentid', this.detailInfoData.id);
    fd.append("uploadperson", this.userName);
    // fd.append("goods_no", this.uploadgoodsnumber);
    fd.append("contractstartdate", strattime);
    fd.append("contractenddate", endtime);
    fd.append("newFile", fillvalue);
    this.$log.log(fd);
    xhr.send(fd);
  }
    classfiedtype() {
    if (this.uploadfiletype === "合同归档") {
      document.getElementById("strrtli").style.display = "block"; //eslint-disable-line
      document.getElementById("endli").style.display = "block"; //eslint-disable-line
    }else {
      document.getElementById("strrtli").style.display = "none"; //eslint-disable-line
      document.getElementById("endli").style.display = "none"; //eslint-disable-line
    }
  }
    close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
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
      initGridAPI() {
      const pp = this;
      pp.gridOptions.onRegisterApi = function (gridApi) {
        pp.gridApi = gridApi;
        pp.gridapidselect();
      };
    }
  download() {
      if(this.gridApi.selection.getSelectedRows().length !=1) {
          alert('请选择一条进行操作');
          return false;
      }
    window.open(`${APPAPI}/Docinfo/download?filename=${this.gridApi.selection.getSelectedRows()[0].docname}&ftppath=${this.gridApi.selection.getSelectedRows()[0].docpath}`, '_self'); //eslint-disable-line
  }
    billsavedetailInfo() {
    const tthis = this;
    this.$log.log(this.detailID);
    this.$log.log(this.detailInfoData);
    // const showcharge = this.detailInfoData.charge;
    // if (showcharge.length > 0) {
    //   showcharge.forEach(cd => {
    //     this.showcharge[cd.charge_type] = cd.chargenum;
    //   });
    // }
    if(!this.detailInfoData.charge){
      this.detailInfoData.charge=[];
    }
    console.log(this.showcharge);
    if (this.showcharge.ywfee!=0) {
      var ch={};
      ch['charge_type']='ywfee';
      ch['unit']='sku';
      ch['chargenum']=this.showcharge['ywfee'];
      // ch['companyid']=this.detailInfoData.id;
      this.detailInfoData.charge.push(ch);
    }
    if (this.showcharge['secfee']!=0) {
      var ch={};
      ch['charge_type']='secfee';
      ch['unit']='sku';
      ch['chargenum']=this.showcharge['secfee'];
      // ch['companyid']=this.detailInfoData.id;
      this.detailInfoData.charge.push(ch);
    }
    if (this.showcharge['delayfee']!=0) {
      var ch={};
      ch['charge_type']='delayfee';
      ch['unit']='sku';
      ch['chargenum']=this.showcharge['delayfee'];
      // ch['companyid']=this.detailInfoData.id;
      this.detailInfoData.charge.push(ch);
    }
    if (this.showcharge['consfee']!=0) {
      var ch={};
      ch['charge_type']='consfee';
      ch['unit']='sku';
      ch['chargenum']=this.showcharge['consfee'];
      // ch['companyid']=this.detailInfoData.id;
      this.detailInfoData.charge.push(ch);
    }
    console.log(this.detailInfoData.charge);
    if (this.detailID == 0) {
      delete this.detailInfoData.id;
    }
    if(!this.detailInfoData.trade_name) {
        alert('经营单位不能为空');
        return;
    }
    this.CommonUtilsService.saveDetailbyModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("保存成功！");  // eslint-disable-line no-alert
        this.$log.log("ceshi");
        console.log(data);
        tthis.detailInfoData = data.data;
        tthis.$log.log(tthis.detailInfoData);
        tthis.$state.go('yuguileibill.detail', {id: data.data.id});
    });
    // if (this.detailID > 0) {
    //   console.log(this.detailInfoData);
    //   this.CommonUtilsService.saveDetailbyModelName(this.ModelName, this.detailInfoData).then(data => {
    //     alert("保存成功！");  // eslint-disable-line no-alert
    //     console.log(data);
    //     tthis.detailInfoData = data.data;
    //     tthis.$log.log(tthis.detailInfoData);
    //   });
    // } else {
    //  if(this.detailInfoData.trade_name =="" || this.detailInfoData.trade_name == undefined) {
    //     alert('经营单位不能为空');
    //     return;
    // }
    // if(this.detailInfoData.contract_name =="" || this.detailInfoData.contract_name == undefined) {
    //     alert('合同企业名称不能为空');
    //     return;
    // }
    //   delete this.detailInfoData.id;
    //   this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
    //     alert("创建成功"); // eslint-disable-line
    //     this.$log.log(data.data);
    //     this.$log.log(this.detailInfoData);
    //     tthis.detailInfoData = data.data;
    //     this.$log.log(data.data.id);
    //     this.$state.go('yuguileibill.detail', {id: data.data.id});
    //   });
    // }
  }
    deletefile() {
    if(this.gridApi.selection.getSelectedRows().length !==1) {
      alert("请选择一条进行操作");
      return;
    }
    const tthis = this;
     this.$http.delete(`${APPAPI}/Docinfo/deleteone/?docpath=${this.gridApi.selection.getSelectedRows()[0].docpath}`).then(data=>{
       this.$log.log("fanhuishuju");
       this.$log.log(data);
       if(data.data.status == "OK") {
         tthis.CommonUtilsService.getSearchList("Docinfo", {condition: {doctype: "企业归档", parentid: tthis.detailInfoData.id}, pageIndex: 1, pageSize: 20}).then(data => {
          tthis.gridOptions.data = data.datas;
        });
         alert(data.data.message);
       } else {
         alert(data.data.message);
       }
     })
  }
  viewCommodity() {
    this.$log.log(this.detailInfoData.id);
    this.$state.go('classifieddata.list',{id: this.detailInfoData.id});
  }
}

export const yuguileibilldetailcomponent = {
  template: require('./yuguileibilldetail.html'),
  controller: yuguileibilldetailController
};

