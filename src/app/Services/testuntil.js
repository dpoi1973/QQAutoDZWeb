class GuileiUtilsService extends baseRESTService {
  constructor($q, $http, $uibModal) {
    super($q, $http);
    this.$uibModal = $uibModal;
  }
}
angular
  .module('app')
  .service('GuileiUtilsService', GuileiUtilsService);
