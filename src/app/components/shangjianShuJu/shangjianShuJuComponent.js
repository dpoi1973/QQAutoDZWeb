import baseGridComponent from '../../basejs/baseGrid.js';
class ShangjianShuJuComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state) {
    super($log, 'dcl_b_io_decl', GridOptionService, CommonUtilsService, $scope);
    // this.searchCondition = {condition: {Ent_Decl_No: '', Decl_No: ''}, pageIndex: 1, pageSize: 20};
    this.searchCondition = {condition: {createdAt: {startdate: this.translateDateToStr(this.dt), enddate: this.translateDateToStr(this.enddt)}}, pageIndex: 1, pageSize: 20};
    this.$scope = $scope;
    this.search();
    this.$state = $state;
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a ui-sref="shangjianShuJu.detail({id: row.entity.id})">{{row.entity.Ent_Decl_No}} </a></ui>';
  }
  translateDateToStr(dt) {
    if (!dt) {
      return '';
    }
    const time = new Date(dt);
    const year = time.getFullYear();
    const month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`;
    const day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
    const dateStr = `${year}-${month}-${day}`;
    return dateStr;
  }
  Send() {
    alert('sendciq');// eslint-disable-line
    const tthis = this;
    const selectids = this.gridApi.selection.getSelectedRows();
    console.log(selectids);// eslint-disable-line
    this.CommonUtilsService.sendciq(selectids).then(obj => {
      alert('ok');// eslint-disable-line
    }).catch(err => {
      alert(err);// eslint-disable-line
    });
  }
}

export const shangjianshujucomponent = {
  template: require('./shangjianShuJuComponent.html'),
  controller: ShangjianShuJuComponentController
};

