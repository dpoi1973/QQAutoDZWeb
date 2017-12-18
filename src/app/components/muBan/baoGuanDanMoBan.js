import baseDetailComponent from '../../basejs/basetwo.js';
class baoGuanDanMoBanController extends baseDetailComponent {
  constructor($log, $scope, GridOptionService, CommonUtilsService, $document, $window, $stateParams, _, $uibModal, $state) {
    super($log, CommonUtilsService, 'TemplateFormHead', $stateParams.id);
    this.$log = $log;
    this.$scope = $scope;
    this.$document = $document;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.$state = $state;
    this.getdetailinfo();
    this.$stateParams = $stateParams;
    this._ = _;
    this.selids = [];
    this.orderedformlist = [];
    this.addformlist = {};
    this.uploadusername();
    this.userName = "";
    this.machine = "";
    this.templatevalidate = {
    };
    this.templatett = true;
    this.twosingle = true;
    this.validateipulist = {
      traf_mode: {key: 'transf', len: 1},
      trade_mode: {key: 'trade', len: 4},
      cut_mode: {key: 'levytype', len: 4},
      pay_way: {key: 'lc_type', len: 1},
      trade_country: {key: 'country', len: 3},
      distinate_port: {key: 'port', len: 4},
      district_code: {key: 'district', len: 5},
      trans_mode: {key: 'transac', len: 1},
      fee_mark: {key: 'fee_mark', len: 1},
      fee_curr: {key: 'curr', len: 3},
      insur_mark: {key: 'insur_mark', len: 1},
      insur_curr: {key: 'curr', len: 3},
      other_mark: {key: 'other_mark', len: 1},
      other_curr: {key: 'curr', len: 3},
      wrap_type: {key: 'wrap_type', len: 1},
      is_status: "",
      i_e_port: {key: 'customs', len: 4},
      TRADE_AREA_CODE: {key: 'country', len: 3},
      DECL_PORT: {key: 'customs', len: 4},
      g_unit: {key: 'unit', len: 3},
      // trade_curr: {key: 'curr', len: 3},
      unit_1: {key: 'unit', len: 3},
      use_to: {key: 'use_to', len: 2},
      origin_country: {key: 'country', len: 3},
      unit_2: {key: 'unit', len: 3},
      duty_mode: {key: 'levymode', len: 1},
      DESTINATION_COUNTRY: {key: 'country', len: 3},
      g_unitInput: {key: 'unit'},
      unit_1Input: {key: 'unit'},
      unit_2Input: {key: 'unit'},
      trade_currInput: {key: 'curr'},
      DESTINATION_COUNTRYInput: {key: 'country'},
      origin_countryInput: {key: 'country'},
      duty_modeInput: {key: 'levymode'}
    };
    this.selected = {

    };
    this.machinename = ["WLE1", "WLH2", "WLDO", "DLH1", "WLN1", "WLA2", "WLD3", "WLD5", "DLDB", "WLH3", "WLH1", "WLC1", "WLDA", "WLDE", "WLD7", "WLH6"];
    const selszz = ["有纸出口", "有纸进口", "有纸出境", "有纸进境", "无纸出口", "无纸进口", "无纸出境", "无纸进境", "通关无纸化出口", "通关无纸化进口", "通关无纸化出境", "通关无纸化进境"];
    this.ieflaglist = [];
    for (let i = 0; i < selszz.length; i++) {
      const selobj = {};
      selobj.key = i;
      if (i === 10) {
        selobj.key = 'A';
      }
      if (i === 11) {
        selobj.key = 'B';
      }
      selobj.selcli = selszz[i];
      this.ieflaglist.push(selobj);
    }
  }
  // doSomething(modelname, modelvalue) {
  //   this.$log.log(this.detailInfoData);
  //   const index = this.$window.event.srcElement.tabIndex;
  //   const list = angular.element(this.$document[0].querySelectorAll('input'));
  //   const inputrequired = this._.sortBy((this._.where(list, {readonly: false})), value => {
  //     return value.tabIndex;
  //   });
  //   const sel = this._.find(inputrequired, value => {
  //     return value.tabIndex > index;
  //   });
  //   const nowsel = this._.where(list, {tabIndex: index});
  //   const nodeln = modelname.split(".");
  //   this.$log.log(nodeln);
  //   const nodelnam = nodeln[nodeln.length - 2];
  //   this.$log.log(nodelnam);
  //   const lwthis = this;
  //   function hasClass(obj, cls) {
  //     const objClass = obj.className;
  //     const objClasslst = objClass.split(/\s+/);
  //     let x = 0;
  //     for (x in objClasslst) {
  //       if (objClasslst[x] === cls) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   }
  //   if (angular.isUndefined(this.validateipulist[nodelnam])) {
  //     this.$log.log('enter');
  //     this.$log.log(nodelnam);
  //     if (hasClass(nowsel[0], "ng-invalid-pattern") || hasClass(nowsel[0], "ng-invalid-required")) {
  //       nowsel[0].focus();
  //     } else {
  //       sel.focus();
  //     }
  //   } else {
  //     this.$log.log(this.detailInfoData);
  //     const len = this.validateipulist[nodelnam].len;
  //       // var modelval =  modelvalue.match(`/\[(\d{${len}}})\]|^(\d{${len}})$/`);
  //     const re = new RegExp(`\\[(\\d{${len}})\\]|^(\\d{${len}})$`, 'i');
  //     const modelval = modelvalue.match(re);
  //     const modelval2 = modelval[0].replace("[", "");
  //     const modelval3 = modelval2.replace("]", "");
  //     if (modelval !== null) {
  //       this.CommonUtilsService.sendvalidatevalue(this.validateipulist[nodelnam].key, modelval3).then(resp => {
  //         if (lwthis.detailInfoData[nodelnam] === null) {
  //           nowsel[0].focus();
  //         }
  //         lwthis.templatevalidate.templateObj[nodelnam].value = resp.data;
  //         sel.focus();
  //       });
  //     }
  //   }
  // }
  doSomething(modelname, modelvalue) {
    const index = this.$window.event.srcElement.tabIndex;
    const list = angular.element(this.$document[0].querySelectorAll('input'));
    const inputrequired = this._.sortBy((this._.where(list, {readonly: false})), value => {
      return value.tabIndex;
    });
    const sel = this._.find(inputrequired, value => {
      return value.tabIndex > index;
    });
    const nowsel = this._.where(list, {tabIndex: index});
    const nodeln = modelname.split(".");
    const nodelnam = nodeln[nodeln.length - 2];
    const lwthis = this;
    function hasClass(obj, cls) {
      const obj_class = obj.className;
      const obj_class_lst = obj_class.split(/\s+/);
      let x = 0;
      for (x in obj_class_lst) {
        if (obj_class_lst[x] === cls) {
          return true;
        }
      }
      return false;
    }
    if (angular.isUndefined(this.validateipulist[nodelnam])) {
      this.$log.log(nodelnam);
      if (hasClass(nowsel[0], "ng-invalid-pattern") || hasClass(nowsel[0], "ng-invalid-required")) {
        nowsel[0].focus();
      } else {
        sel.focus();
      }
    } else {
      if (!isNaN(modelvalue) && modelvalue !== "") { //eslint-disable-line
        this.$log.log(this.validateipulist[nodelnam].key);
        this.$log.log(modelvalue == ""); //eslint-disable-line
        this.CommonUtilsService.sendvalidatevalue(this.validateipulist[nodelnam].key, modelvalue).then(resp => {
          if (this.templatevalidate.templateObj[nodelnam].value == undefined) { //eslint-disable-line
            this.selected[nodelnam] = resp.data;
            sel.focus();
          } else {
            if (resp.data === null) {
              alert("返回空"); //eslint-disable-line
              return;
            }
            this.$log.log(resp);
            this.$log.log(this.templatevalidate.templateObj[nodelnam]);
            this.templatevalidate.templateObj[nodelnam].value = resp.data;
            sel.focus();
          }
        });
      } else {
        this.$log.log(sel);
        sel.focus();
      }
      if (isNaN(modelvalue)) {
        // this.$log.log(this.detailInfoData);
        // const len = this.validateipulist[nodelnam].len;
        // // var modelval =  modelvalue.match(`/\[(\d{${len}}})\]|^(\d{${len}})$/`);
        // const re = new RegExp(`\\[(\\d{${len}})\\]|^(\\d{${len}})$`, 'i');
        // const modelval = modelvalue.match(re);
        // const modelval2 = modelval[0].replace("[", "");
        // const modelval3 = modelval2.replace("]", "");
        // if (modelval !== null) {
        //   this.CommonUtilsService.sendvalidatevalue(this.validateipulist[nodelnam].key, modelval3).then(resp => {
        //     this.$log.log(lwthis.detailInfoData[nodelnam]);
        //     if (lwthis.detailInfoData[nodelnam] === null) {
        //       nowsel[0].focus();
        //     }
        //     lwthis.templatevalidate.templateObj[nodelnam].value = resp.data;
        //     sel.focus();
        //   });
        // }
        this.$log.log(modelvalue);
        this.CommonUtilsService.sendvalidatevalue(this.validateipulist[nodelnam].key, modelvalue).then(resp => {
          // if (lwthis.detailInfoData[nodelnam] === null) {
          //   nowsel[0].focus();
          // }
          this.$log.log(resp.data);
          if (resp.data !== null) {
            this.templatevalidate.templateObj[nodelnam].value = resp.data;
          }
        });
        sel.focus();
      }
    }
  }

