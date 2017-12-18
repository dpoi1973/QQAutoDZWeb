import baseGridComponent from '../../basejs/baseGrid.js';
class SpXinXiceshiComponentController extends baseGridComponent {
   // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $window, $uibModal) {
    super($log, 'CustProductDetailInfocopy', GridOptionService, CommonUtilsService);
    this.searchCondition = {condition: {SKU: '', GoodsclassEN: ''}, filename: '', pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.$window = $window;
    this.$scope.onRowclicked = this.onRowclicked;
    this.search();
    this.$state = $state;
  }

  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a target="_blank" ui-sref="spXinXiceshi.detail({id: row.entity.id})">{{row.entity.SKU}} </a></ui>';
  }
  onRowclicked(hscode) {
    this.$log.log(hscode);
  }
  Daoru() {
    const url = this.$state.href('spXinXi.detail', {id: 0});
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
    //   this.searchCondition.condition = {custid: this.selectcompany, orSKU: modelkey, orHScode: modelkey, orStatus: modelkey, orCgoodsname: modelkey, orCspec: modelkey, oropegoodsname: modelkey, orstatus: modelkey, ClassifiedProductid: 0};
    //   this.searchCondition.pageIndex = 1;
    //   this.search();
    // } else {
    this.searchCondition.condition = {custid: this.selectcompany, orSKU: modelkey, orHScode: modelkey, orStatus: modelkey, orCgoodsname: modelkey, orCspec: modelkey, oropegoodsname: modelkey, orstatus: modelkey};
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
  syntemj() {
    this.CommonUtilsService.syntemj(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  jsonfrommd() {
    if (this.selectcompany) {
      this.CommonUtilsService.jsonfrommd(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
    } else {
      alert("请选择客户");// eslint-disable-line no-alert
    }
  }
  refreshmd5andlink() {
    if (this.selectcompany) {
      this.CommonUtilsService.refreshmd5andlink(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
    } else {
      alert("请选择客户");// eslint-disable-line no-alert
    }
  }
  manualattachcust() {
    if (this.selectcompany) {
      this.CommonUtilsService.manualattachcust(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
    } else {
      alert("请选择客户");// eslint-disable-line no-alert
    }
  }
  filllastcspec() {
    if (this.selectcompany) {
      this.CommonUtilsService.filllastcspec(this.ModelName, this.selectcompany)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
    } else {
      alert("请选择客户");// eslint-disable-line no-alert
    }
  }
  // 把autojudgeinfo中数据更新回CustProductDetailInfocopy表
  backautojudgeinfo() {
    this.CommonUtilsService.backautojudgeinfo(this.ModelName)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  // 把CustProductDetailInfocopy表移到最终产品表
  productmovetofin() {
    this.CommonUtilsService.productmovetofin(this.ModelName)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  confirmtoprototal() {
    this.CommonUtilsService.confirmtoprototal()
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }
  openupload() {
    const el = document.getElementById("overlay"); // eslint-disable-line
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible"; // eslint-disable-line
  }
  /* eslint-disable */
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
        fd.append("custid", this.selectcompanycustid)
        xhr.send(fd);
      } else {
        this.text = "请选择一个文件";
        alert('请选择一个文件');
      }
  }
  cancle() {
    document.getElementById("ftype").value = '';
    document.getElementById('myfile').value = '';
    const el = document.getElementById("overlay");
    el.style.visibility = "hidden";
  }
}

export const spxinxiceshicomponent = {
  template: require('./spXinXiComponent.html'),
  controller: SpXinXiceshiComponentController
};

