class GuileiUtilsServices extends baseRESTService {
  // @ngInject
  constructor($q, $http, $uibModal, hsModalInstanceCtrl, logCtrl) {
    super($q, $http);
    this.$uibModal = $uibModal;
    this.logCtrl = logCtrl;
    this.hsModalInstanceCtrl = hsModalInstanceCtrl;
  }
  testalert($scope, uw, gname, productinfo) {
    if (productinfo == null) {
      productinfo = {};
      productinfo.tempJson = null;
      productinfo.Cspec = "";
    }
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'app/components/spGuiLei/myModalContent.html',
      controller: this.hsModalInstanceCtrl,

      resolve: {
        items: () => {

          return uw.TempJson;
        },
        gname: () => {
          return gname;
        },
        tempJson: () => {
          return productinfo.tempJson;
        },
        Cspec: () => {
          return productinfo.Cspec;
        }
      }
    });

    modalInstance.result.then(finresult => {

      console.log(finresult.tempjson);
      $scope.CustClassifyProductInfo.Cspec = finresult.hode;
      $scope.CustClassifyProductInfo.tempJson = finresult.tempjson;
      $scope.CustClassifyProductInfo.Cgoodsname = finresult.Cgoodsname;
    });
  }
  logmodal(uw, productinfo) {
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'app/components/spGuiLei/logmodal.html',
      controller: this.logCtrl,

      resolve: {
        items: () => {
          var total = {};
          total.uw = uw.TempJson;
          total.gname = productinfo.Cgoodsname;
          total.tempJson = productinfo.tempJson;
          total.cspec = productinfo.Cspec;
          return total;
        }
      }
    });
  }
}

angular
  .module('app')
  .service('GuileiUtilsServices', GuileiUtilsServices);
