const APPAPI = '/api';
import baseDetailComponent from '../../basejs/basetwo.js';
class classifieddataDetailController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $uibModal, $state, $window, GridOptionService, $http, $scope) {
    super($log, CommonUtilsService, 'Dmanage', $stateParams.id);
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
    this.name1 = "";
    this.name2 = "";
    this.name3 = "";
    this.name4 = "";
    this.name5 = "";
    this.name6 = "";
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
    this.$log.log(this.uploadfiletype);
    this.$log.log(this.detailInfoData.proxyid);
    if (!this.detailInfoData.proxyid) { //eslint-disable-line
      // alert("id没有"); //eslint-disable-line
      tthis.gridOptions.data = [];
    } else {
      this.CommonUtilsService.getSearchList("Docinfo", {condition: {doctype: this.uploadfiletype, parentid: this.detailInfoData.proxyid}, pageIndex: 1, pageSize: 20}).then(data => {
        this.$log.log(data);
        tthis.gridOptions.data = data.datas;
      });
    }
    this.detailInfoData.flowinfo.forEach(data => {
      this.status = data.flowname;
    });
    this.statuschange();
  }
  statuschange() {
    if (this.status == "") { //eslint-disable-line
    document.getElementById('initstatus').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('initText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('create').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('createText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('check').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('checkText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('produce').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('produceText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('delivery').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('deliveryText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('received').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('receivedText').style.color = '#ccc'; //eslint-disable-line
      this.searchstatustime();
      this.searchstatusperson();
}else if (this.status == "待上传") { //eslint-disable-line
    document.getElementById('initstatus').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('initText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('create').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('createText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('check').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('checkText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('produce').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('produceText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('delivery').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('deliveryText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('received').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('receivedText').style.color = '#ccc'; //eslint-disable-line
  this.searchstatustime();
  this.searchstatusperson();
}else if (this.status == "待初审") { //eslint-disable-line
    document.getElementById('initstatus').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('initText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('create').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('createText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('check').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('checkText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('produce').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('produceText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('delivery').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('deliveryText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('received').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('receivedText').style.color = '#ccc'; //eslint-disable-line
  this.searchstatustime();
  this.searchstatusperson();
} else if (this.status == "待复审") { //eslint-disable-line
    document.getElementById('initstatus').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('initText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('create').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('createText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('check').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('checkText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('produce').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('produceText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('delivery').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('deliveryText').style.color = '#ccc'; //eslint-disable-line
    document.getElementById('received').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('receivedText').style.color = '#ccc'; //eslint-disable-line
  this.searchstatustime();
  this.searchstatusperson();
} else if (this.status == "待终审") { //eslint-disable-line
    document.getElementById('initstatus').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('initText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('create').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('createText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('check').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('checkText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('produce').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('produceText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('delivery').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('deliveryText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('received').style.backgroundColor = '#bbb'; //eslint-disable-line
    document.getElementById('receivedText').style.color = '#ccc'; //eslint-disable-line
  this.searchstatustime();
  this.searchstatusperson();
} else if (this.status == "已完成") { //eslint-disable-line
    document.getElementById('initstatus').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('initText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('create').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('createText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('check').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('checkText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('produce').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('produceText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('delivery').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('deliveryText').style.color = '#DD0000'; //eslint-disable-line
    document.getElementById('received').style.backgroundColor = '#DD0000'; //eslint-disable-line
    document.getElementById('receivedText').style.color = '#DD0000'; //eslint-disable-line
  this.searchstatustime();
  this.searchstatusperson();
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
    fd.append('parentid', this.detailInfoData.proxyid);
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
  statusreject() {
    const data = {
      parentable: "Dmanage",
      parentid: this.detailInfoData.id,
      operateperson: this.userName,
      memo: this.detailInfoData.memo
    };
    this.$http.post(`${APPAPI}/Flowinfo/turnup`, data)
      .then(resp => {
        this.$log.log("驳回");
        this.$log.log(resp);
        if (resp.data.status === "OK") {
          alert("驳回成功"); //eslint-disable-line
          this.getdetailinfo();
          this.$log.log("驳回了");
        } else {
          alert(resp.data.err); //eslint-disable-line
        }
      });
  }
  searchstatus() {
    this.$log.log(this.detailInfoData.id);
    this.$log.log("flowinfo");
    this.CommonUtilsService.getSearchList("Flowinfo", { condition: { doctype: "数据归档", parentid: this.detailInfoData.id }, pageIndex: 1, pageSize: 20 }).then(data => {
      this.$log.log("ceshi");
      this.$log.log(data.datas);
      this.$log.log(data.datas[data.datas.length - 1])
      this.status = data.datas[data.datas.length - 1].flowname;
    })
    this.searchstatustime();
    this.searchstatusperson();
  }
  searchstatustime() {
    const tthis = this;
      this.CommonUtilsService.getSearchList("Flowinfo", { condition: { parentid: this.detailInfoData.id }, pageIndex: 1, pageSize: 20 }).then(data => {
      this.$log.log("ceshi");
      this.$log.log(data.datas);
      tthis.time2 = new Date(data.datas[0].updatedAt).toLocaleString();
      tthis.time3 = new Date(data.datas[1].updatedAt).toLocaleString();
      tthis.time4 = new Date(data.datas[2].updatedAt).toLocaleString();
      tthis.time5 = new Date(data.datas[3].updatedAt).toLocaleString();
      tthis.time6 = new Date(data.datas[4].updatedAt).toLocaleString();
    })
  }
    searchstatusperson() {
    const tthis = this;
      this.CommonUtilsService.getSearchList("Flowinfo", { condition: { parentid: this.detailInfoData.id }, pageIndex: 1, pageSize: 20 }).then(data => {
      this.$log.log("ceshi2");
      this.$log.log(data.datas);
      tthis.name1 = data.datas[0].operateperson;
      tthis.name2 = data.datas[1].operateperson;
      tthis.name3 = data.datas[2].operateperson;
      tthis.name4 = data.datas[3].operateperson;
      tthis.name5 = data.datas[4].operateperson;
    })
  }
  billsavedetailInfo() {
    const tthis = this;
    if (!this.detailInfoData.sku && !this.detailInfoData.goods_name) {
      alert('货号或品名不能同时为空');
      return;
    }
    if (!this.detailInfoData.companyid) {
      alert('经营单位不能为空');
      return;
    }
    if (this.detailID == 0) {
      delete this.detailInfoData.id;
    }
    this.detailInfoData.updateperson = this.userName;
    this.detailInfoData.dataflag = false;
    this.CommonUtilsService.saveDetailbyModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("保存成功！");  // eslint-disable-line no-alert
        console.log(data);
        tthis.detailInfoData = data.data;
        this.$state.go('classifieddata.detail', {id: data.data.id});
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
        tthis.afterdetailsearch();
         alert(data.data.message);
       } else {
         alert(data.data.message);
       }
     })
  }
  losereffect(){
    if(this.detailInfoData.cancelflag==true ) {
      alert("已是失效状态");
      return;
    }
    this.detailInfoData.cancelflag = true;
     this.CommonUtilsService.saveDetailbyModelName(this.ModelName, this.detailInfoData).then(data=>{
       this.$log.log(data);
     })
  }
}

export const classifieddataDetailcomponen = {
  template: require('./classifieddataDetail.html'),
  controller: classifieddataDetailController
};


function downloadFile(url) {   
        try{ 
            var elemIF = document.createElement("iframe");   
            elemIF.src = url;   
            elemIF.style.display = "none";   
            document.body.appendChild(elemIF);   
        }catch(e){ 
 
        } 
    }

