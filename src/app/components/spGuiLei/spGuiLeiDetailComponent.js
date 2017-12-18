import baseDetailComponent from '../../basejs/basetwo.js';
class SpGuiLeiDetailComponentController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $uibModal, $state, $window) {
    super($log, CommonUtilsService, 'CustClassifyProductInfo', $stateParams.id);
    this.$state = $state;
    this.$window = $window;
    this.getdetailinfo();
    this.selsource = [];
    this.selsource1 = [];
    this.selsource2 = [];
    this.newselsource2 = [];
    this.$uibModal = $uibModal;
    this.proinfoconfigObj = {};
    this.midDicObj = {};
    this.curbasenode = null;
    this.selectcunit = "";
    this.curcursor = -1;
    this.test = "";
    // this.changeunitbalue();
    // this.modelfack();
  }

  afterDetailinit() {
    this.$log.log(this.detailInfoData);
    this.showr2 = angular.toJson(this.detailInfoData.r2);
    this.detailInfoData.midDic = angular.toJson(this.detailInfoData.midDic);
    this.ohscode = this.detailInfoData.HScode;
  }
  searchAsyncHScode(query) {
    this.$log.log(query);
    const tthis = this;
    if (this.detailInfoData) {
      this.ohscode = this.detailInfoData.HScode;
    }
    this.custsearchCondition = {condition: {HScode: query, Cgoodsname: ''}, pageIndex: 1, sortby: "", pageSize: 10};
    this.CommonUtilsService.getSearchList('ClassifyInfo', this.custsearchCondition)
      .then(results => {
        tthis.selsource = results.datas;
      });
  }
  searchAsynccustname(query) {
    this.$log.log(query);
    const tthis = this;
    this.custsearchCondition = {condition: {custname: query, custtype: '最终客户'}, pageIndex: 1, sortby: "", pageSize: 10};
    if (!query) {
      this.custsearchCondition.condition.id = tthis.detailInfoData.custid;
    }
    this.CommonUtilsService.getSearchList('CustInfo', this.custsearchCondition)
      .then(results => {
        tthis.selsource1 = results.datas;
        if (results.datas.length === 1) {
          tthis.detailInfoData.proinfoconfig = angular.toJson(results.datas[0].proinfoconfig);
        }
      });
  }
  searchAsynccustunit(query) {
    const tthis = this;
    tthis.CommonUtilsService.searchunit().then(data => {
      this.$log.log(data);
      if (!query) { // eslint-disable-line
        tthis.selsource2 = data.data;
        for (let i = 0; i < tthis.selsource2.length; i++) {
          if (this.detailInfoData.cunit == tthis.selsource2[i].Q_code) { // eslint-disable-line
            tthis.test = tthis.selsource2[i].Q_name;
          }
        }
      } else {
        tthis.test = "";
        this.newselsource2 = data.data;
        for (let i = 0; i < this.newselsource2.length; i++) {
          if (query == this.newselsource2[i].Q_code) { // eslint-disable-line
            this.$log.log(query);
            this.$log.log(this.newselsource2[i].Q_code);
            tthis.selsource2 = [];
            tthis.selsource2.push(this.newselsource2[i]);
          }
        }
      }
    });
  }

  becunitSelected(item, model) {
    this.test = "";
    this.selectcunit = item.Q_code;
  }

  beHscodeSelected(item) {
    this.$log.log(this.ohscode);
    const log = this.$log;
    const _this = this;
    this.detailInfoData.HScode = item.HSCode;
    const modalInstance = this.$uibModal.open({
      component: 'applydlgComponent',
      resolve: {
        items: () => {
          return item.TempJson;
        },
        gname: () => {
          return item.GName;
        },
        tempJson: () => {
          return "";
        },
        Cspec: () => {
          return '';
        },
        Unit1: () => {
          return item.Unit1;
        },
        Unit2: () => {
          return item.Unit2;
        },
        ohscode: () => {
          return _this.ohscode;
        }
      },
      backdrop: false
    });
    modalInstance.result.then(finresult => {
      log.log(finresult);
      _this.detailInfoData.Cgoodsname = finresult.Cgoodsname;
      _this.detailInfoData.tempJson = finresult.tempJson;
      if (finresult.hode && finresult.hode.substr(finresult.hode.length - 1, 1) === "|") {
        finresult.hode = finresult.hode.substr(0, finresult.hode.length - 1);
      }
      _this.detailInfoData.Cspec = finresult.hode;
      _this.detailInfoData.r2 = finresult.changeitems;
      _this.detailInfoData.cunit = finresult.Unit1;
      _this.detailInfoData.cunit1 = finresult.Unit2;
      _this.showr2 = angular.toJson(finresult.changeitems);
      _this.ohscode = _this.detailInfoData.HScode;
    }, event => {
      _this.detailInfoData.HScode = event;
      log.info(`modal-component dismissed at: {{$new Date()}}`);
    });
  }

  apply(Hscode) {
    const _this = this;
    this.custsearchCondition = {condition: {HScode: Hscode, Cgoodsname: ''}, pageIndex: 1, sortby: "", pageSize: 10};
    this.CommonUtilsService.getSearchList('ClassifyInfo', this.custsearchCondition)
      .then(results => {
        const item = results.datas[0];
        const modalInstance = _this.$uibModal.open({
          component: 'applydlgComponent',
          resolve: {
            items: () => {
              return item.TempJson;
            },
            gname: () => {
              return _this.detailInfoData.Cgoodsname;
            },
            tempJson: () => {
              return _this.detailInfoData.tempJson;
            },
            Cspec: () => {
              return _this.detailInfoData.Cspec;
            },
            Unit1: () => {
              return item.Unit1;
            },
            Unit2: () => {
              return item.Unit2;
            },
            ohscode: () => {
              return _this.ohscode;
            }
          },
          backdrop: false
        });
        const log = _this.$log;
        modalInstance.result.then(finresult => {
          log.log(finresult);
          _this.detailInfoData.Cgoodsname = finresult.Cgoodsname;
          _this.detailInfoData.tempjson = finresult.tempjson;
          _this.detailInfoData.Cspec = finresult.hode;
          _this.cunit = finresult.Unit1;
          _this.cunit1 = finresult.Unit2;
        }, event => {
          log.info(`modal-component dismissed at: {{$new Date()}}`);
        });
      });
  }

  log(Hscode) {
    const _this = this;
    this.custsearchCondition = {condition: {HScode: Hscode, Cgoodsname: ''}, pageIndex: 1, sortby: "", pageSize: 10};
    this.CommonUtilsService.getSearchList('ClassifyInfo', this.custsearchCondition)
      .then(results => {
        const item = results.datas[0];
        const modalInstance = _this.$uibModal.open({
          component: 'logdlgComponent',
          resolve: {
            items: () => {
              return item.TempJson;
            },
            gname: () => {
              return _this.detailInfoData.Cgoodsname;
            },
            tempJson: () => {
              return _this.detailInfoData.tempJson;
            },
            Cspec: () => {
              return _this.detailInfoData.Cspec;
            }
          },
          backdrop: false
        });
        const log = _this.$log;
        modalInstance.result.then(finresult => {
        }, event => {
          log.info(`modal-component dismissed at: {{$new Date()}}`);
        });
      });
  }

  guilei(Hscode) {
    const _this = this;
    this.custsearchCondition = {condition: {HScode: Hscode, Cgoodsname: ''}, pageIndex: 1, sortby: "", pageSize: 10};
    this.CommonUtilsService.getSearchList('ClassifyInfo', this.custsearchCondition)
      .then(results => {
        this.$log.log(results.datas[0]);
        const item = results.datas[0];
        this.$log.log(item);
        const modalInstance = _this.$uibModal.open({
          component: 'cspecdlgcomponent',
          resolve: {
            items: () => {
              return item.TempJson;
            },
            gname: () => {
              return _this.detailInfoData.Cgoodsname;
            },
            proinfoconfig: () => {
              return _this.detailInfoData.proinfoconfig;
            },
            Cspec: () => {
              return _this.detailInfoData.fakeCspec;
            }
          },
          backdrop: false
        });
        const log = _this.$log;
        modalInstance.result.then(finresult => {
          const projson = angular.fromJson(_this.detailInfoData.proinfoconfig);
          _this.detailInfoData.fakeCspec = finresult.hode;
          _this.detailInfoData.Cspec = _this.detailInfoData.fakeCspec.replace(/\[.*?\]/g, word => {
            word = word.replace('[', '').replace(']', '');
            const wj = projson[word];
            return wj;
          });
          if (_this.detailInfoData.Cspec.substr(0, 1) === "|") {
            _this.detailInfoData.Cspec = _this.detailInfoData.Cspec.substr(1, _this.detailInfoData.Cspec.length);
          }
           // _this.detailInfoData.Cspec
        }, event => {
          log.info(`modal-component dismissed at: {{$new Date()}}`);
        });
      });
  }

  revisefakegoodsname(Hscode) {
    this.$log.log("search");
    this.$log.log(Hscode);
    const _this = this;
    this.custsearchCondition = {condition: {HScode: Hscode}, pageIndex: 1, sortby: "", pageSize: 10};
    this.CommonUtilsService.getSearchList('ClassifyInfo', this.custsearchCondition)
      .then(results => {
        const item = results.datas[0];
        const modalInstance = _this.$uibModal.open({
          component: 'fakegoodsnamecomponent',
          resolve: {
            items: () => {
              return item.TempJson;
            },
            gname: () => {
              return _this.detailInfoData.Cgoodsname;
            },
            proinfoconfig: () => {
              return _this.detailInfoData.proinfoconfig;
            },
            Cspec: () => {
              return _this.detailInfoData.fakegoodsname;
            }
          },
          backdrop: false
        });
        const log = _this.$log;
        modalInstance.result.then(finresult => {
          const projson = angular.fromJson(_this.detailInfoData.proinfoconfig);
          _this.detailInfoData.fakegoodsname = finresult.hode.trim();
          _this.detailInfoData.pracGoodsname = _this.detailInfoData.fakegoodsname.replace(/\[.*?\]/g, word => {
            word = word.replace('[', '').replace(']', '');
            const wj = projson[word];
            return wj;
          });
           // _this.detailInfoData.Cspec
        }, event => {
          log.info(`modal-component dismissed at: {{$new Date()}}`);
        });
      });
  }

  savedetail() {
    if (this.selectcunit == "") { //eslint-disable-line
      this.detailInfoData.cunit = this.detailInfoData.cunit;
    } else {
      this.detailInfoData.cunit = this.selectcunit;
    }
    this.spguileisavedetailInfo();
    const tthis = this;
    this.CommonUtilsService.searchunit().then(data => {
      tthis.selsource2 = data.data;
      for (let i = 0; i < tthis.selsource2.length; i++) {
          if (this.detailInfoData.cunit == tthis.selsource2[i].Q_code) { // eslint-disable-line
            tthis.test = tthis.selsource2[i].Q_name;
          }
      }
    });
  }
  saveas() {
    this.detailInfoData.id = 0;
    this.detailID = 0;
    this.detailInfoData.Cgoodsname = '';
  }

  pass() {
    this.detailInfoData.Status = "审核通过";
    /* eslint handle-callback-err: ["error", "error"]*/
    this.savedetailInfo((err, result) => {
      if (result === "ok") {
        alert("审核完成");// eslint-disable-line no-alert
      }
    });
  }

  reject() {
    this.detailInfoData.Status = "";
    this.savedetailInfo((err, result) => {
      if (result === "ok") {
        alert("审核完成");// eslint-disable-line no-alert
      }
    });
  }

  fillcspec(id) {
    this.CommonUtilsService.fillcspec(id)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }

  linkpro(id) {
    const _this = this;
    this.CommonUtilsService.fillprodetail(id)
      .then(results => {
        _this.$log.log(results);
        alert(results.data);// eslint-disable-line no-alert
      });
  }

  copyHsconfig(id) {
    this.CommonUtilsService.copyHsconfig(id)
      .then(results => {
        alert("完成");// eslint-disable-line no-alert
      });
  }

  showtemplatejson() {
    this.$log.log(JSON.parse( this.detailInfoData.proinfoconfig)); //eslint-disable-line
    this.proinfoconfigObj = JSON.parse( this.detailInfoData.proinfoconfig);  //eslint-disable-line
    document.getElementById('myModaltwo').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModaltwo').style.display = 'block'; //eslint-disable-line
  }
  showmidDic() {
    this.$log.log(JSON.parse( this.detailInfoData.midDic)); //eslint-disable-line
    this.proinfoconfigObj = JSON.parse(this.detailInfoData.midDic);  //eslint-disable-line
    document.getElementById('myModaltwo').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModaltwo').style.display = 'block'; //eslint-disable-line
  }
  closetemp() {
    document.getElementById('myModaltwo').style.display = 'none'; //eslint-disable-line
  }

}

export const spguileidetailcomponent = {
  template: require('./spGuiLeiDetailComponent.html'),
  controller: SpGuiLeiDetailComponentController
};

