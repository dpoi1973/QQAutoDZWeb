const APPAPI = '/api';
import baseDetailComponent from '../../basejs/basetwo.js';
class proxyarchiveDetailController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $uibModal, $state, $window, GridOptionService, $http, $scope) {
    super($log, CommonUtilsService, 'proxy_archive', $stateParams.id);
    this.$state = $state;
    this.$window = $window;
    this.$http = $http;
    this.GridOptionService = GridOptionService;
    this.CommonUtilsService = CommonUtilsService;
    this.getdetailinfo();
    this.$uibModal = $uibModal;
    this.$scope = $scope;
    this.goodsnamelist = [];
    this.findywinf();
    this.uploadusername();
    this.initGridAPI();
    this.status = "";
    this.uploadfiletype = "数据归档";
    this.time1 = "";
    this.time2 = "";
    this.time3 = "";
    this.time4 = "";
    this.time5 = "";
    this.tiem6 = "";
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
  uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.userName = result.data.empinfo.Empname;
    });
  }
  afterDetailinit() {
    const tthis = this;
    this.GridOptionService.getModelOpitons('Docinfo').then(options => {
      tthis.gridOptions.columnDefs = options.result;
      //   tthis.gridOptions.data = tthis.detailInfoData.formhead;
    });
    if (this.detailInfoData.id == undefined) { //eslint-disable-line
      // alert("id没有"); //eslint-disable-line
      tthis.gridOptions.data = [];
    } else {
      this.CommonUtilsService.getSearchList("Docinfo", {condition: {doctype: this.uploadfiletype, parentid: this.detailInfoData.id}, pageIndex: 1, pageSize: 20}).then(data => {
        this.$log.log(data);
        tthis.gridOptions.data = data.datas;
      });
      this.detailInfoData.flowinfo.forEach(data => {
        this.status = data.flowname;
      });
      this.statuschange();
    }
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
    if (this.gridApi.selection.getSelectedRows().length != 1) { //eslint-disable-line
      alert('请选择一条进行操作'); //eslint-disable-line
      return false;
    }
    window.open(`${APPAPI}/Docinfo/download?filename=${this.gridApi.selection.getSelectedRows()[0].docname}&ftppath=${this.gridApi.selection.getSelectedRows()[0].docpath}`, '_self'); //eslint-disable-line
    // downloadFile(`${APPAPI}/Docinfo/download?filename=${this.gridApi.selection.getSelectedRows()[0].docname}&ftppath=${this.gridApi.selection.getSelectedRows()[0].docpath}`);
  }
  upload() {
    this.$log.log(this.$stateParams);
    if(this.detailID == 0) { //eslint-disable-line
      alert("请先保存再上传"); //eslint-disable-line
      return;
    }
    document.getElementById('myModal').style.opacity = 3; // eslint-disable-line
    document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
    document.getElementById('uploadbodyul').style.display = "block"; // eslint-disable-line
    document.getElementById('spinner').style.display = "none"; // eslint-disable-line
    document.getElementById('confirmuploadbtn').style.display = "inline-block"; //eslint-disable-line
    document.getElementById('addonelist').style.display = "none"; //eslint-disable-line
    document.getElementById('addnewOkbtn').style.display = "none"; //eslint-disable-line
    document.getElementById('modifyonelist').style.display = "none"; // eslint-disable-line
    // this.goodsnamelist = [];
    // this.text = "";
    // this.classfiedtype();
  }
  classfiedtype() {
    document.getElementById("goodsnumber").style.display = "block"; //eslint-disable-line
    this.CommonUtilsService.getSearchList("business_pro", {condition: {settlement_business: this.gridApi.selection.getSelectedRows()[0].settlement_name}}).then(data => {
      this.$log.log(data.datas);
      for (let i = 0; i < data.datas.length; i++) {
        this.goodsnamelist.push(data.datas[i].goods_no);
      }
      this.$log.log(this.goodsnamelist);
    });
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  closetwo() {
    document.getElementById('myModaltwo').style.display = 'none'; //eslint-disable-line
  }
  confirmupload() {
    const tthis = this;
    this.$log.log(this.uploadfiletype);
    this.$log.log(this.uploadtit);
    this.$log.log(this.userName);
    this.$log.log(this.uploadgoodsnumber);
    this.$log.log(this.detailInfoData.id);
    document.getElementById('uploadbodyul').style.display = "none"; // eslint-disable-line
    document.getElementById('spinner').style.display = "block"; // eslint-disable-line
    document.getElementById('confirmuploadbtn').style.display = "none"; //eslint-disable-line
    const fillvalue = document.getElementById('uploadfile').files[0]; //eslint-disable-line
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
            document.getElementById('spinner').style.display = "none";
            document.getElementById('confirmuploadbtn').style.display = "none";
            // tthis.text = testresponseText.message;
            document.getElementById('message').innerText = testresponseText.message;
            tthis.afterdetailsearch('数据归档');
        } else {
          this.text = xhr.responseText;
        }
      }
    };
    fd.append("doctitle", this.uploadtit);
    fd.append('filetype', "数据归档");
    fd.append('parentid', this.detailInfoData.id);
    fd.append("uploadperson", this.userName);
    fd.append("sku", this.detailInfoData.sku);
    fd.append("newFile", fillvalue);
    xhr.send(fd);
  }
  uploadcspec() {
    document.getElementById('myModaltwo').style.opacity = 3; // eslint-disable-line
    document.getElementById('myModaltwo').style.display = 'block'; // eslint-disable-line
  }
  statuspass() {
    this.$log.log(this.detailInfoData);
    const data = {
      parentable: "Dmanage",
      parentid: this.detailInfoData.id,
      operateperson: this.userName,
      memo: this.detailInfoData.memo
    };
    this.$http.post(`${APPAPI}/Flowinfo/turndown`, data)
      .then(resp => {
        this.$log.log(resp);
        if (resp.data.status === "OK") {
          alert("通过成功"); //eslint-disable-line
          this.getdetailinfo()
        } else {
          alert(resp.data.err); //eslint-disable-line
        }
      });
  }





  searchasynccustname(query, $model) {
    this.searchCondition = { condition: { trade_name: query }, pageIndex: 1, pageSize: 9999999999 };
    if (!query) {
      this.searchCondition.condition = { id: this.selectcompany };
    }
    this.CommonUtilsService.getSearchList('company', this.searchCondition)
      .then(results => {
        this.selsource1 = results.datas;
      });
  }
  beCustidSelected($item, $model) {
    const tthis = this;
    this.$log.log($item.trade_name);
    this.detailInfoData.trade_name = $item.trade_name;
    this.detailInfoData.companyid = $model;
    this.$log.log(this.detailInfoData)
    // tthis.searchCondition.condition = {custid: $model};
    // tthis.search();
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
}

export const proxyarchiveDetailcomponen = {
  template: require('./proxyarchiveDetail.html'),
  controller: proxyarchiveDetailController
};

