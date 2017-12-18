import baseDetailComponent from '../../basejs/basetwo.js';
const async = require('async');
const APPAPI = '/api';
const APPURL = '/api/printer';
const ENDPOINT_URI = '/api/remote';
class baoGuanDanDetailComponentController extends baseDetailComponent {
      // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $scope, _, $document, $http, $window) {
    super($log, CommonUtilsService, 'FormHead', $stateParams.id);
    this.$stateParams = $stateParams;
    this.getdetailinfo();
    this.getdetailinfoone();
    this._ = _;
    this.$window = $window;
    this.$http = $http;
    this.$document = $document;
    this.scope = $scope;
    this.selids = [];
    this.totnetweight = 0;
    this.totqty = 0;
    this.totcurr = [];
    this.totprice = 0;
    this.totalcurrent = [];
    this.orderedformlist = [];
    this.addformlist = {};
    this.selectcert = "";
    this.showflag = '';
    this.allunit = [];
    this.primise1 = 0;
    this.primise2 = 0;
    this.primise3 = 0;
    this.primise4 = 0;
    this.saveprimise1 = 0;
    this.saveprimise2 = 0;
    this.saveprimise3 = 0;
    this.templatevalidate = {
    };
    this.templatett = true;
    this.twosingle = true;
    this.validateipulist = {
      traf_mode: {key: 'transf', len: 1},
      trade_mode: {key: 'trade', len: 4},
      cut_mode: {key: 'levytype', len: 4},
      pay_way: '',
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
      trade_curr: {key: 'curr', len: 3},
      unit_1: {key: 'unit', len: 3},
      use_to: {key: 'use_to', len: 2},
      origin_country: {key: 'country', len: 3},
      unit_2: {key: 'unit', len: 3},
      duty_mode: {key: 'levymode', len: 1},
      DESTINATION_COUNTRY: {key: 'country', len: 3}
    };
    this.selected = {

    };
  }

  getformheadieflag() {
    const ieflag = this.detailInfoData.ie_flag;
    const ten = parseInt(ieflag, 16);
    this.$log.log(ten % 4);
    if (Math.floor(ten % 4) == 0) { //eslint-disable-line
      this.showflag = "出口";
        } else if (Math.floor(ten % 4) == 1) { //eslint-disable-line
          this.showflag = "进口";
    } else if (Math.floor(ten % 4) == 2) { //eslint-disable-line
      this.showflag = "出境";
    } else if (Math.floor(ten % 4) == 3) { //eslint-disable-line
      this.showflag = "进境";
    }
    if (ten % 4 === 1 || ten % 4 === 3) {
      this.templatett = true;
    } else if (ten % 4 === 0 || ten % 4 === 2) {
      this.templatett = false;
    } else if (ten % 4 === 3 || ten % 4 === 2) {
      this.twosingle = true;
    } else {
      return;
    }
    this.i_e_date = this.detailInfoData.i_e_date.substr(0, 4);
  }
  // text() {
  //   const objS = document.getElementById("pid"); // eslint-disable-line
  //   const grade = objS.options[objS.selectedIndex].value;
  //           // var ieflag = this.detailInfoData.ie_flag;
  //           // var ten = parseInt(ieflag,16);
  //   if (grade === "a") {
  //     this.templatett = false;
  //   }
  //   if (grade === "b") {
  //     this.templatett = true;
  //   }
  //   if (grade === "c") {
  //   }
  //   if (grade === "d") {
  //   }
  // }

  doSomething(modelname, modelvalue) {
    const index = this.$window.event.srcElement.tabIndex;
    this.$log.log(this.$window.event.srcElement);
    this.$log.log(modelvalue);
    const list = angular.element(this.$document[0].querySelectorAll('input'));
    this.$log.log(list);
    const inputrequired = this._.sortBy((this._.where(list, {readonly: false})), value => {
      return value.tabIndex;
    });
    const sel = this._.find(inputrequired, value => {
      return value.tabIndex > index;
    });
    const nowsel = this._.where(list, {tabIndex: index});
    const nodeln = modelname.split(".");
    const nodelnam = nodeln[nodeln.length - 1];
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
    this.$log.log(this.validateipulist[nodelnam]);
    if (angular.isUndefined(this.validateipulist[nodelnam])) {
      if (hasClass(nowsel[0], "ng-invalid-pattern") || hasClass(nowsel[0], "ng-invalid-required")) {
        nowsel[0].focus();
      } else {
        sel.focus();
      }
    } else {
      if (!isNaN(modelvalue)) {
        this.$log.log(this.validateipulist[nodelnam].key);
        this.$log.log(modelvalue);
        this.CommonUtilsService.sendvalidatevalue(this.validateipulist[nodelnam].key, modelvalue).then(resp => {
          if (lwthis.detailInfoData[nodelnam] == undefined) { //eslint-disable-line
            if (resp.data === null) {
              alert("返回空"); //eslint-disable-line
              return;
            }
            this.selected[nodelnam] = resp.data;
            sel.focus();
          } else {
            if (resp.data === null) {
              alert("返回空"); //eslint-disable-line
              return;
            }
            lwthis.detailInfoData[nodelnam] = resp.data;
            sel.focus();
          }
        });
      }
      if (isNaN(modelvalue)) {
        // this.$log.log(this.validateipulist[nodelnam].key);
        // this.$log.log(modelvalue);
        // // this.$log.log(this.detailInfoData);
        // // const len = this.validateipulist[nodelnam].len;
        // // // var modelval =  modelvalue.match(`/\[(\d{${len}}})\]|^(\d{${len}})$/`);
        // // const re = new RegExp(`\\[(\\d{${len}})\\]|^(\\d{${len}})$`, 'i');
        // // const modelval = modelvalue.match(re);
        // // const modelval2 = modelval[0].replace("[", "");
        // // const modelval3 = modelval2.replace("]", "");
        // // if (modelval !== null) {
        this.CommonUtilsService.sendvalidatevalue(this.validateipulist[nodelnam].key, modelvalue).then(resp => {
          if (lwthis.detailInfoData[nodelnam] === null) {
            nowsel[0].focus();
          }
          if (resp.data !== null) {
            lwthis.detailInfoData[nodelnam] = resp.data;
          }
        });
        // }
        sel.focus();
      }
    }
  }
     /*eslint-disable */
  // validateipu(modelname, modelvalue) {
  //   console.log(modelname);
  //   const index = event.srcElement.tabIndex;
  //   const list = document.querySelectorAll('input');
  //   const sel = _.where(list, {tabIndex: index + 1});
  //   sel[0].focus();
  //   const nowsel = _.where(list, {tabIndex: index});
  //   const nodeln = modelname.split(".");
  //   const nodelnam = nodeln[nodeln.length - 1];
  //   if (this.validateipulist[nodelnam] == undefined) {
  //     sel[0].focus();
  //   } else {
  //     this.CommonUtilsService.sendvalidatevalue(nodelnam, modelvalue).then(resp => {
  //       nowsel.value = resp;
  //     }

  //            );
  //   }
  // }

  Save() {
    if(this.primise1 == true) {
      this.saveprimise1 = 1
    } else {
      this.saveprimise1 = 0
    }
     if(this.primise2 == true) {
      this.saveprimise2 = 1
    } else {
      this.saveprimise2 = 0
    }
     if(this.primise3 == true) {
      this.saveprimise3 = 1
    } else {
      this.saveprimise3 = 0
    }
    this.$log.log(this.saveprimise1.toString() + this.saveprimise2.toString() + this.saveprimise3.toString() + this.primise4);
    this.detailInfoData.PROMISE_ITMES = this.saveprimise1.toString() + this.saveprimise2.toString() + this.saveprimise3.toString() + this.primise4
    this.savedetailInfo();
  }
  afterDetailinit() {
    this.freshsort();
    this.getformheadtem();
    this.addflag();
   //  this.getformheadieflag();
  }
    getformheadtem() {
    const tthis = this;
    this.CommonUtilsService.getformheadtemplatevalidate(this.detailInfoData.templatename).then(resp => {
      tthis.$log.log(resp.data);
      tthis.templatevalidate = resp.data;
    });
  }

  freshsort() {
    this.orderedformlist = this._.sortBy(this.detailInfoData.formlist, item => {
      return Number(item.g_no) ;
    });
    this.$log.log("ceshipaixu");
  }

  addflag() {
    this.detailInfoData.gross_wt = this.detailInfoData.gross_wt + "0";
    this.detailInfoData.net_wt = this.detailInfoData.net_wt + "0";
    this.$log.log((this.detailInfoData.gross_wt*1).toFixed(3) + 1);
    this.$log.log((this.detailInfoData.net_wt*1).toFixed(3));
    this.detailInfoData.gross_wt = (this.detailInfoData.gross_wt*1).toFixed(3);
    this.detailInfoData.net_wt = (this.detailInfoData.net_wt*1).toFixed(3);
    this.$log.log("单位");
    this.primise1 = this.detailInfoData.PROMISE_ITMES.substr(0,1)*1
    this.primise2 = this.detailInfoData.PROMISE_ITMES.substr(1,1)*1
    this.primise3 = this.detailInfoData.PROMISE_ITMES.substr(2,1)*1
    this.primise4 = this.detailInfoData.PROMISE_ITMES.substr(3,1)
    this.$log.log(this.primise1);
    this.$log.log(this.primise2);
    this.$log.log(this.primise3);
    if(this.primise1 == 1) {
      this.primise1 = true;
    }
    if(this.primise2 == 1) {
      this.primise2 = true;
    }
    if(this.primise3 == 1) {
      this.primise3 = true;
    }
    for (let i = 0; i < this.orderedformlist.length; i++) {
      this.detailInfoData.formlist[i].flag = false;
    }
    for(var i=0; i< this.detailInfoData.formlist.length; i++) {
        this.totnetweight = this.detailInfoData.formlist[i].NetWeight*1 + this.totnetweight
        this.totqty = this.detailInfoData.formlist[i].qty_1 * 1 + this.totqty
        this.totprice = this.detailInfoData.formlist[i].trade_total * 1 + this.totprice
        this.totcurr.push(this.detailInfoData.formlist[i].trade_curr);
    }
    this.totnetweight = this.totnetweight.toFixed(3);
    this.totqty = this.totqty.toFixed(3);
    this.totprice = this.totprice.toFixed(3);
    for(var j=0; j<this.totcurr.length;j++) {
      if(this.totalcurrent.indexOf(this.totcurr[j]) == -1) {
          this.totalcurrent.push(this.totcurr[j]);
      }
    }
    this.getformheadieflag();
  }

  add() {
    this.detailInfoData.formlist.push(
      {}
    );
    this.freshsort();
  }

  checked(nowno) {
    const sel = this._.findWhere(this.detailInfoData.formlist, {g_no: nowno});
    if (sel) {
      sel.splice(nowno, 1);
    }
  }

  movesel(nowno, offset) {
    const sel = this._.findWhere(this.detailInfoData.formlist, {g_no: nowno});
    const aim = this._.findWhere(this.detailInfoData.formlist, {g_no: (parseInt(nowno) + offset).toString()});
    if (sel && aim) {
      sel.g_no = aim.g_no;
      aim.g_no = nowno;
    }
    console.log(sel);
  }

  moveup() {
    const evens = this._.sortBy(this._.filter(this.detailInfoData.formlist, v => {
      return v.flag;
    }), v => {
      return parseInt(v.g_no);
    });
    evens.forEach(v => {
      this.movesel(v.g_no, -1);
    });
    this.freshsort();
  }

  moveDown() {
    const evens = this._.sortBy(this._.filter(this.detailInfoData.formlist, v => {
      return v.flag;
    }), v => {
      return 0 - parseInt(v.g_no);
    });
    evens.forEach(v => {
      this.movesel(v.g_no, +1);
    });
    this.freshsort();
  }
  deletesel() {
    const evens = this._.sortBy(this._.filter(this.detailInfoData.formlist, v => {
      return v.flag;
    }), v => {
      return parseInt(v.g_no);
    });
    for (var i = 0; i < evens.length; i++) {
      for (let j = this.detailInfoData.formlist.length - 1; j > -1; j--) {
        if (evens[i].id == this.detailInfoData.formlist[j].id) {
          this.detailInfoData.formlist.splice(j, 1);
        }
      }
    }
    for (var i = 0; i < this.detailInfoData.formlist.length; i++) {
      this.detailInfoData.formlist[i].g_no = i.toString();
    }
    this.freshsort();
  }
  binding(item,e) {
    const alltrs = e.srcElement.parentElement.parentElement.getElementsByTagName('tr');
    if(alltrs.length == 0) {
        const onetrs = e.srcElement.parentElement.parentElement.parentElement.getElementsByTagName('tr');
        for(var i=0;i<onetrs.length;i++) {
        onetrs[i].style.backgroundColor = '';
    }
    e.srcElement.parentElement.parentElement.style.backgroundColor = '#ccc';
    for (let i = 0; i < this.orderedformlist.length; i++) {
      this.detailInfoData.formlist[i].flag = false;
    }
    item.flag = true;
    this.selected = item;
    return false;
    }
    for(var i=0;i<alltrs.length;i++) {
      alltrs[i].style.backgroundColor = '';
    }
    e.srcElement.parentElement.style.backgroundColor = '#ccc';
        for (let i = 0; i < this.orderedformlist.length; i++) {
      this.detailInfoData.formlist[i].flag = false;
    }
    item.flag = true;
    this.selected = item;
  }
    bindingcheckbox(item,e) {
    event.stopPropagation();
    const alltrs = e.srcElement.parentElement.parentElement.parentElement.getElementsByTagName('tr');
      if(e.srcElement.parentElement.parentElement.style.backgroundColor !== '') {
      e.srcElement.parentElement.parentElement.style.backgroundColor = '';
    }else {
      e.srcElement.parentElement.parentElement.style.backgroundColor = '#ccc';
    }
    this.selected = item;
  }
  //   printer() {
  //     this.$log.log(this.detailInfo);
  //     this.open('POST', `${APPURL}/makePdf`, this.detailInfo, '_blank')
  // }
   printer() {
    //  this.$log.log('print');
     this.$log.log(this.orderedformlist);
     const tthis = this;
     tthis.detailInfo.formlist = this.orderedformlist;
          async.mapSeries(tthis.detailInfo.formlist,function(list,call){
               tthis.CommonUtilsService.sendvalidatevalue('unit', list.unit_1).then(data=>{
                  // tthis.$log.log(tthis.detailInfo.formlist[i].unit_1)
                  list.unit_1 = data.data.split('[')[0];
                  return  tthis.CommonUtilsService.sendvalidatevalue('unit', list.g_unit);
              }).then(data1 => {
                      // tthis.$log.log(tthis.detailInfo.formlist[i].unit_1)
                      list.g_unit = data1.data.split('[')[0];
                      call(null,'ok');
              })
                 
          },function(err,result){
              console.log(23333,err,result);
              console.log(tthis.detailInfo);
              tthis.open('POST', `${APPURL}/makePdf`, tthis.detailInfo, '_blank');
              tthis.getdetailinfoone();
            })
  }
  reckontotal() {

  }
  printinvoice() { 
    this.$log.log(this.detailInfoData.pre_entry_id);
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfppre?pre_entry_id=%27${this.detailInfoData.pre_entry_id}%27`).then(data=>{
      this.$log.log(data.data);
      this.open('POST', `${APPURL}/invoice`, data.data, '_blank');
    });
  }
    printinvoicetempelect () {
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfppre?pre_entry_id=%27${this.detailInfoData.pre_entry_id}%27`).then(data=>{
      this.$log.log(data.data);
      this.open('POST', `${APPURL}/invoicetemp`, data.data, '_blank');
    });
}
    printinvoicetest () {
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfpall?pre_entry_id=%27${this.detailInfoData.pre_entry_id}%27`).then(data=>{
      this.$log.log(data.data);
      this.open('POST', `${APPURL}/invoicetest`, data.data, '_blank');
    });
}
    printinvoicetemptest () {
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfpall?pre_entry_id=%27${this.detailInfoData.pre_entry_id}%27`).then(data=>{
      this.$log.log(data.data);
      this.open('POST', `${APPURL}/invoicetemptest`, data.data, '_blank');
    });
}
stexpressprint() {
  this.open('POST', `${APPURL}/sfnewexpress`, {}, '_blank');
}
bindingcert(item,e) {
  this.selectcert = item;
}
}
export const baoguandandetailcomponent = {
  template: require('./baoGuanDanDetailComponent.html'),
  controller: baoGuanDanDetailComponentController
};

