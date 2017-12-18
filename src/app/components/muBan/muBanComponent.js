import baseGridComponent from '../../basejs/baseGrid.js';
class MuBanComponentController extends baseGridComponent {
  // @ngInject
  constructor(GridOptionService, CommonUtilsService, $log, $scope, $state, $http, $uibModal) {
    super($log, 'TemplateFormHead', GridOptionService, CommonUtilsService, $scope);
    this.searchCondition = {condition: {TempleteName: ''}, pageIndex: 1, sortby: 'LastUpdateDate DESC', pageSize: 25};
    this.$scope = $scope;
    this.$uibModal = $uibModal;
    this.search();
    this.$state = $state;
    this.$http = $http;
  }
  initgridCellTemplate(columelist) {
    columelist[0].cellTemplate = '<ui><a  ui-sref="muBan.detail({id:row.entity.id})">{{row.entity.TempleteName}} </a></ui>';
  }
  saveas() {
    if (this.gridApi.selection.getSelectedRows().length < 1) {
      document.getElementById('myModal').style.opacity = 2; // eslint-disable-line 
      document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
      this.text = "请选择相应报关单";
    } else {
      document.getElementById('myModal').style.opacity = 2; // eslint-disable-line
      document.getElementById('myModal').style.display = 'block'; // eslint-disable-line
      document.getElementById('okbtn').style.display = "inline-block"; //eslint-disable-line
      this.text = "确定另存为？";
    }
  }
  okbtn() {
    const tthis = this;
    this.detailall((err, data) => { // eslint-disable-line
      if (data === "ok") {
        this.text = "删除成功";
      } else {
        this.text = "删除失败";
      }
      tthis.search();
    });
    document.getElementById('okbtn').style.display = "none"; //eslint-disable-line
  }
  close() {
    document.getElementById('myModal').style.display = 'none'; //eslint-disable-line
    this.text = "";
  }
  newmoban() {
    const tthis = this;
    this.CommonUtilsService.createDetailByModelName('TemplateFormHead').then(data => {
      alert("新建成功");  // eslint-disable-line no-alert
      tthis.detailInfoData = data.data;
      tthis.$log.log(tthis.detailInfoData);
      this.$state.go('muBan.detail', {id: tthis.detailInfoData.id});
    });
  }
}

export const mubancomponent = {
  template: require('./muBanComponent.html'),
  controller: MuBanComponentController
};

