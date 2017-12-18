class ApplydlgComponentController {
  // @ngInject
  constructor(CommonUtilsService, $log, $window, $scope, $timeout) {
    this.$timeout = $timeout;
    this.$log = $log;
    this.$scope = $scope;
    this.$window = $window;
    this.CommonUtilsService = CommonUtilsService;
    //  const tempJson = this.resolve.tempJson;
    this.curbasenode = null;
    this.curcursor = -1;
    this.idarray = [];
    this.curarray = [];
    this.testarr = [];
    this.focusIndex = this.testarr.length - 1;
    const _this = this;
    this.$onInit = function () {
      _this.changeitems = _this.resolve.items;
      _this.items = _this.resolve.items;
      _this.gname = _this.resolve.gname;
      _this.Cspec = _this.resolve.Cspec;
      _this.Unit1 = _this.resolve.Unit1;
      _this.Unit2 = _this.resolve.Unit2;
      _this.ohscode = _this.resolve.ohscode;
      this.initmodel();
    };
  }
  initmodel() {
    // this.$log.log(this);
    if (this.Cspec === null) {
      this.Cspec = "";
    }
    const structlist = this.Cspec.split("|");
    this.tempJson = {};
    if (this.resolve.tempJson !== null && this.resolve.tempJson !== "") {
      this.tempJson = this.resolve.tempJson;
      this.tempJson = this.tempJson;
    }
    // this.itemlength = this.items.length;
    const outhtml = "<table id='Hsmodel'>";
    this.hsmodel = [];
    for (let i = 0; i < this.items.length; i++) {
      const model = {};
      if (i === 0) {
        model.title = this.items[i].name;
        model.content = this.gname;
        model.show = "display:none";
        model.read = false;
      } else {
        let cot = "";
        if (structlist.length > i) {
          cot = structlist[i];
        }
        model.title = this.items[i].name;
        model.content = cot;
        model.read = true;
        if (this.items[i].option != null && model.content == "") { //eslint-disable-line
          model.action = '嵌入信息';
          const _this = this;
          const replaceStr = "#";
          // this.$log.log(this.items[i].option);
          const option = this.items[i].option.replace(new RegExp(replaceStr, 'gm'), '');
          let hlid = 0;
          model.content = option.replace(/\(.*?\)/g, word => {
            hlid++;
            word = word.replace('(', '').replace(')', '');
            if (word.indexOf('、') !== -1) {
              const warray = word.split('、');
              const node = `{{sh${hlid}_${i}}}`;
              _this.tempJson[String(`sh${hlid}_${i}`)] = warray;
              return node;
            }
            const node = `{{sh${hlid}_${i}}}`;
            _this.tempJson[`sh${hlid}_${i}`] = "";
            return node;
          });
        } else {
          model.action = '嵌入信息';
          model.uw = "";
        }
        model.show = "display:block";
      }
      this.hsmodel.push(model);
    }
  }

  getCurRange() {
    const currrange = this.$window.getSelection();
    this.curcursor = currrange.focusOffset;
    this.curbasenode = currrange.baseNode;
  }
  /*eslint-disable */
  updateconfirm() {
    this.$log.log(document.getElementById('jsonkey'));
    const jid = document.getElementById('jsonkey').value;
    if (jid == "") {
      alert("名称不能为空");
      return;
    }
    const rowNum = document.getElementById('tokenoperate').rows.length;
    this.$log.log(document.getElementById('editid').value)
    if (document.getElementById('editid').value == "") {
      if (rowNum > 2) {
        if (this.idarray.indexOf(jid) == -1) {
          this.idarray.push(jid);
          this.curarray.push(jid);
        } else {
          alert("名称不能重复");
          return;
        }
        const mySelect = document.createElement("select");
        mySelect.id = document.getElementById('jsonkey').value;
        if (this.curcursor == -1) {
          document.getElementById('content').appendChild(mySelect);
          mySelect.onmouseup = this.bindedit;
          mySelect.oncontextmenu = function () {
            return false;
          };
        } else {
          this.addele(mySelect);
        }
        // 根据id查找对象，
        const obj = document.getElementById(document.getElementById('jsonkey').value);
        // const rowNum = document.getElementById('tokenoperate').rows.length;
        for (let op = 1; op < rowNum; op++) {
          const jsonvalue = document.getElementById(`option${op}`).value;
          // 添加一个选项
          if (jsonvalue != "" || op < 2) {
            obj.options.add(new Option(jsonvalue, jsonvalue)); // 这个兼容IE与firefox
          }
        }
      } else {
        if (this.idarray.indexOf(jid) == -1) {
          this.idarray.push(jid);
          this.curarray.push(jid);
        } else {
          alert("名称不能重复");
          return;
        }
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', document.getElementById('jsonkey').value);
        if (this.curcursor == -1) {
          document.getElementById('content').appendChild(input);
          input.onmouseup = this.bindedit;
          input.oncontextmenu = function () {
            return false;
          };
        } else {
          this.addele(input);
        }
        const jsonvalue = document.getElementById('option1').value;
        input.value = jsonvalue;
      }
    } else {
      const editid = document.getElementById('editid').value;
      if (jid !== editid) {
        if (this.idarray.indexOf(jid) == -1) {
          this.idarray.push(jid);
          this.idarray.remove(editid);
          this.curarray.push(jid);
          this.curarray.remove(editid);
        } else {
          alert("名称不能重复");
          return;
        }
      }
      if (rowNum > 2) {
        const mySelect = document.getElementById(editid);

        if (mySelect.nodeName == "SELECT") {
          mySelect.id = document.getElementById('jsonkey').value;

          mySelect.options.length = 0;

          // const rowNum = document.getElementById('tokenoperate').rows.length;

          for (let op = 1; op < rowNum; op++) {
            const jsonvalue = document.getElementById(`option${op}`).value;
            // 添加一个选项
            if (jsonvalue !== "" || op < 2) {
              mySelect.options.add(new Option(jsonvalue, jsonvalue)); // 这个兼容IE与firefox
            }
          }
        } else {
          const newSelect = document.createElement("select");
          newSelect.id = document.getElementById('jsonkey').id;
          const next = mySelect.nextSibling;
          if (next === null) {
            document.getElementById('content').removeChild(mySelect);
            document.getElementById('content').appendChild(newSelect);
            const rowNum = document.getElementById('tokenoperate').rows.length;

            for (let op = 1; op < rowNum; op++) {
              const jsonvalue = document.getElementById(`option${op}`).value;
              // 添加一个选项
              if (jsonvalue !== "" || op < 2) {
                newSelect.options.add(new Option(jsonvalue, jsonvalue)); // 这个兼容IE与firefox
              }
            }
          } else {
            document.getElementById('content').removeChild(mySelect);
            document.getElementById('content').insertBefore(newSelect, next);
            const rowNum = document.getElementById('tokenoperate').rows.length;

            for (let op = 1; op < rowNum; op++) {
              const jsonvalue = document.getElementById(`option${op}`).value;
              // 添加一个选项
              if (jsonvalue !== "" || op < 2) {
                newSelect.options.add(new Option(jsonvalue, jsonvalue)); // 这个兼容IE与firefox
              }
            }
          }
          newSelect.onmouseup = this.bindedit;
          newSelect.oncontextmenu = function () {
            return false;
          };
        }
      } else {
        const myInput = document.getElementById(editid);
        if (myInput.nodeName === "INPUT") {
          myInput.id = document.getElementById('jsonkey').value;
          myInput.value = document.getElementById('option1').value;
        } else {
          const newinput = document.createElement('input');
          newinput.setAttribute('type', 'text');
          newinput.setAttribute('id', document.getElementById('jsonkey').value);
          const next = myInput.nextSibling;
          if (next === null) {
            document.getElementById('content').removeChild(myInput);
            document.getElementById('content').appendChild(newinput);
            newinput.value = document.getElementById('option1').value;
          } else {
            document.getElementById('content').removeChild(myInput);
            document.getElementById('content').insertBefore(newinput, next);
            newinput.value = document.getElementById('option1').value;
          }
          newinput.onmouseup = this.bindedit;
          newinput.oncontextmenu = function () {
            return false;
          };
        }
      }
    }
    document.getElementById("overlay").style.visibility = "hidden";
    this.init();
    this.patchresult();
    this.testarr = [];
  }
  patchresult() {
    const result = document.getElementById('content').innerHTML;
    // console.log(result);
    const fir = result.replace(/"+/g, '').replace(/<option.*?>.*?<\/option>/g, '').replace(/<\/select>/g, '');
    // console.log(fir);
    const dc = fir.replace(/<.*?id=(.*?)>/g, "{{$1}}");
   // console.log(dc);
    document.getElementById('cspec').innerHTML = dc;

    const temparray = [];
    dc.replace(/{{.*?}}/g, word => {
      temparray.push(word.replace(/{/g, "").replace(/}/g, ""));
    });

    for (let i = 0; i < this.curarray.length; i++) {
      if (temparray.indexOf(this.curarray[i]) == -1) {
        this.idarray.remove(this.curarray[i]);
      }
    }
    this.curarray = temparray;
    this.curcursor++;
    this.curbasenode = document.getElementById('content');
  }
  init() {
    const rowNum = document.getElementById('tokenoperate').rows.length;
    for (let row = rowNum - 1; row > 1; row--) {
      document.getElementById('tokenoperate').deleteRow(row);
    }
    document.getElementById('jsonkey').value = "";
    document.getElementById('option1').value = "";
    document.getElementById('editid').value = "";
  }

  addele(ele) {
    const cursor = this.curcursor;
    if (this.curbasenode.nodeName === "DIV") {
      const clnodes = document.getElementById('content').childNodes;
      if (clnodes.length > cursor) {
        document.getElementById('content').insertBefore(ele, clnodes[cursor]);
      } else {
        document.getElementById('content').appendChild(ele);
      }
    } else {
      const next = this.curbasenode.nextSibling;
      const currtext = this.curbasenode.data;
      const beforetext = currtext.substring(0, cursor);
      const beforetextNode = document.createTextNode(beforetext);
      const aftertext = currtext.substring(cursor);
      const aftertextNode = document.createTextNode(aftertext);

      if (next !== null) {
        const currnode = next.previousSibling;
        document.getElementById('content').removeChild(currnode);

        document.getElementById('content').insertBefore(ele, next);
        document.getElementById('content').insertBefore(aftertextNode, next);
        document.getElementById('content').insertBefore(beforetextNode, ele);
      } else {
        const clnodes = document.getElementById('content').childNodes;
        if (clnodes.length > 0) {
          document.getElementById('content').removeChild(clnodes[clnodes.length - 1]);
        }
        document.getElementById('content').appendChild(ele);
        document.getElementById('content').appendChild(aftertextNode);
        document.getElementById('content').insertBefore(beforetextNode, ele);
      }
    }
    ele.onmouseup = this.bindedit;
    ele.oncontextmenu = function () {
      return false;
    };
  }

  addselect() {
    const el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility === "visible") ? "hidden" : "visible";
    this.testarr.push({id : 1});
  }
  testarrindex(arr, value) {
    for (var i = 0, vlen = arr.length; i < vlen; i++) {
      if (arr[i] == value) {
        return i;
      }
    }
    return -1;
  }
  addoption() {
    const cur = event.srcElement;
    if (document.getElementById('tokentype').innerHTML === "默认值：") {
      let rowNum = document.getElementById('tokenoperate').rows.length;
      const addid = event.srcElement.id.replace("option", "");
      const idarr = [];
      for( let i=0; i<this.testarr.length;i++){
        idarr.push(this.testarr[i].id);
      }
      const addindex = this.testarrindex(idarr, addid)
      
      if (event.keyCode === 13) {
        if (rowNum - 2 == addindex) {
          this.$log.log('最后一个了');
          const maxallid = [];
          for(let i =0; i < this.testarr.length; i++){
             maxallid.push(this.testarr[i].id);
          }
          this.$log.log(Math.max.apply(null, maxallid));
          const maxid = Math.max.apply(null, maxallid);
          this.testarr.push({id:maxid + 1});
          this.focusIndex = this.testarr.length - 1;
        } else {
          this.$log.log('不是最后一个');
          this.$log.log(this.testarr.length);
          const nextfocus = document.getElementById(`option${addid}`).parentNode.parentNode.nextSibling.nextSibling.getElementsByTagName('input');
          document.getElementById(nextfocus[0].id).focus();

        }
      }
      else if (event.keyCode === 8) {
            Array.prototype.remove = function (dx) {
              // const inputs = document.querySelectorAll('#tokenoperate input');
              // console.log(inputs);
              // const q = [];
              // for(var i = 1;i<inputs.length;i++){
              //    q.push(inputs[i]);
              // }
              // console.log(dx);
              // for(var i = 0;i<q.length;i++){
              //   const id = q[i].id.replace("option", "");
              //   if(id == dx){
              //     console.log(123123123);
              //     this.splice(i, 1);
              //     document.getElementById(`option${(i-1)}`).focus();
              //   }
              // }
            if (isNaN(dx) || dx > this.length) {
              return false;
            }
            for (let i = 0, n = 0; i < this.length; i++) {
              if (this[i] != this[dx]) {
                this[n++] = this[i];
              }
            }
            this.length -= 1;
          };
        if (cur.value === "" && cur.id !== "option1") {
          const curid = event.srcElement.id.replace("option", "");
             this.testarr.remove(addindex);
            //  this.idarr.remove(addindex);
             this.$log.log(this.idarr);
             this.$log.log(this.testarr.length);
            const prentsibling = document.getElementById(`option${addid}`).parentNode.parentNode.previousSibling;
            this.$log.log(prentsibling.previousSibling.getElementsByTagName('input'));
            const prentfocus = prentsibling.previousSibling.getElementsByTagName('input')
            document.getElementById(prentfocus[0].id).focus();
          // }
        }
      }
    }
  }


  /*eslint-disable */
  ok() {
    if (document.getElementById("Hsmodel").style.display !== 'none') {
      let hode = "";
      this.hsmodel.forEach(ele => {
        if (ele.title !== "品名") {
          hode += (`|${ele.content}`);
        }
      }, this);
      const finresult = {};
      finresult.hode = hode;
      finresult.tempJson = this.tempJson;
      finresult.Cgoodsname = this.hsmodel[0].content;
      finresult.changeitems = this.changeitems;
      this.close({ $value: finresult });
      finresult.Unit1=this.Unit1;
      finresult.Unit2=this.Unit2;
      this.close({$value: finresult});
    } else if (document.getElementById("guifan").style.display !== 'none') {
      const index = document.getElementById('index').value;
      const fra = document.getElementById('fra').value;
      const guifanresult = fra.replace(/\(.*?\)/g, word => {
        word = word.replace('(', '').replace(')', '');

        return document.getElementById(`sh${word}`).value;
      }
      );
      this.hsmodel.forEach(ele => {
        if (ele.title == index) {
          ele.content = guifanresult;
        }
        if (!ele.content) {
          ele.content = "";
        }
      });

      document.getElementById('Hsmodel').style.display = 'block';
      document.getElementById('guifan').style.display = 'none';
    } else {
      const index = document.getElementById('formatindex').value;
      const _this = this;
      this.hsmodel.forEach(ele => {
        if (ele.title == index) {
          ele.content = document.getElementById('cspec').innerHTML;
        }
        if (!ele.content) {
          ele.content = "";
        }
        const fomatval = ele.content;
        fomatval.replace(/{{.*?}}/g, word => {
          const key = word.replace(/{/g, "").replace(/}/g, "");
          const obj = document.getElementById(key);
          if (obj !== null) {
            if (obj.type === "text") {
              _this.tempJson[key] = obj.value;
            } else {
              _this.tempJson[key] = [];
              for (let opt = 0; opt < obj.length; opt++) {
                _this.tempJson[key].push(obj[opt].innerText);
              }
            }
          }
        });
      }, this);

      this.tempJson = this.tempJson;
      document.getElementById('content').innerHTML = "";
      document.getElementById('Hsmodel').style.display = 'block';
      document.getElementById('guifan').style.display = 'none';
      document.getElementById('formathtml').style.display = 'none';
    }
  }
  cancel() {
      if(document.getElementById('formathtml').style.display == 'block'){
      document.getElementById('Hsmodel').style.display = 'block';
      document.getElementById('guifan').style.display = 'none';
      document.getElementById('formathtml').style.display = 'none';
    } else {
      this.dismiss();
  }
  }
  canceltwo() {
    document.getElementById('modelid').style.display = "inline-block";
    document.getElementById('modelidtwo').style.display = "none";
    document.getElementById('Hsmodel').style.display = 'block';
    document.getElementById('formathtml').style.display = 'none';
    const finresult=this.ohscode;
   this.dismiss({$value:  finresult});
  }
  cancle() {
    const el = document.getElementById("overlay");
    el.style.visibility = "hidden";
    this.testarr = [];
    this.init()
  }
  apply(action, uw, content, untitle) {  
    const _this = this;
    const options = _this.hsmodel;
    if (action === '规范申报') {
      const td = document.getElementById('guifancontent');
      td.innerHTML = uw;
      document.getElementById('guifan').style.display = 'block';
      document.getElementById('Hsmodel').style.display = 'none';
      document.getElementById('index').value = untitle;
    } else {
      this.curbasenode = document.getElementById('content');
      if (this.tempJson !== null) {
        if (!content) {
          content = "";
        }
        let editval = content;
        // document.getElementById('content').innerHTML = editval;
        editval = editval.replace(/{{.*?}}/g, word => {
          const key = word.replace(/{/g, "").replace(/}/g, "");
          let obj = "";
          if (angular.isArray(_this.tempJson[key])) {
            obj = `<select  id='${key}'>`;
            for (let i = 0; i < _this.tempJson[key].length; i++) {
              obj += `<option value='${_this.tempJson[key][i]}'>${_this.tempJson[key][i]}</option>`;
            }
            obj += "</select>";
          } else {
            obj = `<input  value='${_this.tempJson[key]}'   id='${key}'  >`;
          }
          return obj;
        });
        document.getElementById('content').innerHTML = editval;
        const clnodes = document.getElementById('content').childNodes;
        for (let i = 0; i < clnodes.length; i++) {
          if (clnodes[i].nodeName == "SELECT" || clnodes[i].nodeName == "INPUT") {
            clnodes[i].oncontextmenu = function (e) {
              e.preventDefault();
            };
            const select = document.getElementsByTagName('select')
            clnodes[i].onmousedown = function (e) {
              if (e.button == 2) {
                const el = document.getElementById("overlay");
                el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
                console.log("text");
                console.log(this.id);
                document.getElementById('editid').value = this.id;
                document.getElementById('jsonkey').value = this.id;
               // document.getElementById('option1').value = this.options[0].value;
               if(this.options == undefined){
                 _this.testarr.push({ id: 1 });
                 return false;
               }
                for (let i = 0; i < this.options.length; i++) {
                  _this.testarr.push({ id: i+1 , data: this.options[i].value });
                }
              }
            }

          }
        }
      }
      this.showresult();
      document.getElementById('Hsmodel').style.display = 'none';
      document.getElementById('guifan').style.display = 'none';
      document.getElementById('formathtml').style.display = 'block';
      document.getElementById('formatindex').value = untitle;
      document.getElementById('formtitle').innerText = untitle;
    }
  }
  showresult() {
    const result = document.getElementById('content').innerHTML;
    const fir = result.replace(/"+/g, '').replace(/<option.*?>.*?<\/option>/g, '').replace(/<\/select>/g, '');
    const dc = fir.replace(/<.*?id=(.*?)>/g, "{{$1}}");
    document.getElementById('cspec').innerHTML = dc;

    const temparray = [];

    dc.replace(/{{.*?}}/g, word => {
      temparray.push(word.replace(/{/g, "").replace(/}/g, ""));
    });
        Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    for (let i = 0; i < this.curarray.length; i++) {
      if (temparray.indexOf(this.curarray[i]) === -1) {
        this.idarray.remove(this.curarray[i]);
      }
    }
    this.curarray = temparray;

    const currrange = this.$window.getSelection();
    this.curcursor = currrange.focusOffset;
    this.curbasenode = currrange.baseNode;
    if (!this.curbasenode) {
      this.curbasenode = document.getElementById('content');
    }
  }

  bindedit(event) {
    const e = event || this.$window.event;
    if (e.button == "2") {
      const el = document.getElementById("overlay");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
      document.getElementById('editid').value = this.id;
      document.getElementById('jsonkey').value = this.id;
      if (this.nodeName == "INPUT") {
        document.getElementById('option1').value = this.value;
      } else {
        const options = this.options;
        console.log(options[0].value);
        document.getElementById('option1').value = options[0].value;
        for (let i = 1; i < options.length; i++) {
          // this.testarr.push(options[i].index);
          const tr = document.createElement('tr');
          const td1 = document.createElement('td');
          tr.appendChild(td1);
          const td2 = document.createElement('td');
          td2.innerHTML = `<input type='text' id='option${i + 1}'  onkeydown='addoption()'>`;
          tr.appendChild(td2);
          document.getElementById('tokenoperate').appendChild(tr);
          document.getElementById(`option${i + 1}`).value = options[i].value;
        }
      }
    }
  }
}
export const applydlgcomponent = {
  template: require('./applyModal.html'),
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: ApplydlgComponentController
};

