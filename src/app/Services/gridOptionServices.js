const ENDPOINT_URI = '/api/remote/';
const APPNAME = 'Quanqiuauto';
class GridOptionServices {
  // @ngInject
  constructor($q, $http, $log) {
    this.$q = $q;
    this.$http = $http;
    this.$log = $log;
    this.APPNAME = APPNAME;
    this.ENDPOINT_URI = ENDPOINT_URI;
  }
  getModelOpitons(modelname) {
    const searchmodel = {applicationName: this.APPNAME, gridModelName: modelname};
    const defer = this.$q.defer();
    this.$http.get(`${this.ENDPOINT_URI}gridoptions/getoptionsbyModel?modelName=${encodeURI(angular.toJson(searchmodel))}`).then(resp => {
      defer.resolve(resp.data);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
}
export const GridOptionService = GridOptionServices;
