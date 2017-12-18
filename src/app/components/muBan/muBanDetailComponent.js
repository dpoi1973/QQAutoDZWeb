import baseDetailComponent from '../../basejs/basetwo.js';
class MuBanDetailComponentController extends baseDetailComponent {
      // @ngInject
  constructor(CommonUtilsService, $stateParams, $log, _, $state) {
    super($log, CommonUtilsService, 'TemplateFormHead', $stateParams.id);
    this.searchCondition = {condition: {fieldName: '', defaultValue: ''}, filename: '', pageIndex: 1, pageSize: 20};
    this.getdetailinfo();
    this._ = _;
    this.$log.log(this.detailInfoData);
    this.defaltid = 1;
    const _this = this;
    this.$state = $state;
    this.gridOptions = {
      columnDefs: [
                {name: '名称', field: 'templeteElementName'},
                {name: '字段名', field: 'fieldName'},
        {
          name: '可读名称', field: 'fieldReadName'
        },
                {name: '默认值', field: 'defaultValue'},
        {
          name: '可修改', field: 'canModify'
        },
                {name: '备注', field: 'templeteElementMemo'},
                {name: 'required', field: 'required', type: 'boolean'},
                {name: 'modified', field: 'recordUpdateFlag'},
                {name: 'Regex', field: 'Regex'},
                {name: 'id', field: 'id'}
      ]
    };
  }

  search() {
    const _this = this;
    const result = this._.filter(this.detailInfoData.formheadElements, ele => {
           // if (ele.defaultValue,ele.fieldName) {
      return ele.fieldName.indexOf(_this.fieldName) !== -1;
          //  }
    });
    this.gridOptions.data = result;
  }

  afterDetailinit() {
    this.$log.log(this.detailInfoData.formheadElements);
    this.gridOptions.data = this.detailInfoData.formheadElements;
  }
  Add() {
    const element = {
      serialno: this.detailInfoData.formheadElements.length,
      templeteElementName: "字段默认值",
      fieldName: "",
      fieldReadName: "",
      defaultValue: "",
      canModify: "false",
      templeteElementMemo: "模板的描述信息",
      Regex: "",
      id: this.defaltid * -1,
      selectedList: "",
      required: 0,
      eventStr: "",
      arrayFieldname: "",
      owner: this.detailInfoData.id
    };
    this.detailInfoData.formheadElements.push(element);
    this.gridOptions.data = this.detailInfoData.formheadElements;
    this.defaltid += 1;
  }
  savedetail() {
    this.savedetailInfo();
  }
  delete() {
    // const tthis = this;
    // /* eslint handle-callback-err: ["error", "error"]*/
    // this.deleteone((err, data) => {
    //   tthis.searchCondition.condition.id = tthis.detailID;
    //   tthis.search();
    //         // delete tthis.searchCondition.condition.id;
    // });
    this.CommonUtilsService.deleteDetailByModelName(this.ModelName, this.detailInfoData.id).then(obj => {
      this.$log.log("删除成功");
    }).catch(err => {
      this.$log.log(err);
      this.$log.log("删除失败");
    });
  }
  saveas() {
    const tthis = this;
    tthis.$log.log(this.detailInfoData);
    delete this.detailInfoData.id;
    this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); //eslint-disable-line
      this.$log.log(data.data);
      tthis.detailInfoData = data.data;
      this.$log.log(tthis.detailInfoData.id);
    });
    this.$log.log(tthis.detailInfoData.id);
    // tthis.$state.go('muBan.detail', {id: tthis.detailInfoData.id});
  }
}

export const mubandetailcomponent = {
  template: require('./muBanDetailComponent.html'),
  controller: MuBanDetailComponentController
};

