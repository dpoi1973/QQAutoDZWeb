import angular from 'angular';

import {hello} from './app/hello';
import 'angular-ui-router';
import routesConfig from './routes';
import 'angular-ui-bootstrap';
import 'angular-ui-grid';
import 'ui-select';
import _ from 'underscore';
// import './app/Services/gridOptionServices.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'angular-ui-grid/ui-grid.css';
import 'angular-ui-grid/ui-grid.min.css';
import 'ui-select/dist/select.css';
import './select2.css';
import './index.css';
import './app/basejs/baseGrid.js';
import './app/basejs/basetwo.js';
import './app/basejs/basecompent.js';
import './app/basejs/baserest.js';
import 'angular-sanitize';
import io from 'socket.io-client/dist/socket.io.js';
// import 'angular-i18n/angular-locale_zh-cn.js';
import {GridOptionService} from './app/Services/gridOptionServices.js';
import {CommonUtilsService} from './app/Services/commonUtilsServices.js';
import {UserAdminService} from './app/Services/userAdminServices.js';
import {AdminControllerServic} from './app/Services/adminControllerService.js';
import {baoguandancomponent} from './app/components/baoGuanDan/baoGuanDanComponent';
import {baoguandandetailcomponent} from './app/components/baoGuanDan/baoGuanDanDetailComponent';
import {hscodehelpcomponent} from './app/components/hsCodeHelp/hsCodeHelpComponent';
import {hsCodeCspecmodelcomponent} from './app/components/hsCodeHelp/hsCodeCspecmodel';
import {hscodehelpdetailcomponent} from './app/components/hsCodeHelp/hsCodeHelpDetailComponent';
import {ywinfocomponent} from './app/components/Ywinfo/ywInfoComponent';
import {ywinfodetailcomponent} from './app/components/Ywinfo/ywInfoDetailComponent';
import {ywinfocopycomponent} from './app/components/Ywinfocopy/ywInfoComponent';
import {ywinfodetailcopycomponent} from './app/components/Ywinfocopy/ywInfoDetailComponent';
import {waibushujucomponent} from './app/components/waibuShuJu/waibuShuJuComponent';
import {waibushujudetailComponent} from './app/components/waibuShuJu/waibuShuJuDetailComponent';
import {spxinxicomponent} from './app/components/spXinXi/spXinXiComponent';
import {spxinxidetailcomponent} from './app/components/spXinXi/spXinXiDetailComponent';
import {spxinxiceshicomponent} from './app/components/spXinXiceshi/spXinXiComponent';
import {spxinxiceshidetailcomponent} from './app/components/spXinXiceshi/spXinXiDetailComponent';
import {spguileicomponent} from './app/components/spGuiLei/spGuiLeiComponent';
import {spguileidetailcomponent} from './app/components/spGuiLei/spGuiLeiDetailComponent';
import {applydlgcomponent} from './app/components/spGuiLei/applydlgComponent';
import {logdlgcomponent} from './app/components/spGuiLei/logdlgComponent';
import {mubancomponent} from './app/components/muBan/muBanComponent';
import {mubandetailcomponent} from './app/components/muBan/muBanDetailComponent';
import {shangjianshujucomponent} from './app/components/shangjianShuJu/SJComponent';
import {shangjianshujudetailcomponent} from './app/components/shangjianShuJu/SJDetailComponent';
import {controlleractionauthcomponent} from './app/components/AuthComs/ControllerActionAuthComponent';
import {rolelistcomponent} from './app/components/AuthComs/RoleListComponent';
import {userlistcomponent} from './app/components/AuthComs/UserListComponent';
import {controlleractiondetaildlg} from './app/components/AuthComs/Dlgs/ControllerActionDetailDlg';
import {roledetaildlg} from './app/components/AuthComs/Dlgs/RoleDetailDlg';
import {employeedetail} from './app/components/AuthComs/Dlgs/EmployeeDetail';
import {userdetaildlg} from './app/components/AuthComs/Dlgs/UserDetailDlg';
import {roletouser} from './app/components/AuthComs/Dlgs/RoleToUser';
import {employeelistcomponent} from './app/components/AuthComs/EmployeeListComponent';
import {useradmincomponent} from './app/components/UserAdmin/UserAdminComponent';
import {logoutcomponent} from './app/components/logout/logoutComponent';
import {logindlgcomponent} from './app/components/login/logindlgComponent';
import {registercomponent} from './app/components/register/registerComponent';
import {luWeicomponent} from './app/components/luWei/luWei';
import {transportcomponent} from './app/components/transport/transport';
import {paracomcomponent} from './app/components/paracom/paracomcomponent';
import {cspecdlgcomponent} from './app/components/spGuiLei/cspecdlgComponent';
import {equalcspecdlgcomponent} from './app/components/spGuiLei/equalfakeCspec';
import {fakegoodsnamecomponent} from './app/components/spGuiLei/fakegoodsnamecomponent';
import {custmanagercomponent} from './app/components/custmanager/custmanager';
import {custinfomodelcomponent} from './app/components/custmanager/custinfomodelcomponent';
import {autojudgeinfocomponent} from './app/components/autojudgeinfo/autojudgeinfo';
import {baoguandanmobancomponent} from './app/components/muBan/baoGuanDanMoBan';
import {sjMobancomponent} from './app/components/shangjianmoban/sjMoban';
import {shangjianmobancomponent} from './app/components/shangjianmoban/shangjianmoban';
import {compulsoryCertificationcomponent} from './app/components/CompulsoryCertification/CompulsoryCertification';
import {manualguileicomponent} from './app/components/manualguilei/manualguilei';
import {manualguileiDetailcomponent} from './app/components/manualguilei/manualguileiDetail';
import {yuguileibillcomponent} from './app/components/Yuguileibill/yuguileibill';
import {yuguileibilldetailcomponent} from './app/components/Yuguileibill/yuguileibilldetail';
import {classifieddatacomponent} from './app/components/Classifieddata/classifieddata';
import {classifieddataDetailcomponen} from './app/components/Classifieddata/classifieddataDetail';
import {archivecomponent} from './app/components/proxyarchive/proxyarchive';
import {proxyarchiveDetailcomponen} from './app/components/proxyarchive/proxyarchiveDetail';
// import {cspeccomponent} from './app/components/hsCodeHelp/cspecdlgComponent';

