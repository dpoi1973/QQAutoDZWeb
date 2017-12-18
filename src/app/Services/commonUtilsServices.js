const APPAPI = '/api';
import baseRESTServices from '../basejs/baserest.js';
class CommonUtilsServices extends baseRESTServices {
  // @ngInject
  constructor($q, $http, $log, $window) {
    super($q, $http);
    this.$log = $log;
    // this.APPAPI = APPAPI;
    this.$window = $window;
  }

  islogin() {
    return this.doGet(`${APPAPI}/wechat/me`);
  }
  dologin(username, password) {
    const defer = this.$q.defer();
    const aupara = `identifier=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    this.$http({
      method: 'POST',
      url: `${APPAPI}/auth/local`,
      data: aupara,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(resp => {
        defer.resolve(resp);
      }, err => {
        defer.reject(err);
      });
    return defer.promise;
  }
  // 注册
  doregister(username, password) {
    const defer = this.$q.defer();
    const aupara = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    this.$http({
      method: 'POST',
      url: `${APPAPI}/userregister`,
      data: aupara,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .success(resp => {
        defer.resolve(resp);
      }).error(err => {
        defer.reject(err);
      });
    return defer.promise;
  }
  // 登出
  dologout() {
    return this.doGet(`${APPAPI}/wechat/logout`);
  }
  getCompanylistSearch(searchcondition) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/CustInfo/searchSelectList`, searchcondition)
      .success(resp => {
        defer.resolve(resp);
      }).error(err => {
        defer.reject(err);
      });
    return defer.promise;
  }
  // 获取model的查询列表
  getSearchList(Modelname, condition) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/${Modelname}/searchby`, condition).then(resp => {
      defer.resolve(resp.data);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  postxinxicesi(Modelname, data) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/${Modelname}/dragbackpro`, data).then(resp => {
      defer.resolve(resp.data);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  getsearchtemplatename() {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/TemplateFormHead/gettemplatename`).then(resp => {
      defer.resolve(resp.data);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  createDetailByModelName(Modelname, model) {
    const defer = this.$q.defer();
    // this.$http.get(`${APPAPI}/${Modelname}`).then(resp => {
    //   this.$log.log("getall");
    //   this.$log.log(resp);
    // });
    this.$http.post(`${APPAPI}/${Modelname}`, model).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  updateDetailByModelName(Modelname, model) {
    const defer = this.$q.defer();
    this.$http.put(`${APPAPI}/${Modelname}/${model.id}`, model).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  deleteDetailByModelName(Modelname, id) {
     // @ngInject
    const defer = this.$q.defer();
    this.$http.delete(`${APPAPI}/${Modelname}/${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  putDetailbyModelName(Modelname, id, model) {
    // @ngInject
    const defer = this.$q.defer();
    this.$http.put(`${APPAPI}/${Modelname}/${id}`, model).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  putDetailbyModelNameywinfo(Modelname, model) {
    // @ngInject
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/${Modelname}/saveywinfo`, model).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  saveDetailbyModelName(Modelname, model) {
    // @ngInject
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/${Modelname}/saveinfo`, model).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  sendvalidatevalue(modelname, modelvalue) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/Formhead/validate?value=${modelvalue}&id=${modelname}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  getDetailbyiModelId(Modelname, id) {
    // @ngInject
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  // 获取model的查询列表
  getYWdetail(condition) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/Ywinfo/getywdetail`, condition).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  getformheadtemplatevalidate(templatename) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/templateformhead/getMubanObj?name=${templatename}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  send(id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/Formhead/send`, id).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  sendciq(ids) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/Dcl_B_Io_Decl/sendciq`, ids).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  attachcust(id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustProductDetailInfo/attachcust?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  attachcustcopy(Modelname, id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/attachcust?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  confirmtopro(Modelname, id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/confirmtopro?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  reconfirm(id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustProductDetailInfo/reconfirm?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  fillcspec(id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustClassifyProductInfo/fillcspec?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  fillprodetail(id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustClassifyProductInfo/fillprodetail?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  copyHsconfig(id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustClassifyProductInfo/copyHsconfig?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  fillallprodetail() {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustClassifyProductInfo/fillallprodetail`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  fillpracname(custid) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustClassifyProductInfo/fillpracname?id=${custid}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  fillfake(custid) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustClassifyProductInfo/fillfakegoodsname?id=${custid}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  searchunit(condition) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/ciq2edi/getallUnit`, condition).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  // searchprintpdf(id) {
  //   const defer = this.$q.defer();
  //   this.$http.get(`http://192.168.0.72:4001/api/custinfos/downloadxsfp?ie_flag=%27A%27&ywinfoid=${id}`).then(resp => {
  //     defer.resolve(resp);
  //   }, err => {
  //     defer.reject(err);
  //   });
  // }
  syntemj(Modelname, custid) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/syntemj?id=${custid}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  jsonfrommd(Modelname, custid) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/jsonfrommd?id=${custid}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  syntemjlocalsingle(Modelname, id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/syntemjlocalsingle?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  saveopetempjson(id, json) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/CustProductDetailInfocopy/saveopetempjson?id=${id}`, json).then(resp => {
      defer.resolve(resp.data);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  refreshmd5andlink(Modelname, id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/refreshmd5andlink?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  manualattachcust(Modelname, id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/manualattachcust?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  filllastcspec(Modelname, id) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/filllastcspec?id=${id}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  backautojudgeinfo(Modelname) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/backautojudgeinfo`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  productmovetofin(Modelname) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/${Modelname}/productmovetofin`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  confirmtoprototal() {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustProductDetailInfocopy/confirmtoprototal`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  fillallcspec(custid) {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/CustClassifyProductInfo/fillallcspec?id=${custid}`).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
}

export const CommonUtilsService = CommonUtilsServices;
