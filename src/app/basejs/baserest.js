export default class baseRESTService {
  constructor($q, $http) {
      // @ngInject
    this.$http = $http;
    this.$q = $q;
  }
  doGet(geturl) {
    const defer = this.$q.defer();
    this.$http.get(geturl).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  doPost(posturl, postdata) {
    const defer = this.$q.defer();
    this.$http.post(posturl, postdata).then(resp => {
      defer.resolve(resp);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }
}
