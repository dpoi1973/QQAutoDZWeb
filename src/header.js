import baseComponent from './app/basejs/basecompent.js';
const APPAPI = '/api';
class HeaderController extends baseComponent {
  // @ngInject
  constructor($log, $uibModal, $scope, CommonUtilsService, socketService, $http) {
    super($log);
    this.$log = $log;
    this.$http = $http;
    this.toggleclass = false;
    this.$uibModal = $uibModal;
    this.socketService = socketService;
    this.$scope = $scope;
    this.$scope.user = {userid: '', password: ''};
    this.CommonUtilsService = CommonUtilsService;
   // this.changetext();
    this.tittext = "主页";
    this.islogin();
    this.userName = "";
  }
  changetext() {
     /*eslint-disable */
    const tit = document.getElementById("tit");
    const listli = document.getElementById("power");
    const powerul = document.getElementById("powerul")
    const powerulli = powerul.getElementsByTagName('li');
    const allmenuli = document.getElementById("sidebar-nav").getElementsByTagName('li');
    function hasClass(obj, cls){ //hasClass方法
        var obj_class = obj.className,//获取 class 内容.
        obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
       let x = 0;
        for(x in obj_class_lst) {
          if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
            return true;
          }
        }
        return false;
      }
    for (let i = 0; i < allmenuli.length; i++) {
      allmenuli[i].onclick = function () {
        const thistext = allmenuli[i].innerText;
        if(hasClass(allmenuli[i],"quanxina" )){
          tit.innerText = "权限管理";
         for(let j = 0;j<powerulli.length;j++){
            powerulli[j].onclick = function(){
              tit.innerText = this.innerText;
            }
          }
          return false;
        }
        tit.innerText = thistext
      };
    }
  }
  testtext(e) {
    this.$log.log(e.target.innerText);
    this.tittext = e.target.innerText;
  }
  islogin() {
    const log = this.$log;
    this.$log.log("islogin");
    this.CommonUtilsService.islogin().then(result => {
      this.userName = result.data.empinfo.Empname;
      if (result !== null || result !== angular.isUndefined) {
        this.$scope.user.userid = result.username;
        this.$scope.visible = !this.$scope.visible;
      }
    }, () => {
      log.info(`modal-component dismissed at: {{$new Date()}}`);
    });
  }
  login() {
    const modalInstance = this.$uibModal.open({
      component: 'logindlgComponent',
      resolve: {
        items: () => {
          return [this.userName, 'im2', 'it3'];
        }
      }
    });
    modalInstance.result.then(selectedItem => {
      this.$log.log("afterlogin");
      this.userName = selectedItem.userid;
      if (selectedItem != null || selectedItem != angular.isUndefined) {
        this.$scope.user.userid = selectedItem.userid;
        this.$scope.visible = !this.$scope.visible;
      }
    }, () => {
      // log.info(`modal-component dismissed at: {{$new Date()}}`);
    });
  }

  register() {
    const modalInstance = this.$uibModal.open({
      component: 'registerComponent',
      resolve: {
        items: () => {
          return ['sfefefe', 'im4', 'it5'];
        }
      }
    });

    const log = this.$log;
    modalInstance.result.then(selectedItem => {
      log.log(selectedItem);
    }, () => {
      log.info(`modal-component dismissed at: {{$new Date()}}`);
    });
  }

  exit() {
    const modalInstance = this.$uibModal.open({
      component: 'logoutComponent',
      resolve: {
        items: () => {
          return ['sfefefe', 'im4', 'it5'];
        }
      }
    });

    const log = this.$log;
    modalInstance.result.then(selectedItem => {
      if (selectedItem != null || selectedItem != angular.isUndefined) {
        this.$scope.visible = !this.$scope.visible;
      }
    }, () => {
      log.info(`modal-component dismissed at: ${new Date()}`);
    });
  }
}

export const header = {
  template: require('./header.html'),
  controller: HeaderController
};
