import baseGridComponent from '../../basejs/baseGrid.js';
class ShangjianShuJuComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http) {
    super($log, 'dcl_b_io_decl', GridOptionService, CommonUtilsService, $scope, $http);
    this.$scope = $scope;
    this.$http = $http;
    this.search();
    this.$state = $state;
    this.options = {
      customClass: this.getDayClass,
      minDate: new Date(),
      showWeeks: true
    };
    this.popup2 = {
      opened: false
    };
    // ----------
    this.endoptions = {
      customClass: this.getDayClass,
      minDate: new Date(),
      showWeeks: true
    };
    this.endpopup2 = {
      opened: false
    };
  }
  initgridCellTemplate(columelist) {
    columelist[1].cellTemplate = '<ui><a ui-sref="shangjianShuJu.detail({id: row.entity.id})">{{row.entity.Ent_Decl_No}} </a></ui>';
  }
  open() {
    this.popup2.opened = true;
  }
  endopen() {
    this.endpopup2.opened = true;
  }
  getDayClass(data) {
    const date = data.date;
    const mode = data.mode;
    if (mode === 'day') {
      const dayToCheck = new Date(date).setHours(0, 0, 0, 0);
    }
    return '';
  }
  // searchByDate() {
  //   this.$log.log(this.dt);
  // }
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
  Delete() {
    const id = this.selectId;
    const _this = this;
    this.CommonUtilsService.deleteDanzheng(id)
      .then(result => {
        if (result === 'OK') {
          _this.search();
        }
      });
  }
  Detail() {
    const id = this.selectId;
    const _this = this;
    this.CommonUtilsService.getDetail(id)
      .then(result => {
        _this.detailData = result;
      });
  }
  search() {
    this.searchCondition.condition = {createdAt: {startdate: this.translateDateToStr(this.dt), enddate: this.translateDateToStr(this.enddt)}};
    this.CommonUtilsService.getSearchList(this.ModelName, this.searchCondition)
      .then(results => {
        this.gridOptions.totalItems = results.totalCount;
        this.listData = results.datas;
        this.gridOptions.data = this.listData;
      }).catch(err => {
        this.$log.log(err);
      });
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
  template: require('./SJComponent.html'),
  controller: ShangjianShuJuComponentController
};
