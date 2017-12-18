const APPAPI = '/api';
import baseGridComponent from '../../basejs/baseGrid.js';
class archiveComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $interval, $uibModal) {
    super($log, 'proxy_archive', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
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
    this.uploadusername();
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a  ui-sref="archivecomponent.detail({id:row.entity.id})">{{row.entity.goods_description_archive}} </a></ui>';
  }
  uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.$log.log(result);
      this.userName = result.data.empinfo.Empname;
    });
  }
  findAll(modelkey) {
    if (modelkey === null) {
      return;
    }
    this.$log.log(modelkey);
    this.searchCondition.condition = {orparakey: modelkey, orparatype: modelkey, orparavalue: modelkey};
    this.searchCondition.pageIndex = 1;
    this.search();
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
      this.goodsnamelist = [];
      this.text = "";
    }
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  confirmupload() {
    const tthis = this;
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
            document.getElementById('spinner').style.display = "none";
            document.getElementById('confirmuploadbtn').style.display = "none";
            // tthis.text = testresponseText.message;
            document.getElementById('message').innerText = testresponseText.message;
        } else {
          this.text = xhr.responseText;
        }
      }
    };
    fd.append("doctitle", this.uploadtit);
    fd.append('filetype', "数据归档");
    fd.append('parentid', this.gridApi.selection.getSelectedRows()[0].id);
    fd.append("uploadperson", this.userName);
    // fd.append("sku", this.detailInfoData.sku);
    fd.append("newFile", fillvalue);
    xhr.send(fd);
  }
}
export const archivecomponent = {
  template: require('./proxyarchive.html'),
  controller: archiveComponentController
};

