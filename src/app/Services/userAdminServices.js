const APPAPI = '/api';
import baseRESTServices from '../basejs/baserest.js';
class UserAdminServices extends baseRESTServices {
  // @ngInject
  constructor($http, $q) {
    super($q, $http);
  }
  getList() {
    const defer = this.$q.defer();
    this.$http.get(`${APPAPI}/openuser`).success(resp => {
      defer.resolve(resp);
    }).error(err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  updateOpenUserInfo(userinfo) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/openuser/confirmstatus`, userinfo).success(resp => {
      defer.resolve(resp);
    }).error(err => {
      defer.reject(err);
    });
    return defer.promise;
  }
  updateRoleInfo(roleinfo) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/ActionAuth/createUpdateRole`, roleinfo).success(resp => {
      defer.resolve(resp);
    }).error(err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  updateUserInfo(userinfo) {
    const defer = this.$q.defer();
    this.$http.post(`${APPAPI}/ActionAuth/createUpdateUser`, userinfo).success(resp => {
      defer.resolve(resp);
    }).error(err => {
      defer.reject(err);
    });
    return defer.promise;
  }
}

// angular
//     .module('app')
//     .service('UserAdminServices', UserAdminServices);
export const UserAdminService = UserAdminServices;
