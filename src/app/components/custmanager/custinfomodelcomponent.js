class custinfomodelComponentController {
  // @ngInject
  constructor(CommonUtilsService, $log, $window, $scope, $timeout) {
    this.$timeout = $timeout;
    this.$log = $log;
    this.$scope = $scope;
    this.$window = $window;
    this.allContent = {};
    this.CommonUtilsService = CommonUtilsService;
    this.$onInit = function () {
      this.items = this.resolve.items;
      this.hsmodel = [];
      for (const key in this.items) { //eslint-disable-line
        const model = {};
        model.title = key;
        model.content = this.items[key];
        this.hsmodel.push(model);
      }
      this.$log.log(this.hsmodel);
    };
  }
  /*eslint-disable */

  addhsmodel () {
      const model = [];
      model.title = "";
      model.content = "";
      this.hsmodel.push(model);
  }
  ok() {
      this.hode = [];
    for(var i=0; i<this.hsmodel.length; i++) {
          this.allContent[this.hsmodel[i].title] = this.hsmodel[i].title;
          if(this.allContent[this.hsmodel[i].title] == ""){
              delete this.allContent[this.hsmodel[i].title];
          }
    }
    const finresult = {};
    finresult.hode = this.allContent;
    if(JSON.stringify(finresult.hode) == "{}") {
        finresult.hode = null;
    }
    this.close({ $value: finresult });
  }
  cancel() {
      this.dismiss();
  }

}
export const custinfomodelcomponent = {
  template: require('./custinfomodelcomponent.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: custinfomodelComponentController
};