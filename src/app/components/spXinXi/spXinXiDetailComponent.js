import baseDetailComponent from '../../basejs/basetwo.js';
class SpXinXiDetailComponentController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $uibModal, $state, $window) {
    super($log, CommonUtilsService, 'CustProductDetailInfo', $stateParams.id);
    this.$state = $state;
    this.$window = $window;
    this.getdetailinfo();
    this.$uibModal = $uibModal;
    this.text = "";
    this.$stateParams = $stateParams;
    this.CommonUtilsService = CommonUtilsService;
    this.disabled = undefined;
    this.searchEnabled = undefined;
  }
  searchAsyncHScode() {
    const tthis = this;
    this.custsearchCondition = {condition: {equalHScode: this.detailInfoData.HScode, custid: this.detailInfoData.custid, equalCgoodsname: this.detailInfoData.Cgoodsname}, pageIndex: 1, pageSize: 25};
    this.CommonUtilsService.getSearchList('CustClassifyProductInfo', this.custsearchCondition)
      .then(results => {
        tthis.selsource = results.datas;
      });
  }
  searchAsynccustname(query) {
    this.$log.log(this.detailInfoData);
    const tthis = this;
    this.custsearchCondition = {condition: {custname: query, custtype: '最终客户'}, pageIndex: 1, pageSize: 10};
    if (!query) {
      this.custsearchCondition.condition.id = tthis.detailInfoData.custid;
    }
    this.CommonUtilsService.getSearchList('CustInfo', this.custsearchCondition)
      .then(results => {
        this.$log.log(results.datas);
        tthis.selsource1 = results.datas;
      });
  }
  beCustidSelected() {
    const tthis = this;
  }
  okbtn() {
    this.$log.log(this.$stateParams.id);
    this.CommonUtilsService.deleteDetailByModelName(this.ModelName, this.$stateParams.id).then(obj => {
      this.$log.log(obj);
      alert("删除成功"); //eslint-disable-line
      this.$state.go("spXinXi.list");
 // eslint-disable-line no-alert
    }).catch(err => {
      alert(err); //eslint-disable-line
    });
  }

  delete() {
    const tthis = this;
    document.getElementById('myModal').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModal').style.display = 'block'; //eslint-disable-line
    document.getElementById('okbtn').style.display = "inline-block"; //eslint-disable-line
    this.text = "确定删除？";
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  log(cust) {
    const _this = this;
    const item = cust;
    this.$log.log(_this);
    const modalInstance = _this.$uibModal.open({
      component: 'logdlgComponent',
      resolve: {
        items: () => {
          return item.r2;
        },
        gname: () => {
          return item.Cgoodsname;
        },
        tempJson: () => {
          return item.tempJson;
        },
        Cspec: () => {
          return item.Cspec;
        },
        SKU: () => {
          return _this.detailInfoData.SKU;
        },
        currsel: () => {
          return _this.detailInfoData.templateJson;
        }
      },
      backdrop: false
    });
    modalInstance.result.then(finresult => {
      console.log(finresult);  // eslint-disable-line
      _this.detailInfoData.Cspec = finresult.Cspec.substr(1);
      if (_this.detailInfoData.Cspec && _this.detailInfoData.Cspec.substr(_this.detailInfoData.Cspec.length - 1, 1) === "|") {
        _this.detailInfoData.Cspec = _this.detailInfoData.Cspec.substr(0, finresult.hode.length - 1);
      }
      _this.detailInfoData.templateJson = finresult.templateJson;
    }, event => {
      console.log(`modal-component dismissed at: {{$new Date()}}`);  // eslint-disable-line
    });
  }
  goGuileidetail() {
    const url = this.$state.href('spGuiLei.detail', {id: this.detailInfoData.ClassifiedProductid});
    this.$window.open(url, '_blank');
  }
  attachcust() {
    const tthis = this;
    /* eslint-disable */
    this.CommonUtilsService.attachcust(this.detailInfoData.id)
      .then(results => {
        alert(results.data);
      });
  }
  reconfirm() {
    const tthis = this;
    /* eslint-disable */
    this.CommonUtilsService.reconfirm(this.detailInfoData.id)

      .then(results => {
        alert(results.data);
      });
  }
  showtemplatejson() {
    document.getElementById('myModalone').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModalone').style.display = 'block'; //eslint-disable-line
  }
  confirmtopro() {
    const tthis = this;
    /* eslint-disable */
    this.CommonUtilsService.confirmtopro(this.ModelName,this.detailInfoData.id)
      .then(results => {
        alert(results.data);
      });
  }
  syntemjlocalsingle() {
    const tthis = this;
    /* eslint-disable */
    this.CommonUtilsService.syntemjlocalsingle(this.ModelName, this.detailInfoData.id)
      .then(results => {
        alert(results.data);
      });
  }
  showtemplatejsonceshi() {
    this.$log.log("ceshi");
    document.getElementById('myModaloneceshi').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModaloneceshi').style.display = 'block'; //eslint-disable-line
  }
  showopetempjson() {
    this.$log.log("ceshi");
    document.getElementById('myModaloneopete').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModaloneopete').style.display = 'block'; //eslint-disable-line
  }
    closetemp(){
    document.getElementById('myModaloneceshi').style.display = 'none';
  }
  closetempjosn(){
    document.getElementById('myModaloneopete').style.display = 'none';
  }
  saveopetempjson(value) {
    console.log(this.detailInfoData);
    this.CommonUtilsService.saveopetempjson(this.detailInfoData.id,this.detailInfoData.opetempjson)
      .then(results => {
        alert(results.data);
      });
  }
}

export const spxinxidetailcomponent = {
  template: require('./spXinXiDetailComponent.html'),
  controller: SpXinXiDetailComponentController
};

