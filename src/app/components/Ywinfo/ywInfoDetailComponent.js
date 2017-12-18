import baseDetailComponent from '../../basejs/basetwo.js';
const APPAPI = '/api';
const APPURL = '/api/printer';
const ENDPOINT_URI = '/api/remote';
const async = require('async');
class YwinfoDetailComponentController extends baseDetailComponent {
    // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $scope, $state, $http, GridOptionService, $window, $uibModal) {
    super($log, CommonUtilsService, 'YWInfo', $stateParams.id, $scope);
    this.searchCondition = {ywid: this.detailID, pageIndex: 1, pageSize: 15};
    this.GridOptionService = GridOptionService;
    this.$state = $state;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.$stateParams = $stateParams;
    this.getdetailinfo();
    this.findywinf();
    this.findywinftwo();
    this.pdfdata = [];
    this.testid = 0;
    this.filename = "";
    this.docname = "";
    this.selieflag = '';
    this.manualieflag = '';
    this.manualno = '';
    this.seltemp = '';
    this.btnhide = false;
    // this.$log.log(`detail ${this.detailInfoData}`);
    this.$http = $http;
    this.text = "";
    this.APPAPI = APPAPI;
    this.ieflaglist = [];
    this.selsource1 = [];
    this.userName = "";
    this.getsearchTemplateFormHead();
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
    this.test = function (row) {
      const tthis = this;
      const newWindow = $window.open();
      const testhscode = JSON.stringify(row.entity.sku); //eslint-disable-line
      const testsku = testhscode.replace("\"", "").replace("\"", "");
      this.custsearchCondition = {condition: {SKU: testsku}, pageIndex: 1, pageSize: 999999999};
      this.CommonUtilsService.getSearchList('CustProductDetailInfo', this.custsearchCondition)
      .then(results => {
        this.$log.log(results.datas);
        const url = this.$state.href('spXinXi.detail', {id: results.datas[0].id});
        newWindow.location.href = url;
      });
    };
  }
  findywinf() {
    this.gridOptions1 = {
      paginationPageSizes: [15, 20, 25],
      // paginationPageSize: 20,
      // useExternalPagination: true,
      // useExternalSorting: true,
      // enableGridMenu: true,
      // multiSelect: false,
      columnDefs: [],
      data: []
      // appScopeProvider: this
    };
  }

  findywinftwo() {
    this.gridOptions3 = {
      paginationPageSizes: [15, 20, 25],
      paginationPageSize: 15,
      rowHeight: 55,
      useExternalPagination: true,
      useExternalSorting: true,
      enableGridMenu: true,
      multiSelect: false,
      columnDefs: [],
      data: []
    };
  }

  afterDetailinit() {
    const tthis = this;
    this.GridOptionService.getModelOpitons('BaoguandanYW').then(options => {
      tthis.gridOptions1.columnDefs = options.result;
      tthis.gridOptions1.data = tthis.detailInfoData.formhead;
    });
    this.GridOptionService.getModelOpitons('invoiceDetailList').then(options => {
      tthis.gridOptions3.columnDefs = options.result;
      tthis.gridOptions3.data = tthis.detailInfoData.invoiceDetailList;
      this.gridOptions3.columnDefs[1].cellTemplate = '<ui><a style= "color:red;" ng-click="grid.appScope.$ctrl.test(row)">{{row.entity.sku}} </a></ui>';
    });
    if (this.detailInfoData.custid == 3276) { //eslint-disable-line
      this.btnhide = true;
    }
    this.searchftplist();
  }

  getspxinxidetailid() {
    const url = this.$state.href('spXinXi.detail', {id: this.detailInfoData.id});
    this.$window.open(url, '_blank');
    const testhscode = JSON.stringify(this.detailInfoData.invoiceDetailList[0].sku); //eslint-disable-line
    const testsku = testhscode.replace("\"", "").replace("\"", "");
    this.custsearchCondition = {condition: {SKU: testsku}, pageIndex: 1, pageSize: 999999999};
    this.CommonUtilsService.getSearchList('CustProductDetailInfo', this.custsearchCondition)
      .then(results => {
        this.$log.log(results.datas[0].id);
      });
  }

  doGuiLei() {
    const _this = this;
    const combine = [];
    // combine.push('sku');
     /* eslint-disable */
    this.$http.post(`${APPAPI}/YWinfo/doGuiLeiAction?id=${this.detailID}`,{combine:combine})
            .then(resp => {
              this.$log.log(resp);
                 alert(resp.data.message);
              _this.findywinf();
            }, err => {
                 alert(err.data.message);
            });
  }
  doGuiLeiprocedure() {
    const _this = this;
    const combine = [];
    // combine.push('sku');
     /* eslint-disable */
    this.$http.post(`${APPAPI}/YWinfo/doGuiLei_procedure?id=${this.detailID}`,{combine:combine})
            .then(resp => {
              this.$log.log(resp);
                 alert(resp.data.message);
              _this.findywinf();
            }, err => {
              this.text = resp.message;
                 alert(err.data.message);
            });
  }
  manualdoGuiLeiprocedure() {
    const _this = this;
    const combine = [];
     /* eslint-disable */
    this.$http.post(`${APPAPI}/YWinfo/manualdoGuiLei_procedure?id=${this.detailID}`,{combine:combine})
            .then(resp => {
              this.$log.log(resp);
                 alert(resp.data.message);
              _this.findywinf();
            }, err => {
              this.text = resp.message;
                 alert(err.data.message);
            });
  }
  genFormHead() {
    const _this = this;
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/genFormHead?id=${this.detailID}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data.message);
              _this.findywinf();
            }, err => {
              this.text = resp.message;
               alert(err.data.message);
            });
  }
  geninFormHead() {
    const _this = this;
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/geninFormHead?id=${this.detailID}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data.message);
              _this.findywinf();
            }, err => {
              this.text = resp.message;
               alert(err.data.message);
            });
  }
  genoutFormHead() {
    const _this = this;
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/genoutFormHead?id=${this.detailID}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data.message);
              _this.findywinf();
            }, err => {
              this.text = resp.message;
               alert(err.data.message);
            });
  }
  // genFormHead_zara() {
  //   const _this = this;
  //   /* eslint-disable */
  //   this.$http.get(`${APPAPI}/YWinfo/genFormHead_op?id=${this.detailID}`)
  //           .then(resp => {
  //             // this.text = resp.message;
  //              console.log(resp)
  //               alert(resp.data.message);
  //             _this.findywinf();
  //           }, err => {
  //             this.text = resp.message;
  //              alert(err.data.message);
  //           });
  // }

  sysncyw() {
    const _this = this;
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/importYWOne_zara?id=${this.detailID}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data.message);
              _this.findywinf();
            }, err => {
               alert(err.data.message);
            });
  }

  initgride() {
    const tthis = this;
    tthis.GridOptionService.getModelOpitons(this.MOdelName).then(data => {
      if (data.result) {
      }
    });
  }

    savedetailInfoywinfo() {
    const tthis = this;
    tthis.$log.log(this.detailInfoData.feeweight*1)
    if(isNaN(this.detailInfoData.feeweight)) {
      alert('计费重量必须是数字');
      return;
    }
    if(this.detailInfoData.feeweight == "") {
      this.detailInfoData.feeweight = 0;
    }
    delete this.detailInfoData.invoiceDetailList;
    this.CommonUtilsService.putDetailbyModelNameywinfo(this.ModelName, this.detailInfoData).then(data => {
      this.text = "保存成功";
      tthis.$uibModal.open({
        component: 'templatetext',
        resolve: {
          items: () => {
            return this.text;
          }
        }
      });
      tthis.detailInfoData = data.data;
      this.getdetailinfo();
    }).catch(err => {
      this.$log.log(err);
      // alert('保存失败'); // eslint-disable-line
      this.text = "保存失败";
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
 cancletemp() {
    this.selieflag = '';
    const el = document.getElementById("overlaytemp");
    el.style.visibility = "hidden";
    document.getElementById('okbtn1').style.display = 'none';
    document.getElementById('okbtn2').style.display = 'none';
    document.getElementById('okbtn3').style.display = 'none';
    document.getElementById('okbtn4').style.display = 'none';
  }
  canclesearch() {
    this.selieflag = '';
    const el = document.getElementById("overlaychayan");
    el.style.visibility = "hidden";
  }
  openprintinvoice() {
    document.getElementById('okbtn1').style.display = 'inline-block';
     const el = document.getElementById("overlaytemp");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
  searchdoc() {
     const el = document.getElementById("overlaychayan");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
  openprintinvoiceelect() {
        document.getElementById('okbtn2').style.display = 'inline-block';
     const el = document.getElementById("overlaytemp");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  openprintinvoicetemp() {
     document.getElementById('okbtn3').style.display = 'inline-block';
     const el = document.getElementById("overlaytemp");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
  openprintinvoicetempelect() {
    document.getElementById('okbtn4').style.display = 'inline-block';
     const el = document.getElementById("overlaytemp");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  printinvoice() { 
    this.$log.log("search id1");
    this.$log.log(this.manualieflag)
    if(this.manualieflag == "") {
      alert("请选择单证类型");
      return;
    }
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfp?ie_flag=%27${this.manualieflag}%27&ywinfoid=${this.$stateParams.id}`).then(data=>{
      this.$log.log(data.data);
      this.open('POST', `${APPURL}/invoiceyw`, data.data, '_blank');
    });
  }
  printinvoiceelect() {
    this.$log.log("search id2");
    if(this.manualieflag == "") {
      alert("请选择单证类型");
      return;
    }
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfpzarareg?ie_flag=%27${this.manualieflag}%27&ywinfoid=${this.$stateParams.id}`).then(data=>{
      this.$log.log(data.data);
      if(data.data.length==0) {
        alert("没有");
        return false;
      }
      this.open('POST', `${APPURL}/invoiceyw`, data.data, '_blank');
    });
  }
  printinvoicetemp() {
    this.$log.log("search3");
    if(this.manualieflag == "") {
      alert("请选择单证类型");
      return;
    }
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfp?ie_flag=%27${this.manualieflag}%27&ywinfoid=${this.$stateParams.id}`).then(data=>{
      this.$log.log(data);
      this.open('POST', `${APPURL}/invoicetempyw`, data.data, '_blank');
    });
  }
  printinvoicetempelect () {
        this.$log.log("search4");
    if(this.manualieflag == "") {
      alert("请选择单证类型");
      return;
    }
    this.$http.get(`${ENDPOINT_URI}/custinfos/downloadxsfpzarareg?ie_flag=%27${this.manualieflag}%27&ywinfoid=${this.$stateParams.id}`).then(data=>{
      this.$log.log(data.data);
      if(data.data.length==0) {
        alert("没有");
        return false;
      }
      this.open('POST', `${APPURL}/invoicetempyw`, data.data, '_blank');
    });
  }
  opengen() {
    const el = document.getElementById("overlay");
    document.getElementById("huiyubtn").style.display = "none";
    document.getElementById("zarabtn").style.display = "inline-block";
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
  opengenhuiyu() {
       this.$log.log(this.selectcompany);
   this.$log.log(this.detailInfoData.custid);
   if(this.detailInfoData.custid == 3282) {
     this.seltemp = "保税口岸上海慧与进口征税模板";
     this.selieflag = 9;
     this.zaralistnum = 50;
   }
   this.seltemp = this.detailInfoData.tiyundaninfo[0].baoguantemplate;
    document.getElementById("huiyubtn").style.display = "inline-block";
    document.getElementById("zarabtn").style.display = "none";
    const el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
  genFormHead_zara(){// genFormHead_fenchai  
    const _this = this;
    const ieflag = this.selieflag;
    const template = this.seltemp;
    this.$log.log(ieflag)
    /* eslint-disable */
    if (this.detailInfoData.custid == 3276) { //eslint-disable-line
      this.$http.get(`${APPAPI}/YWinfo/genFormHead_zara?id=${this.detailID}&ieflag=${ieflag}&template=${template}&Objnum=${this.zaralistnum}`)
              .then(resp => {
                // this.text = resp.message;
                console.log(resp)
                  alert(resp.data.message);
                  this.selieflag = '';
                const el = document.getElementById("overlay");
                el.style.visibility = "hidden";
                _this.findywinf();
              }, err => {
                this.text = resp.message;
                alert(err.data.message);
              });
     }
     else {
        this.$http.get(`${APPAPI}/YWinfo/genFormHead_manual?id=${this.detailID}&ieflag=${ieflag}&template=${template}&Objnum=${this.zaralistnum}`)
                .then(resp => {
                  // this.text = resp.message;
                  console.log(resp)
                    alert(resp.data.message);
                    this.selieflag = '';
                  const el = document.getElementById("overlay");
                  el.style.visibility = "hidden";
                  _this.findywinf();
                }, err => {
                  this.text = resp.message;
                  alert(err.data.message);
                });
     }
    }
   genFormHead_huiyu(){// genFormHead_fenchai 
     console.log("huiyu");
    const _this = this;
    const ieflag = this.selieflag;
    const template = this.seltemp;
    this.$log.log(ieflag)
    this.$log.log(template);
    /* eslint-disable */
    if (this.detailInfoData.custid == 3276) { //eslint-disable-line
      this.$http.get(`${APPAPI}/YWinfo/huiyucombine?id=${this.detailID}&ieflag=${ieflag}&template=${template}&Objnum=${this.zaralistnum}`)
              .then(resp => {
                console.log(resp)
                  alert(resp.data.message);
                  this.selieflag = '';
                const el = document.getElementById("overlay");
                el.style.visibility = "hidden";
                _this.findywinf();
              }, err => {
                this.text = resp.message;
                alert(err.data.message);
              });
     }
     else {
        this.$http.get(`${APPAPI}/YWinfo/huiyucombine?id=${this.detailID}&ieflag=${ieflag}&template=${template}&Objnum=${this.zaralistnum}`)
                .then(resp => {
                  console.log(resp)
                    alert(resp.data.message);
                    this.selieflag = '';
                  const el = document.getElementById("overlay");
                  el.style.visibility = "hidden";
                  _this.findywinf();
                }, err => {
                  this.text = resp.message;
                  alert(err.data.message);
                });
     }
    }

    weightdistribution() {
      this.$log.log(this.detailInfoData.tiyundaninfo[0].grossWt);
      this.$log.log(this.detailInfoData.tiyundaninfo[0].netWt);
      if(this.detailInfoData.tiyundaninfo[0].grossWt == null || this.detailInfoData.tiyundaninfo[0].grossWt == null){
        alert("毛重或净重不能为空");
      }
              this.$http.get(`${APPAPI}/YWinfo/huiyubalance?id=${this.detailID}`)
                .then(resp => { 
                  alert(resp.data.message);
                  console.log(resp)
                }, err => {
                  alert(err);
                });

    }

     refreshprice() {
         this.$http.get(`${APPAPI}/YWinfo/refreshprice?id=${this.detailID}`)
                .then(resp => { 
                  alert(resp.data.message);
                  console.log(resp);
          }, err => {
                  alert(err);
          });

    }

      genFormHead_fenchai(){// genFormHead_fenchai 暂时替代zara
    const _this = this;
    const ieflag = this.selieflag;
    const template = this.seltemp;
    this.$log.log(ieflag)
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/genFormHead_fenchai?id=${this.detailID}&ieflag=${ieflag}&template=${template}&Objnum=${this.zaralistnum}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data.message);
                this.selieflag = '';
              const el = document.getElementById("overlay");
              el.style.visibility = "hidden";
              _this.findywinf();
            }, err => {
              this.text = resp.message;
               alert(err.data.message);
            });
      }

  huiyucombine(){
    const _this = this;
    const ieflag = this.selieflag;
    const template = this.seltemp;
    this.$log.log(ieflag)
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/huiyucombine?id=${this.detailID}&ieflag=${ieflag}&template=${template}&Objnum=${huiyunum}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data.message);
                this.selieflag = '';
              const el = document.getElementById("overlay");
              el.style.visibility = "hidden";
              _this.findywinf();
            }, err => {
              this.text = resp.message;
               alert(err.data.message);
            });
      }
   cancle() {
    this.selieflag = '';
    const el = document.getElementById("overlay");
    el.style.visibility = "hidden";
  }
  cancleguilei() {
    this.selieflag = '';
    const el = document.getElementById("overlayguilei");
    el.style.visibility = "hidden";
  }
  getsearchTemplateFormHead() {
    this.$log.log("enter");
    this.CommonUtilsService.getsearchtemplatename().then(data=>{
      // this.$log.log(data);
      this.selsource1 = data;
    })
  }
  searchasynccustname(query, $model) {
  //   this.$log.log("enter")
    this.searchCondition = {condition: {TempleteName: query}, pageIndex: 1, pageSize: 20};
    this.CommonUtilsService.getSearchList('TemplateFormHead', this.searchCondition)
      .then(results => {
        this.$log.log(results)
        this.selsource1 = results.datas;
      });
  }
  syncallform(){
    const _this = this;
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/sycroFormhead_mul?ywid=${this.detailID}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data);
            }, err => {
              this.text = resp.data;
               alert(err.data);
            });
  }
  huiyusycro(){
    const _this = this;
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/huiyusycro?ywid=${this.detailID}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data);
            }, err => {
              this.text = resp.data;
               alert(err.data);
            });
  }
  huiyucombine() {
        const _this = this;
    /* eslint-disable */
    this.$http.get(`${APPAPI}/YWinfo/huiyucombine?ywid=${this.detailID}`)
            .then(resp => {
              // this.text = resp.message;
               console.log(resp)
                alert(resp.data);
            }, err => {
              this.text = resp.data;
               alert(err.data);
            });
  }
    yuguilei(){
     const el = document.getElementById("overlayguilei");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }
  manualyuguilei(){
    const _this = this;
    
     /* eslint-disable */
     if(!this.manualieflag){
      alert('请选择单证类型');
    }
    else{
      if (this.detailInfoData.custid == 3276) { //eslint-disable-line
      this.$http.get(`${APPAPI}/YWinfo/auto_yuguilei?id=${this.detailID}&ieflag=${this.manualieflag}&manualno=${this.manualno}`)
            .then(resp => {
              console.log('ggl');
              console.log(resp);
              this.$log.log(resp);
                 alert(resp.data.message);
                   this.manualieflag = '';
                   this.manualno= '' ;
                const el = document.getElementById("overlayguilei");
                el.style.visibility = "hidden";
              _this.findywinf();
            }, err => {
              this.text = resp.message;
                 alert(err.data.message);
            });
      }
      else{
        this.$http.get(`${APPAPI}/YWinfo/manual_yuguilei?id=${this.detailID}&ieflag=${this.manualieflag}&manualno=${this.manualno}`)
            .then(resp => {
              console.log('ggl');
              console.log(resp);
              this.$log.log(resp);
                 alert(resp.data.message);
                   this.manualieflag = '';
                   this.manualno= '' ;
                const el = document.getElementById("overlayguilei");
                el.style.visibility = "hidden";
              _this.findywinf();
            }, err => {
              this.text = resp.message;
                 alert(err.data.message);
            });
      }
    }
  }
  print3c() {
            this.$http.get(`${ENDPOINT_URI}/custinfos/huiyu3c?ywinfoid=${this.detailInfoData.id}`)
            .then(resp => {
              console.log(resp)
              if(resp.data.length == 0) {
                alert("空");
                return false;
              }
                        const tthis = this;
          async.mapSeries(resp.data,function(list,call){
               tthis.CommonUtilsService.sendvalidatevalue('unit', list.g_unit).then(data=>{
                  // tthis.$log.log(tthis.detailInfo.formlist[i].unit_1)
                  console.log(data);
                  list.g_unit = data.data.split('[')[0];
                  call(null,'ok');
              })      
          },function(err,result){
              console.log(23333,err,result);
              // tthis.open('POST', `${APPURL}/makePdf`, tthis.detailInfo, '_blank');
              console.log(resp.data);
              tthis.open('POST', `${APPURL}/cccauthentication`, resp.data, '_blank');
            })
            }, err => {
               alert(err.data);
            });
  }
  print3cexplain() {
        this.$http.get(`${ENDPOINT_URI}/custinfos/huiyu3c?ywinfoid=${this.detailInfoData.id}`)
            .then(resp => {
              console.log(resp);
              if(resp.data.length == 0) {
                alert("空");
                return false;
              }
              this.open('POST', `${APPURL}/cccauthenticationexplain`, resp.data, '_blank');
            }, err => {
               alert(err.data);
            });
  }
  printhuiyu() {
    this.$http.get(`${ENDPOINT_URI}/custinfos/huiyuxiangdan?ywinfoid=${this.detailInfoData.id}`)
            .then(resp => {
               this.open('POST', `${APPURL}/huiyupackinglist`, resp.data, '_blank');
               console.log(resp)
            }, err => {
               alert(err.data);
            });
  }
  cccproductpdf() {
  // this.detailInfoData.invoiceDetailList.forEach(data=>{
  //   this.$log.log(data.COO.split("[")[0]);
  //    const conditiondata = {condition: {sku: data.sku ,country: data.COO.split("[")[0]}};
  //   this.CommonUtilsService.getSearchList('Product_ccc', conditiondata).then(resp=>{
  //     this.$log.log(resp);
  //     if(resp.datas.length>0) {
  //         resp.datas.forEach(v=>{
  //           this.$log.log(v.ftppath);
  //             this.$http.get(`${APPAPI}/Product_ccc/download?ftppath=${v.ftppath}`).then(data=>{
  //               window.open(data.config.url);
  //       });
  //     })
  //     } else {
  //       // alert("空");
  //     }
  //   })
  // });
      const Product_ccclist = [];
          async.mapSeries(this.detailInfoData.invoiceDetailList, (list, call) => {
            const conditiondata = {condition: {sku: list.sku ,country: list.COO.split("[")[0]}};
            this.CommonUtilsService.getSearchList('Product_ccc', conditiondata).then(resp => {
              for(var i= 0; i<resp.datas.length;i++) {
                  Product_ccclist.push(resp.datas[i]);
                this.$http.get(`${APPAPI}/Product_ccc/download?ftppath=${resp.datas[i].ftppath}`).then(data=>{
                window.open(data.config.url);
        });
              }
            return Product_ccclist
          }).then(data1 => {
            this.$log.log(data1)
            call(null, 'ok');
          });
        }, (err, result) => {
          this.$log.log(err, result);
          this.$log.log(Product_ccclist);
          if(Product_ccclist.length < 1){
            alert("空");
          }
        });
  }
    searchftplist() {
    this.$log.log("测试的模板");
    this.$log.log(this.detailInfoData.YWNO);
     this.CommonUtilsService.getSearchList('Custftpattach', {condition: {relateno: this.detailInfoData.YWNO}, pageIndex: 1, pageSize: 20}).then(data => {
       this.$log.log(data);
    this.filename = data.datas[0].filename;
    this.docname = data.datas[0].ftppath;
    });
  }
    donwloadfile() {      
      this.$log.log(this.filename);
      this.$log.log(this.docname.replace("ftp://192.168.0.214/",""));
      if(this.filename == "" || this.docname == "") {
        alert("空");
        return;
      }
      window.open(`${APPAPI}/Docinfo/download?filename=${this.filename}&ftppath=${this.docname.replace("ftp://192.168.0.214/","")}`, '_self')
  //   });
  }
}

export const ywinfodetailcomponent = {
  template: require('./ywInfoDetailComponent.html'),
  controller: YwinfoDetailComponentController
};