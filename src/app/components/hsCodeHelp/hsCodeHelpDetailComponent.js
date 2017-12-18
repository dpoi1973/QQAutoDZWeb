import baseDetailComponent from '../../basejs/basetwo.js';
class HsCodeHelpDetailComponentController extends baseDetailComponent {
    // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $uibModal) {
    super($log, CommonUtilsService, 'ClassifyInfo', $stateParams.id);
    this.$log = $log;
    this.$uibModal = $uibModal;
    this.getdetailinfo();
  }
  beCustidSelected(item, model) {
    this.detailInfoData.HSCode = item.HSCode;
  }
  searchAsyncHScode(query) {
    this.$log.log(query);
    const tthis = this;
    this.custsearchCondition = {condition: {HScode: query, GName: ''}, pageIndex: 1, sortby: "", pageSize: 10};
    this.CommonUtilsService.getSearchList('ClassifyInfo', this.custsearchCondition)
      .then(results => {
        this.$log.log(results);
        tthis.selsource = results.datas;
      });
  }
  showtemplatejsonceshi() {
    this.$log.log("ceshi");
    document.getElementById('myModaloneceshi').style.opacity = 2; //eslint-disable-line
    document.getElementById('myModaloneceshi').style.display = 'block'; //eslint-disable-line
  }
  closetemp() {
    document.getElementById('myModaloneceshi').style.display = 'none'; //eslint-disable-line
  }

  guilei(Hscode) {
    const _this = this;
    const item = this.detailInfoData.Cspec;
    this.$log.log(item);
    const modalInstance = _this.$uibModal.open({
      component: 'cspeccomponent',
      resolve: {
        items: () => {
          return item;
        }
      },
      backdrop: false
    });
  }
}

export const hscodehelpdetailcomponent = {
  template: require('./hsCodeHelpDetailComponent.html'),
  controller: HsCodeHelpDetailComponentController
};

