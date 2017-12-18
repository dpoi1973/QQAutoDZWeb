const APPAPI = '/api';
const async = require('async');
import baseGridComponent from '../../basejs/baseGrid.js';
class classifieddataComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $interval, $uibModal, $stateParams) {
    super($log, 'Dmanage', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {companyid: $stateParams.id}, pageIndex: 1, pageSize: 20, doctitle: "", sortby: 'updatedAt DESC'};
    this.$scope = $scope;
    this.$scope.onRowclicked = this.onRowclicked;
    this.text = "";
    this.$q = $q;
    this.$log.log("find start");
    this.$log.log(this);
    this.$interval = $interval;
    this.$state = $state;
    this.$uibModal = $uibModal;
    this.userName = "";
    this.$http = $http;
    this.initGridAPIedit();
    this.search();
    this.uploadusername();
    this.filtypelist = ["企业资质归档", "合同归档", "预归类归档"];
    this.statusArror = ['待初审', '待复审', '待复审', '待上传', "已完成"];
    this.goodsnamelist = [];
    this.goods_no = "";
    this.selectcompany = "";
    this.nodes = []; // [{'0': '待编辑'}, {'1': '待上传'}, {'2':'待初审'},{'3': '待复审'}, {'4':'待终审'},{'5': "已完成"}];
    this.nodes.push({id: '0', name: '待编辑'});
    this.nodes.push({id: '1', name: '待上传'});
    this.nodes.push({id: '2', name: '待初审'});
    this.nodes.push({id: '3', name: '待复审'});
    this.nodes.push({id: '4', name: '待终审'});
    this.nodes.push({id: '5', name: '已完成'});
    this.nodea = '';
    this.nodeb = '';
    this.uploadusername();
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a target="_blank" ui-sref="classifieddata.detail({id: row.entity.id})">{{row.entity.sku}} </a></ui>';
    columelist[5].cellTemplate = '<div ng-class="{greenbar: !row.entity.cancelflag, whitebar: row.entity.cancelflag,}">{{row.entity.cancelflag}}</div>';
  }
  uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.$log.log(result);
      this.userName = result.data.empinfo.Empname;
    });
  }
  stategodetail() {
    if (this.gridApi.selection.getSelectedRows().length !== 1) {
      alert("请选择一条进行操作");// eslint-disable-line
      return;
    }
    this.$state.go('classifieddata.detail', {id: this.gridApi.selection.getSelectedRows()[0].id});
  }
  findAll(modelkey) {
    if (modelkey === null) {
      return;
    }
    const obj = {};
    if (this.nodea > 0) {
      obj.nodea = this.nodea;
    }
    if (this.nodeb > 0) {
      obj.nodeb = this.nodeb;
    }
    this.$log.log(modelkey);
    this.searchCondition.condition = {orhs_code: modelkey, orsku: modelkey, orgoods_name: modelkey, orupdateperson: modelkey, orcspec: modelkey, orspecifications_model: modelkey, companyid: this.selectcompany, orinnerstatus: modelkey, orgoods_description_archive: modelkey, orsubmissions_archive: modelkey, node_innerno: obj};
    this.searchCondition.pageIndex = 1;
    this.search();
  }
  findfile(modelkeyfile) {
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20, doctitle: modelkeyfile};
    this.search();
  }
  addnew() {
    this.$state.go('classifieddata.detail', {id: 0});
  }
  // updatecspec() {
  //   document.getElementById('myModal').style.opacity = 3; // eslint-disable-line
  //   document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
  //   this.updatecspecvalue = this.gridApi.selection.getSelectedRows()[0].cspec;
  // }
  okupdatecspec() {
    this.$log.log(this.updatecspecvalue);
    if (this.gridApi.selection.getSelectedRows().length < 1) {
      alert("请选择相应条数"); //eslint-disable-line
    }
    // this.CommonUtilsService.deleteDetailByModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].id).then(obj => {
    //   this.$log.log(obj);
    // }).catch(err => {
    // });
  }
  statuspass() {
    if (this.gridApi.selection.getSelectedRows().length < 1) {
      alert("请至少选择一条进行操作"); //eslint-disable-line
      return;
    }
    const tthis = this;
    async.mapSeries(this.gridApi.selection.getSelectedRows(), (list, call) => {
      const data = {
        parentable: "Dmanage",
        parentid: list.id,
        operateperson: this.userName,
        memo: list.memo
      };
      this.$http.post(`${APPAPI}/Flowinfo/turndown`, data)
      .then(resp => {
        this.$log.log(resp);
        call(null, 'ok');
      });
    }, (err, result) => {
      console.log(23333, err, result); //eslint-disable-line
      this.search();
    });
  }
  statusreject() {
    if (this.gridApi.selection.getSelectedRows().length < 1) {
      alert("请至少选择一条进行操作"); //eslint-disable-line
    }
    async.mapSeries(this.gridApi.selection.getSelectedRows(), (list, call) => {
      const data = {
        parentable: "Dmanage",
        parentid: list.id,
        operateperson: this.userName,
        memo: list.memo
      };
      this.$http.post(`${APPAPI}/Flowinfo/turnup`, data)
      .then(resp => {
        this.$log.log(resp);
        call(null, 'ok');
      });
    }, (err, result) => {
      console.log(23333, err, result); //eslint-disable-line
      this.search();
    });
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
      this.goodsnamelist = [];
      this.text = "";
      this.classfiedtype();
    }
  }
  classfiedtype() {
    this.$log.log(this.uploadfiletype);
      document.getElementById("goodsnumber").style.display = "block"; //eslint-disable-line
    this.CommonUtilsService.getSearchList("business_pro", {condition: {settlement_business: this.gridApi.selection.getSelectedRows()[0].settlement_name}}).then(data => {
      this.$log.log('detail');
      this.$log.log(data.datas);
      for (let i = 0; i < data.datas.length; i++) {
        this.goodsnamelist.push(data.datas[i].goods_no);
      }
      this.$log.log(this.goodsnamelist);
    });
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
    xhr.send(fd);
  }
    save() {
    const _this = this;
    const myfile = document.getElementById('myFilezip');
      const file = myfile.files[0];
      this.$log.log(myfile);
      this.$log.log(file);
      const url = `${APPAPI}/Dmanage/importold`;
      const xhr = new XMLHttpRequest();
      const fd = new FormData();
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('上传结果')
          console.log(JSON.parse(xhr.responseText)); // handle response. resp
          const testresponseText = JSON.parse(xhr.responseText);
          if (testresponseText.status.indexOf('OK') != -1) {
             alert('导入成功');
             this.text = "";
             testresponseText.message.forEach(data => {
               if(typeof data == "object") {
                 console.log("object");
               } else {
                 this.text += data; 

               }
             })
             if(this.text != "") {
                _this.$uibModal.open({
                          component: 'templatetext',
                        resolve: {
                      items: () => {
                   return this.text;
                 }
                }
             });
             }
            const el = document.getElementById("overlayzip");
            el.style.visibility = "hidden";
            _this.search();
          } else {
            this.text = xhr.responseText;
            alert(xhr.responseText);
          }
        }
      };
      fd.append("uploadperson", this.userName);
      fd.append("newFile", file);
      xhr.send(fd);
  }
    openuploadzip() {
    const el = document.getElementById("overlayzip");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
    canclezip() {
    document.getElementById('myFilezip').value = '';
    const el = document.getElementById("overlayzip");
    el.style.visibility = "hidden";
  }
  beforehandadd() {
    this.$log.log(this.selectcompany);
    if(this.selectcompany == "" || this.selectcompany == undefined) {
      alert("请先选择客户");
      return;
    }
    const model = {
      companyid:this.selectcompany
    };
    this.CommonUtilsService.createDetailByModelName("Dmanage", model).then(data=>{
      this.$log.log(data);
    }).catch(err => {
      this.$log.log(err);
    })
    this.search();
  }
   searchasynccustname(query, $model) {
    this.searchCondition = {condition: {trade_name: query}, pageIndex: 1, pageSize: 20};
    if (!query) {
      this.searchCondition.condition = {id: this.selectcompany};
    }
    this.CommonUtilsService.getSearchList('company', this.searchCondition)
      .then(results => {
        this.selsource1 = results.datas;
      });
  }
    beCustidSelected($item, $model) {
    const tthis = this;
    // this.selectcompany = $model;
    this.$log.log($model);
  }
  batchuplod() {
     if (this.gridApi.selection.getSelectedRows().length < 1) {
      alert("请至少选择一条进行操作"); //eslint-disable-line
      return;
    } 
    document.getElementById('myModal').style.opacity = 3; // eslint-disable-line
    document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
  }
    confirmupload() {
    document.getElementById('uploadbodyul').style.display = "none"; // eslint-disable-line
    document.getElementById('spinner').style.display = "block"; // eslint-disable-line
    document.getElementById('confirmuploadbtn').style.display = "none"; //eslint-disable-line
    const fillvalue = document.getElementById('uploadfile').files[0]; //eslint-disable-line
    console.log(fillvalue);
      async.mapSeries(this.gridApi.selection.getSelectedRows(),(list,call)=>{
        console.log(list);
    const url = '/api/Docinfo/import';
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    console.log(xhr);
    const testresponseText = xhr.responseText;
    console.log("ceshi");
    console.log(testresponseText)
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Every thing ok, file uploaded
        /*eslint-disable */
        console.log(testresponseText);
        if (testresponseText.status.indexOf('OK') != -1) {
        } else {
          this.text = xhr.responseText;
        }
      }
    };
      fd.append("doctitle", this.uploadtit);
      fd.append('filetype', "数据归档");
      fd.append('parentid', list.id);
      fd.append("uploadperson", this.userName); 
      fd.append("sku", list.sku);
      fd.append("newFile", fillvalue);
      xhr.send(fd);
      }),(err,resp)=>{
        console.log(err, resp)
        // document.getElementById('spinner').style.display = "none";
        // document.getElementById('confirmuploadbtn').style.display = "none";
        // document.getElementById('message').innerText = testresponseText.message;
        // tthis.afterdetailsearch('数据归档');
      }
  }
    close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  removecompany() {
    this.selectcompany = "";
  }
  removestartstatus() {
    this.nodea = "";
  }
  removeendstatus () {
    this.nodeb = "";
  }
}
export const classifieddatacomponent = {
  template: require('./classifieddata.html'),
  controller: classifieddataComponentController
};

