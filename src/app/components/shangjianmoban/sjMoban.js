import baseDetailComponent from '../../basejs/basetwo.js';
import './sjMoban.css';
class sjMobanController extends baseDetailComponent {
  // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, $uibModal) {
    super($log, CommonUtilsService, 'TemplateFormHead', $stateParams.id);
    this.getdetailinfo();
    this.$log = $log;
    this.$uibModal = $uibModal;
    this.templatevalidate = {
    };
    this.temparr = [];
    this.test = {};
  }
  getformheadtem() {
    const tthis = this;
    this.CommonUtilsService.getformheadtemplatevalidate(this.detailInfoData.TempleteName).then(resp => {
      tthis.templatevalidate = resp.data;
      this.$log.log(tthis.templatevalidate.ciqObj);
      for (const key in tthis.templatevalidate.ciqObj) {
        if (typeof tthis.templatevalidate.ciqObj[key] == 'object') { //eslint-disable-line
          tthis.templatevalidate.ciqObj[key] = {
            value: tthis.templatevalidate.ciqObj[key].value,
            required: null,
            readonly: null,
            Regex: null
          };
        } else {
          tthis.templatevalidate.ciqObj[key] = {
            value: tthis.templatevalidate.ciqObj[key],
            required: null,
            readonly: null,
            Regex: null
          };
        }
      }
    });
  }
  afterDetailinit() {
    this.getformheadtem();
  }
  savedetail() {
    const tthis = this;
    this.detailInfoData.ciqObj = this.templatevalidate.ciqObj;
    this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
      this.$log.log(data);
      this.text = "保存成功";
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
}

export const sjMobancomponent = {
  template: require('./sjMoban.html'),
  controller: sjMobanController
};

