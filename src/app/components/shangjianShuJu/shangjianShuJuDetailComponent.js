import baseDetailComponent from '../../basejs/basetwo.js';
class ShangjianShuJuDetailComponentController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsServices, $stateParams, $log) {
    super($log, CommonUtilsServices, 'dcl_b_io_decl', $stateParams.id);
    this.getdetailinfo();
    this.$log.log(this.detailInfoData);
  }
}

export const shangjianshujudetailcomponent = {
  template: require('./shangjianShuJuDetailComponent.html'),
  controller: ShangjianShuJuDetailComponentController
};

