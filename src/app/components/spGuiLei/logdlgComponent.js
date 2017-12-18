class LogdlgComponentController {
  // @ngInject
  constructor(CommonUtilsService, $log, $sce, $timeout) {
    this.$timeout = $timeout;
    this.$log = $log;
    const _this = this;
    this.$onInit = function () {
      const items = this.resolve.items;
      const gname = this.resolve.gname;
      const tempJson = this.resolve.tempJson;
      const SKU = this.resolve.SKU;
      const currsel = this.resolve.currsel;
      let Cspec = this.resolve.Cspec;
      this.$log.log(this.resolve);
      this.$log.log(items);
      if (Cspec === null) {
        Cspec = "";
      }
      this.Cspec = Cspec;
      this.curbasenode = null;
      this.curcursor = -1;
      this.idarray = [];
      this.curarray = [];
      const structlist = Cspec.split("|");
      this.tempJson = {};
      if (tempJson !== null && tempJson !== "") {
        this.tempJson = tempJson;
      }
      this.hsmodel = [];
      const _this = this;
      for (let i = 0; i < items.length; i++) {
        const model = {};
        if (i === 0) {
          model.title = items[i].name;
          model.content = gname;
        } else {
          let cot = "";
          if (structlist.length > i) {
            cot = structlist[i];
          }
          model.title = items[i].name;

          const editval = structlist[i].replace(/{{.*?}}/g, word => {
            const key = word.replace(/{/g, "").replace(/}/g, "");
            let obj = "";
            if (_this.tempJson[key] instanceof Array) {
              obj = `<select id='${key}'>`;
              for (let i = 0; i < _this.tempJson[key].length; i++) {
                this.$log.log("*****");
                this.$log.log(_this.tempJson[key][i]);
                if (currsel && _this.tempJson[key][i] === currsel[key]) {
                  obj += `<option selected = "selected"  value='${_this.tempJson[key][i]}'>${_this.tempJson[key][i]}</option>`;
                } else {
                  obj += `<option  value='${_this.tempJson[key][i]}'>${_this.tempJson[key][i]}</option>`;
                }
              }
              obj += "</select>";
            } else {
              if (key.indexOf('型号') !== -1) {
                _this.tempJson[key] = SKU;
              }
              obj = `<input id='${key}'  value='${_this.tempJson[key]}'/>`;
            }
            return obj;
          });

          model.content = $sce.trustAsHtml(editval);
        }

        this.hsmodel.push(model);
      }
    };
  }

  ok() {
    // var hode = "";
    // this.hsmodel.forEach(function (ele) {
    //     if (ele.title != "品名") {
    //         hode += ("|" + ele.content);
    //     }

    // }, this);
    const finresult = {};
    // finresult.hode = hode;
    // finresult.tempJson = this.tempJson;

    let Cspec = this.Cspec;
    // finresult.Cgoodsname = this.hsmodel[0].content;
    finresult.templateJson = {};
    for (const key in this.tempJson) {   // eslint-disable-line 
      finresult.templateJson[key] = document.getElementById(key).value; // eslint-disable-line 
      Cspec = Cspec.replace(`{{${key}}}`, finresult.templateJson[key]);
    }
    finresult.Cspec = Cspec;

    this.close({$value: finresult});
    this.close({$value: ""});
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }
}

export const logdlgcomponent = {
  template: require('./logmodal.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: LogdlgComponentController
};