  getformheadtem() {
    const tthis = this;
    this.CommonUtilsService.getformheadtemplatevalidate(this.detailInfoData.TempleteName).then(resp => {
      tthis.templatevalidate = resp.data;
      this.$log.log(tthis.templatevalidate.templateObj.ie_flag);
      this.selieflag = tthis.templatevalidate.templateObj.ie_flag.value;
      this.machine = tthis.templatevalidate.templateObj.username.value;
    });
  }

  savedetail() {
    this.$log.log(this.machine);
    const tthis = this;
    this.detailInfoData.TempleteName = this.templatevalidate.TempleteName;
    this.detailInfoData.templateObj = this.templatevalidate.templateObj;
    this.detailInfoData.templateObj.ie_flag.value = this.selieflag;
    this.detailInfoData.templateObj.username.value = this.machine;
    this.detailInfoData.LastUpdateDate = new Date();
    this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
      this.$log.log(data);
     // alert("保存成功！");  // eslint-disable-line no-alert
      this.text = "保存成功";
      this.$uibModal.open({
        component: 'templatetext',
        resolve: {
          items: () => {
            return this.text;
          }
        }
      });
    }).catch(err => {
      this.text = err;
      this.$uibModal.open({
        component: 'templatetext',
        resolve: {
          items: () => {
            return this.text;
          }
        }
      });
    });
  }
  uploadusername() {
    this.CommonUtilsService.islogin().then(result => {
      this.$log.log(result);
      this.userName = result.data.empinfo.Empname;
    });
  }
  getformheadieflag() {
    this.$log.log("enter");
    this.i_e_date = this.templatevalidate.templateObj.i_e_date.value.substr(0, 4);
    // console.log(this.detailInfoData.ie_flag);
    const ieflag = this.templatevalidate.templateObj.ie_flag.value;
    const ten = parseInt(ieflag, 16);
    if (ten % 4 === 1 || ten % 4 === 3) {
      this.templatett = true;
    } else if (ten % 4 === 0 || ten % 4 === 2) {
      this.templatett = false;
    } else if (ten % 4 === 3 || ten % 4 === 2) {
      this.twosingle = true;
    } else {
      return;
    }
  }
  saveas() {
    document.getElementById('myModal').style.opacity = 2; // eslint-disable-line
    document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
  }
  okbtn() {
    this.$log.log(this.mubanname);
    const tthis = this;
    tthis.$log.log(this.detailInfoData);
    delete this.detailInfoData.id;
    this.detailInfoData.TempleteName = this.mubanname;
    this.detailInfoData.LastUpdatePersonName = this.userName;
    this.detailInfoData.CreatePersonName = this.userName;
    this.detailInfoData.LastUpdateDate = new Date();
    this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); //eslint-disable-line
      this.$log.log(data.data);
      tthis.detailInfoData = data.data;
      tthis.$state.go('muBan.detail', {id: tthis.detailInfoData.id});
      this.$log.log(tthis.detailInfoData.id);
    });
  }

  afterDetailinit() {
    // this.getformheadieflag();
    this.getformheadtem();
  }
  add() {
    // this.detailInfoData.formlist.push(
    //   {}
    // );
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
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
  beCustidSelected($item, $model) {
    const tthis = this;
    tthis.detailInfoData.CustID = $model;
  }
}
export const baoguandanmobancomponent = {
  template: require('./baoGuanDanMoBan.html'),
  controller: baoGuanDanMoBanController
};
