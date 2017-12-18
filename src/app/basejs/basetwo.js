export default class baseDetailComponent {
  constructor($log, CommonUtilsService, ModelName, detailID, $state, $uibModal) {
    this.ModelName = ModelName;
    this.$log = $log;
    this.$state = $state;
    this.CommonUtilsService = CommonUtilsService;
    this.$uibModal = $uibModal;
    this.detailInfoData = {};
    this.detailInfo = {};
    this.printunit = {};
    this.detailID = detailID;
  }
  afterDetailinit() {
  }
  getdetailinfo() {
    const tthis = this;
    this.CommonUtilsService.getDetailbyiModelId(this.ModelName, this.detailID).then(data => {
      this.$log.log('detail');
      this.$log.log(data);
      tthis.detailInfoData = data.data;
      this.afterDetailinit();
    });
  }

  getdetailinfoone() {
    const tthis = this;
    this.CommonUtilsService.getDetailbyiModelId(this.ModelName, this.detailID).then(data => {
      tthis.detailInfo = data.data;
      tthis.printunit = data.data;
    });
  }
  baoguandanprint() {
    const tthis = this;
    // this.printunit = this.detailInfo;
    this.$log.log(2222222222);
    this.$log.log(tthis.printunit);
    for (let i = 0; i < this.printunit.formlist.length; i++) {
      this.CommonUtilsService.sendvalidatevalue('unit', this.printunit.formlist[i].unit_1).then(data => {
        this.printunit.formlist[i].unit_1 = data.data;
      });
    }
  }
  savedetailInfo() {
    const tthis = this;
    if (this.detailID > 0) {
      this.$log.log(this.ModelName);
      this.$log.log(this.detailID);
      this.$log.log(this.detailInfoData);
      this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
        this.$log.log(data.data);
        this.text = "保存成功";
        this.$uibModal.open({
          component: 'templatetext',
          resolve: {
            items: () => {
              return this.text;
            }
          }
        });
        tthis.detailInfoData = data.data;
      });
    } else {
      delete this.detailInfoData.id;
      this.$log.log(this.detailInfoData);
      this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); //eslint-disable-line
        tthis.detailInfoData = data.tata;
      });
    }
  }

  spxinxisavedetailInfo() {
    const tthis = this;
    this.$log.log(this.detailID);
    this.detailInfoData.status = '未归类';
    if (this.detailID > 0) {
      this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
        alert("保存成功！");  // eslint-disable-line no-alert
        tthis.detailInfoData = data.data;
        tthis.$log.log(tthis.detailInfoData);
      });
    } else {
      delete this.detailInfoData.id;
      this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); //eslint-disable-line
        this.$log.log(data.data);
        tthis.detailInfoData = data.data;
        this.$log.log(data.data.id);
        this.$state.go('spXinXi.detail', {id: data.data.id});
      });
    }
  }
  spguileisavedetailInfo() {
    const tthis = this;
    this.$log.log(this.detailID);
    this.$log.log(this.detailInfoData);
    if (this.detailID > 0) {
      this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
        alert("保存成功！");  // eslint-disable-line no-alert
        tthis.detailInfoData = data.data;
        tthis.$log.log(tthis.detailInfoData);
      });
    } else {
      delete this.detailInfoData.id;
      this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); // eslint-disable-line
        this.$log.log(data.data);
        tthis.detailInfoData = data.data;
        this.$log.log(data.data.id);
        this.$state.go('spGuiLei.detail', {id: data.data.id});
      });
    }
  }
  afterdetailsearch(zdoctype) {
    this.$log.log("in condition");
    const tthis = this;
    this.CommonUtilsService.getSearchList("Docinfo", {condition: {doctype: zdoctype, parentid: this.detailInfoData.proxyid}, pageIndex: 1, pageSize: 20}).then(data => {
      this.$log.log(data);
      tthis.gridOptions.data = data.datas;
    });
  }
  afterdetailsearchclass() {
    this.$log.log("in condition");
    const tthis = this;
    this.CommonUtilsService.getSearchList("Docinfo", {condition: {doctype: "数据归档", parentid: this.detailInfoData.id}, pageIndex: 1, pageSize: 20}).then(data => {
      this.$log.log(data);
      tthis.gridOptions.data = data.datas;
    });
  }
        /*eslint-disable*/
  open(verb, url, data, target) {
    const form = document.createElement("form");
    form.action = url;
    form.method = verb;
    form.target = target || "_self";
    if (data) {
        const input = document.createElement("input");
        input.name = "liwei";
        input.type = 'hidden';
        input.value =  JSON.stringify(data);
        form.appendChild(input);
    }
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
  }
}
