class hsCodeCspecmodelcomponentController {
  // @ngInject
  constructor(CommonUtilsService, $log, $window, $scope, $timeout) {
    this.$timeout = $timeout;
    this.$log = $log;
    this.$scope = $scope;
    this.$window = $window;
    this.CommonUtilsService = CommonUtilsService;
    this.curbasenode = null;
    this.curcursor = -1;
    this.idarray = [];
    this.curarray = [];
    this.testarr = [];
    this.focusIndex = this.testarr.length - 1;
    const _this = this;
    this.$onInit = function () {
      this.items = this.resolve.items;
      this.gname = this.resolve.gname;
     // this.proinfoconfig = this.resolve.proinfoconfig;
      this.Cspec = this.resolve.Cspec ? this.resolve.Cspec : "";
      this.curbasenode = null;
      this.curcursor = -1;
      this.idarray = [];
      this.curarray = [];
      const structlist = this.Cspec.split("|");
      this.tempJson = {};
      this.hsmodel = [];
    //   this.obj = {
    //     材质: "[mainmaterial]", 男式女式: "[Gender]", 中文品名: "[CProductName]", 主要材质: "[maincomp]", 织造方法: "[TARIFF_GROUP]", 品牌: "[Brand]", 成分含量: "[mainmaterial]", 品名: "[CProductName]", 货号: "[sku]", 是否镀贵金属: "未归类", 鞋面材料: "[maincomp]", 鞋底材料: "未归类", 包面材料: "[maincomp]", 制作工艺: "未归类", 有无衣领门襟: "有无衣领门襟(未归类)", 背心内穿: "背心内穿(未归类)"};
      this.sel = [];
      this.selindex = 0;
      const _this = this;
      for (let i = 0; i < this.items.length; i++) {
        const model = {};
        model.index = i;
        if (i === 0) {
          model.title = this.items[i].name;
          model.content = structlist[i];
        } else {
          let cot = "";
          if (structlist.length > i) {
            cot = structlist[i];
          }
          model.title = this.items[i].name;
          if (structlist[i]) {
            model.content = structlist[i];
          } else {
            model.content = '';
          }
        }
        this.hsmodel.push(model);
      }
    };
  }

  /*eslint-disable */
  insert(e) {
     var keycode = window.event?e.keyCode:e.which;
      const currrange = this.$window.getSelection();
      this.curcursor = currrange.focusOffset;
      this.curbasenode = currrange.baseNode;
      var curdata=this.curbasenode.data;
      console.log(this.curcursor);
      console.log(this.curbasenode);
      if(document.getElementById('auto').style.display == 'none'){
        this.sel=[];
        this.selindex=0;  
      }
      else{
        if( this.sel.length>0){
          this.sel.forEach(sel=>{
              sel.selcli='';
          })
        }
      }
    //   if(keycode!=38&&keycode!=40&&keycode!=13){
    //     if(curdata.lastIndexOf('[',this.curcursor-1)!=-1&&curdata.lastIndexOf(']',this.curcursor-1)<curdata.lastIndexOf('[',this.curcursor-1)){
    //         var condition=curdata.substring(curdata.lastIndexOf('[',this.curcursor-1)+1,this.curcursor);
    //         var keep=this.sel.length;
    //         this.sel=[];
    //         for (const key in this.obj) {
    //             this.$log.log("item");
    //             this.$log.log(key);
    //             if(key.indexOf(condition)!=-1){
    //                 var selobj={};
    //                 selobj.key=key;
    //                 selobj.selcli='';
    //                 this.sel.push(selobj);
    //             }
    //         }
    //         if(keep != this.sel.length){
    //             if(this.sel.length>0){
    //                 this.selindex=0;
    //                 this.sel[this.selindex].selcli='selcli';
    //             }
    //         }
    //         else{
    //             this.sel[this.selindex].selcli='selcli';
    //         }
    //         this.sel=this.sel.slice(0, 5);
    //         document.getElementById('auto').style.display = 'block';
    //     }
    //     else{
    //         this.selindex=0;
    //         document.getElementById('auto').style.display = 'none';
    //     }
    //   }
    //   else{
    //       if(document.getElementById('auto').style.display == 'block' && this.sel.length>0){
    //       if(keycode==38){// 向上减1
    //           this.sel[this.selindex].selcli='';
    //           if(this.selindex>0){
    //               this.selindex--;
    //           }
    //           else{
    //               this.selindex=this.sel.length-1;
    //           }
    //           this.sel[this.selindex].selcli='selcli';
    //       }
    //       if(keycode==40){// 向下加1
    //           this.sel[this.selindex].selcli='';
    //          if(this.selindex<this.sel.length-1){
    //               this.selindex++;
    //           }
    //           else{
    //               this.selindex=0;
    //           }
    //           this.sel[this.selindex].selcli='selcli';
    //       }
        
    //     if(keycode==13){
    //         var lefthand=curdata.lastIndexOf('[',this.curcursor-1);
    //         var righthand_comp=curdata.indexOf('[',this.curcursor);
    //         var righthand=curdata.indexOf(']',this.curcursor)==-1||curdata.indexOf(']',this.curcursor)>righthand_comp?this.curcursor:curdata.indexOf(']',this.curcursor);
    //         var leftstr=curdata.substring(0,lefthand+1);
    //         var rightstr=curdata.substring(righthand);
    //         if(rightstr.substring(0,1)==']'){
    //             rightstr=rightstr.substring(1);
    //         }
    //         var selitem= this.sel[this.selindex].key;
    //         curdata=leftstr+selitem+']'+rightstr;
    //         this.curcursor=lefthand+selitem.length+2;
    //         document.getElementById('auto').style.display = 'none';
    //             e.currentTarget.innerText=curdata;
    //             this.$log.log(this.hsmodel[this.index].title);
    //             var el = document.getElementById(this.hsmodel[this.index].title);
    //             var range = document.createRange();
    //             var sel = window.getSelection();
    //             range.setStart(el.childNodes[0], this.curcursor);
    //             range.collapse(true);
    //             sel.removeAllRanges();
    //             sel.addRange(range);
    //             el.focus();
    //         }
    //         // 渲染在移动光标之后  渲染移动光标之后
    //         // this.hsmodel[this.index].content=curdata;
    //       }
    //   }
  }

