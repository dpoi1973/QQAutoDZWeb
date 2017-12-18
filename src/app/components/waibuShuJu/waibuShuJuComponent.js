import baseGridComponent from '../../basejs/baseGrid.js';
const APPAPI = '/api';
const APPURL = '/api/printer';
const UPLOADURL = '/api/uploader';
class waibuShuJuComponentController extends baseGridComponent {
   // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $window, $uibModal) {
    super($log, 'QuanqiuYWInfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {custYWNO: "", pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.$scope.onRowclicked = this.onRowclicked;
    this.search();
    this.$state = $state;
    this.$http = $http;
    this.address = {};
    this.text = "";
    this.textdenger = "";
    this.APPAPI = APPAPI;
    this.$q = $q;
    this.$log = $log;
    this.animationsEnabled = true;
    this.val = 10;
    this.timer = null;
    this.width = 0;
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a ui-sref="waibuShuJu.detail({id: row.entity.id})">{{row.entity.custYWNO}} </a></ui>';
  }
  /*eslint-disable */
  jiedan($log) {
    const custYWNO = this.selectRow.custYWNO;
    this.$log.log(this.gridApi.selection.getSelectedRows());
    const defer = this.$q.defer();
    if (this.gridApi.selection.getSelectedRows() == 0) {
        document.getElementById('myModal').style.opacity = 2;
        document.getElementById('myModal').style.display = 'block';
        this.text = "请选择相应报关单";
    }
    for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
         // @ngInject
      this.$http.get(`${APPAPI}/YWinfo/importYWOne?id=${this.gridApi.selection.getSelectedRows()[i].custYWNO}`)
      .then(resp => {
          document.getElementById('myModal').style.opacity = 2;
          document.getElementById('myModal').style.display = 'block';
          this.textdenger +=`${resp.data.message}<br/>`
          document.getElementById('modalcont').innerHTML = this.textdenger;
      }, err => {
         alert(err.data.message);
      });
    }
  }
  okbtn(){
    const tthis = this;
    this.detailall((err, data) => { // eslint-disable-line
      this.$log.log(err.data);
        // alert(err.data.err);
        this.text = err.data.err
      tthis.search();
    });
    document.getElementById('okbtn').style.display = "none";
   // this.close();
  }

  detail() {
    const custYWNO = this.selectRow.id;
    this.$state.go('waibuShuJu.detail', {id: custYWNO});
  }
   openuploadzip(){
    const el = document.getElementById("overlayzip");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
   }
  openupload() {
    const el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  upload() {
    const _this = this;
    const custywno = document.getElementById("CustYwno").value;
    const SOLD_TO = document.getElementById('SOLD_TO').value;
    if(document.getElementById('feeweight').value == "") {
      // feeweight = 0;
      document.getElementById('feeweight').value = 0;
    }
    const feeweight = document.getElementById('feeweight').value;
    if(isNaN(feeweight)) {
      alert('计费重量必须是数字');
      return false;
    }
    const myfile = document.getElementById('myfile');
    const myfile1 = document.getElementById('myfile1');
    const myfile2 = document.getElementById('myfile2');
    // && myfile1.files.length > 0 && myfile2.files.length > 0
    if (myfile.files.length > 0) {
      const file = myfile.files[0];
      const file1 = myfile1.files[0];
      const file2 = myfile2.files[0];
      // file.filename = file.name + '_' + custywno;
      const url = '/api/ImportInvoice/import';
      const xhr = new XMLHttpRequest();
      const fd = new FormData();
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Every thing ok, file uploaded
          console.log('上传结果')
          console.log(JSON.parse(xhr.responseText)); // handle response.
          const testresponseText = JSON.parse(xhr.responseText);
          if (testresponseText.status.indexOf('OK') != -1) {
             alert(testresponseText.message);
            document.getElementById("CustYwno").value = '';
            document.getElementById("SOLD_TO").value = '';
            document.getElementById("feeweight").value = '';
            document.getElementById('myfile').value = '';
            document.getElementById('myfile1').value = '';
            document.getElementById('myfile2').value = '';
            const el = document.getElementById("overlay");
            el.style.visibility = "hidden";
            _this.search();
          } else {
            this.text = xhr.responseText;
            // alert(xhr.responseText);
          }
        }
      };
      fd.append("Custywno", custywno);
      fd.append('SOLD_TO', SOLD_TO);
      fd.append('feeweight', feeweight);
      fd.append("custid", this.selectcompany);
      fd.append("newFile", file);
      fd.append("newFile", file1);
      fd.append("newFile", file2);
      xhr.send(fd);
    } else {
      this.text = "请选择一个文件";
      alert('请选择一个文件')
    }
  }
  cancle() {
    document.getElementById("CustYwno").value = '';
    document.getElementById('myfile').value = '';
    document.getElementById('myfile1').value = '';
    document.getElementById('myfile2').value = '';
    const el = document.getElementById("overlay");
    el.style.visibility = "hidden";
  }
  canclezip(){
    document.getElementById('myFilezip').value = '';
    document.getElementById('batch').value = '';
   const el = document.getElementById("overlayzip");
    el.style.visibility = "hidden";
  }
 printer() {
   this.$log.log(this.gridApi.selection.getSelectedRows());
   this.open('POST', `${APPURL}/shenqingdan`, this.gridApi.selection.getSelectedRows(), '_blank')
  }
  save() {
    // const tthis = this;
    this.$log.log(document.getElementById('myFilezip').files[0]);
          document.getElementById('myModal').style.opacity = 2;
          document.getElementById('myModal').style.display = 'block';
          this.$log.log(document.getElementById("myFilezip").value);
          const postvalue = document.getElementById('batch').value
          if(document.getElementById("myFilezip").files[0] == undefined){
            this.text = "请选择文件";
            return;
          }
          if(document.getElementById("batch").value == ""){
            this.text = "请填写批次号";
            return;
          }
          document.getElementById("spinner").style.display = "block";
          this.text = "上传中..."
          this.$http({
                     url: `${UPLOADURL}/file_upload?batch=${postvalue}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: function() {
                        var formData = new FormData();
                        formData.append('file', document.getElementById('myFilezip').files[0]);
                        return formData;
                    }
                }).then(data=>{
                  this.$log.log(data);
                 document.getElementById("spinner").style.display = "none";
                 this.text = `导入完毕！ 成功导入${data.data.number}条`;
                  alert(this.text);
                  document.getElementById('myFilezip').value = '';
                  this.canclezip();
                  this.search();
                })
                .catch(err=>{
                  this.$log.log(err);
                    this.text = "导入失败";
                    document.getElementById("spinner").style.display = "none";
                })
     }
    findAll(modelkey) {
      console.log(modelkey);
    if (modelkey == undefined) {
      return;
    }
    this.$log.log(modelkey);
     this.searchCondition = {custYWNO: modelkey, pageIndex: 1, pageSize: 20};
    this.$log.log(this.searchCondition);
    this.search();
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
    this.searchCondition = {custYWNO: "", pageIndex: 1, pageSize: 20};
  }
 }

export const waibushujucomponent = {
  template: require('./waibuShuJuComponent.html'),
  controller: waibuShuJuComponentController
};