// import './app/Services/commonUtilsServices.js';
import {header} from './header';
import {footer} from './footer';
import {templatetext} from './app/components/templatepublic/templatetext';
/* @ngInject   **/
export const app = 'app';

angular
  .module(app, ['ui.router', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.bootstrap', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ngSanitize', 'ui.select', 'ui.grid.pagination'])
   .factory('_', ['$window', $windowk => {
     return _; // assumes underscore has already been loaded on the page
   }])   /*eslint-disable */
  .factory('socketService', ['$window', $window => { // eslint-disable-line angular/log
    $window.socket = io.connect('http://192.168.0.70:1337');
    return $window.socket;
  }])
   .directive('myEnter', ['$parse', 'CommonUtilsService', function ($parse, CommonUtilsService) {
     return {
       require: '?ngModel',
       link: function (scope, element, attrs, ngModelCtrl) {
         const tt = attrs.myEnter.replace(/\(\)/, `('${attrs.ngModel}',${attrs.ngModel})`);
             // 得到  key , value
             // 根据key 找到redis keyname
            // const keyname=ngModelCtrl.$$attr
            // console.log(keyname)
         //    const keyvalue=ngModelCtrl.$modelValue;
         element.bind("keydown keypress", event => {
           if (event.which === 13) {
             scope.$apply(() => {
               scope.$eval(tt);
             });
             event.preventDefault();
           }
         });
       }
     }
;
   }])
   .directive('customAutofocus', function() {
  return{
         restrict: 'A',

        link: function(scope, element, attrs){
           scope.$watch(function(){
             return scope.$eval(attrs.customAutofocus);
             },function (newValue){
               console.log("directive");
               if (newValue === false){
                   element[0].focus();//use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
               }
           });
         }
     };
})
.directive('contextMenu', ['$window', function ($window) {
        return {
            restrict: 'A',
            //require:'^?ngModel',
            link: function ($scope, element, attrs) {
                var opened = false;
                var menuElement = angular.element(document.getElementById(attrs.target));
                function open(event, element) {
                    $scope.opened = true;
                    menuElement.css('top', event.clientY + 'px');
                    menuElement.css('left', event.clientX + 'px');
                };
                function close(element) {
                    $scope.opened = false;
                };

                $scope.opened = false;

                //每个项点击的事件
                $scope.fns = {
                    "查看": function ($event) {
                        alert('LOOK');
                    },
                    "刷新": function ($event) {
                        alert('刷新')
                    }
                    ,
                    "点击": function ($event) {
                        alert('点击')
                    }
                }
                //模拟数据填充菜单
                //菜单的html 结构
                //<ul id='a'><li ng-repeat='m in ms'>{{m.name}}</li></ul> 
                $scope.ms = $scope.model;
                $scope.fn = function ($event, sName) {
                    /*
                     * 根据sName 来判断使用什么函数
                    */

                    $scope.fns[sName]($event);
                }
                //显示右键菜单
                element.bind('contextmenu', function (event) {
                    $scope.$apply(function () {
                        event.preventDefault();
                        open(event, menuElement);
                    });
                });

                //窗口绑定点击事件 隐藏右键菜单
                angular.element($window).bind('click', function (event) {
                    if (opened) {
                        $scope.$apply(function () {
                            event.preventDefault();
                            close(menuElement);
                        });
                    }
                });
            }
        };
    }])
    .directive('dblClickRow', ['$compile', '$parse',  function($compile, $parse) {
  return {
    priority : -190, // run after default uiGridCell directive
    restrict : 'A',
    scope : false,

    compile: function($element, attr) {

        // Get the function at ng-dblclick for ui-grid
        var fn = $parse(attr['ngDblclick'], /* interceptorFn */ null, /* expensiveChecks */ true);

        return function ngEventHandler(scope, element) {

            element.on('dblclick', function(event) {

              var callback = function() {

                if ($scope.gridApi.grid.selection.lastSelectedRow)
                {
                    fn($scope, {$event:event, row: $scope.gridApi.grid.selection.lastSelectedRow.entity });
                }
              };

              $scope.$apply(callback);

            }
        )};

    }

    };
} ])
.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
})
  .config(routesConfig)
  .config(['$qProvider', $qProvider => {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .service('GridOptionService', GridOptionService)
  .service('CommonUtilsService', CommonUtilsService)
  .service('UserAdminService', UserAdminService)
  .service('AdminControllerServic', AdminControllerServic)
  .component('app', hello)
  .component('templatetext', templatetext)
  .component('headerComponent', header)
  .component('footerComponent', footer)
  .component('baoguandanComponent', baoguandancomponent)
  .component('baoguandandetailComponent', baoguandandetailcomponent)
  .component('hscodehelpComponent', hscodehelpcomponent)
  .component('hscodehelpdetailComponent', hscodehelpdetailcomponent)
  .component('ywinfoComponent', ywinfocomponent)
  .component('ywinfodetailComponent', ywinfodetailcomponent)
  .component('ywinfocopyComponent', ywinfocopycomponent)
  .component('ywinfodetailcopyComponent', ywinfodetailcopycomponent)
  .component('waibushujuComponent', waibushujucomponent)
  .component('waibushujudetailComponent', waibushujudetailComponent)
  .component('spxinxiComponent', spxinxicomponent)
  .component('spxinxidetailComponent', spxinxidetailcomponent)
  .component('spxinxiceshiComponent', spxinxiceshicomponent)
  .component('spxinxiceshidetailComponent', spxinxiceshidetailcomponent)
  .component('spguileiComponent', spguileicomponent)
  .component('spguileidetailComponent', spguileidetailcomponent)
  .component('applydlgComponent', applydlgcomponent)
  .component('logdlgComponent', logdlgcomponent)
  .component('mubanComponent', mubancomponent)
  .component('mubandetailComponent', mubandetailcomponent)
  .component('shangjianshujuComponent', shangjianshujucomponent)
  .component('shangjianshujudetailComponent', shangjianshujudetailcomponent)
  .component('controlleractionauthComponent', controlleractionauthcomponent)
  .component('controlleractiondetaildlgComponent', controlleractiondetaildlg)
  .component('userdetaildlgComponent', userdetaildlg)
  .component('roletouserComponent', roletouser)
  .component('roledetaildlgComponent', roledetaildlg)
  .component('rolelistComponent', rolelistcomponent)
  .component('employeedetailComponent', employeedetail)
  .component('userlistComponent', userlistcomponent)
  .component('employeelistComponent', employeelistcomponent)
  .component('useradminComponent', useradmincomponent)
  .component('logoutComponent', logoutcomponent)
  .component('logindlgComponent', logindlgcomponent)
  .component('registerComponent', registercomponent)
  .component('luWeiComponent', luWeicomponent)
  .component('transportComponent', transportcomponent)
  .component('paracomComponent', paracomcomponent)
  .component('cspecdlgcomponent', cspecdlgcomponent)
  .component('equalcspecdlgcomponent', equalcspecdlgcomponent)
  .component('fakegoodsnamecomponent', fakegoodsnamecomponent)
  .component('custmanagerComponent', custmanagercomponent)
  .component('custinfomodelcomponent', custinfomodelcomponent)
  .component('autojudgeinfoComponent', autojudgeinfocomponent)
  .component('baoguandanmobanComponent', baoguandanmobancomponent)
  .component('sjMobancomponent', sjMobancomponent)
  .component('shangjianmobancomponent', shangjianmobancomponent)
  .component('hsCodeCspecmodelcomponent', hsCodeCspecmodelcomponent)
  .component('compulsoryCertificationcomponent', compulsoryCertificationcomponent)
  .component('manualguileicomponent', manualguileicomponent)
  .component('manualguileiDetailcomponent', manualguileiDetailcomponent)
  .component('yuguileibillcomponent', yuguileibillcomponent)
  .component('yuguileibilldetailcomponent', yuguileibilldetailcomponent)
  .component('classifieddatacomponent', classifieddatacomponent)
  .component('classifieddataDetailcomponen', classifieddataDetailcomponen)
  .component('archivecomponent', archivecomponent)
  .component('proxyarchiveDetailcomponen', proxyarchiveDetailcomponen)
  // .component('cspeccomponent', cspeccomponent);