  down(e){
      //阻止事件必须在keydown中 字符处理必须在keyup中
      var keycode = window.event?e.keyCode:e.which;
      if(keycode==38||keycode==40||keycode==13){
         e.preventDefault();
      }
  }

  selop(item){
    var el = document.getElementById(this.hsmodel[this.index].title);
    var curdata=el.innerText;
    var lefthand=curdata.lastIndexOf('[',this.curcursor-1);
    var righthand_comp=curdata.indexOf('[',this.curcursor);
    var righthand=curdata.indexOf(']',this.curcursor)==-1||curdata.indexOf(']',this.curcursor)>righthand_comp?this.curcursor:curdata.indexOf(']',this.curcursor);
    var leftstr=curdata.substring(0,lefthand+1);
    var rightstr=curdata.substring(righthand);
    if(rightstr.substring(0,1)==']'){
       rightstr=rightstr.substring(1);
    }
    var selitem= item.key;
    curdata=leftstr+selitem+']'+rightstr;
    this.curcursor=lefthand+selitem.length+2;
    document.getElementById('auto').style.display = 'none';
    el.innerText=curdata;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[0], this.curcursor);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }

  move(item){
    this.sel.forEach(se=>{
        se.selcli='';
        if(se.key==item.key){
            se.selcli='selcli';
        }
    })
  }

  onblur(e){
    //   var curdata=e.currentTarget.outerText;
    //   this.hsmodel[this.index].content=curdata;
  }

  getCurRange(index) {
    const currrange = this.$window.getSelection();
    this.curcursor = currrange.focusOffset;
    this.curbasenode = currrange.baseNode;
    this.index=index;
  }

  /*eslint-disable */
  ok() {
      const finresult = {};
      finresult.hode = this.Cspec;
      this.close({ $value: finresult });
  }
  oktextarea() {
            let hode = "";
      this.hsmodel.forEach(ele => {
        // if (ele.title !== "品名") {
            var content= document.getElementById(ele.title);
            if(content.outerText){
                hode += (`|${content.outerText}`);
            }
            else{
                hode +=`|`;
            }
        // }
      }, this);
      const finresult = {};
      finresult.hode = hode.substr(1);
      this.close({ $value: finresult });
  }
  cancel() {
      this.dismiss();
  }

}
export const hsCodeCspecmodelcomponent = {
  template: require('./hsCodeCspecmodel.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: hsCodeCspecmodelcomponentController
};