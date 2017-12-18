const APPAPI = '/api';
import baseGridComponent from '../../basejs/baseGrid.js';
class compulsorycertificationComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $q, $interval, $uibModal) {
    super($log, 'autojudgeinfo', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.$log = $log;
    this.$scope.onRowclicked = this.onRowclicked;
    this.$uibModal = $uibModal;
    this.text = "";
    this.$q = $q;
    this.$interval = $interval;
    this.$state = $state;
    this.$http = $http;
    this.search();
    this.testObj = {};
    this.userName = "";
    this.uploadusername();
  }
  /*eslint-disable*/
    uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.$log.log(result);
      this.userName = result.data.empinfo.Empname;
    });
  }
  canclezip() {
    document.getElementById('myFilezip').value = '';
    const el = document.getElementById("overlayzip");
    el.style.visibility = "hidden";
  }
  openuploadzip() {
    const el = document.getElementById("overlayzip");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
//  cancle() {
//     document.getElementById('myFile').value = '';
//     const el = document.getElementById("overlay");
//     el.style.visibility = "hidden";
//   }
  openupload() {
    const el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
    save() {
    const _this = this;
    const myfile = document.getElementById('myFilezip');
      const file = myfile.files[0];
      this.$log.log(myfile);
      this.$log.log(file);
      const url = `${APPAPI}/OutList/import`;
      const xhr = new XMLHttpRequest();
      const fd = new FormData();
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('上传结果')
          console.log(JSON.parse(xhr.responseText)); // handle response.
          const testresponseText = JSON.parse(xhr.responseText);
          if (testresponseText.status.indexOf('OK') != -1) {
             alert('上传成功');
            const el = document.getElementById("overlayzip");
            el.style.visibility = "hidden";
          } else {
            this.text = xhr.responseText;
            alert(xhr.responseText);
          }
        }
      };
      fd.append("newFile", file);
      xhr.send(fd);
  }
  //   savetest() {
  //     console.log("test");
  //     console.log(this.selectcompany);
  //     if(this.selectcompany == undefined) {
  //       alert("请选择客户");
  //     }
  //   const myfile = document.getElementById('myFile');
  //   // && myfile1.files.length > 0 && myfile2.files.length > 0 
  //     const file = myfile.files[0];
  //     const url = `${APPAPI}/manualcustproductdetail/import`;
  //     const xhr = new XMLHttpRequest();
  //     const fd = new FormData();
  //     xhr.open("POST", url, true);
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState === 4 && xhr.status === 200) {
  //         // Every thing ok, file uploaded
  //         console.log('上传结果')
  //         console.log(JSON.parse(xhr.responseText)); // handle response. 
  //         const testresponseText = JSON.parse(xhr.responseText);
  //         if (testresponseText.status.indexOf('OK') != -1) {
  //            alert('上传成功');
  //           const el = document.getElementById("overlay");
  //           el.style.visibility = "hidden";
  //         } else {
  //            alert(testresponseText.message);
  //         }
  //       }
  //     };
  //     fd.append("Custname", this.selectcompany.custname);
  //     fd.append('Custid', this.selectcompany.id); 
  //     fd.append("newFile", file);
  //     this.$log.log(fd);
  //     xhr.send(fd);
  // }

  findAll(modelkey) {
      console.log(modelkey);
    if (modelkey == undefined) {
      return;
    }
    this.$log.log(modelkey);
     this.searchCondition.condition = {classifyKey:modelkey}
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
        this.$log.log(results);
        this.selsource1 = results.datas;
      });
  }
    uploadccc() {
    const el = document.getElementById("overlayccc");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
    Productcertification() {
    // this.open('POST', `${APPURL}/huiyupackinglist`, '', '_blank');
     const fillvalue = document.getElementById('mypdffile').files[0]; //eslint-disable-line
    this.$log.log(fillvalue);
    const url = `${APPAPI}/Product_ccc/import`;
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
            const el = document.getElementById("overlayccc");
            el.style.visibility = "hidden";
            alert(testresponseText.message);
          } else {
            this.text = xhr.responseText;
            alert(xhr.responseText);
          }
      }
    };
    fd.append("sku", this.sku);
    fd.append('country', this.country);
    fd.append("uploadperson", this.userName);
    fd.append("newFile", fillvalue);
    xhr.send(fd);
  }

}
export const compulsoryCertificationcomponent = {
  template: require('./CompulsoryCertification.html'),
  controller: compulsorycertificationComponentController
};

