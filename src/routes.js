export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
      .state('userAdmin', {
        url: '/openuserlist',
        component: 'useradminComponent'
      })
       .state('authControllerlist', {
         url: '/authcontrollerlist',
         component: 'controlleractionauthComponent'
       })
        .state('roleControllerlist', {
          url: '/rolecontrollerlist',
          component: 'rolelistComponent'
        })
          .state('userListComponent', {
            url: '/userListComponent',
            component: 'userlistComponent'
          })
            .state('employeeListComponent', {
              url: '/employeeListComponent',
              component: 'employeelistComponent'
            })
    .state('baoGuanDanComponent', {
      abstract: true,
      url: '/baoGuanDanComponent',
      template: "<ui-view/>"
      // component: 'gridoptionTotalComponent'
    }).state('baoGuanDanComponent.list', {
      url: '/',
      component: 'baoguandanComponent'
    })
    .state('baoGuanDanComponent.detail', {
      url: '/:id',
      component: 'baoguandandetailComponent'
    })
    .state('hsCodeHelp', {
      abstract: true,
      url: '/hsCodeHelp',
      template: "<ui-view/>"
      // component: 'gridoptionTotalComponent'
    }).state('hsCodeHelp.list', {
      url: '/',
      component: 'hscodehelpComponent'
    })
    .state('hsCodeHelp.detail', {
      url: '/:id',
      component: 'hscodehelpdetailComponent'
    })
    .state('ywInfo', {
      abstract: true,
      url: '/ywInfo',
      template: "<ui-view/>"
    }).state('ywInfo.list', {
      url: '/',
      component: 'ywinfoComponent'
    })
    .state('ywInfo.detail', {
      url: '/:id',
      component: 'ywinfodetailComponent'
    })
    .state('ywInfocopy', {
      abstract: true,
      url: '/ywInfocopy',
      template: "<ui-view/>"
    }).state('ywInfocopy.list', {
      url: '/',
      component: 'ywinfocopyComponent'
    })
    .state('ywInfocopy.detail', {
      url: '/:id',
      component: 'ywinfodetailcopyComponent'
    })
    .state('waibuShuJu', {
      abstract: true,
      url: '/waibuShuJu',
      template: "<ui-view/>"
    }).state('waibuShuJu.list', {
      data: {
        pageTitle: "Home"
      },
      url: '/',
      component: 'waibushujuComponent'
    })
    .state('waibuShuJu.detail', {
      url: '/:id',
      component: 'waibushujudetailComponent'
    })
    .state('spXinXi', {
      abstract: true,
      url: '/spXinXi',
      template: "<ui-view/>"
    })
    .state('spXinXi.list', {
      url: '/',
      component: 'spxinxiComponent'
    })
    .state('spXinXi.detail', {
      url: '/:id',
      component: 'spxinxidetailComponent'
    })
     .state('spXinXiceshi', {
       abstract: true,
       url: '/spXinXiceshi',
       template: "<ui-view/>"
     })
      .state('spXinXiceshi.list', {
        url: '/',
        component: 'spxinxiceshiComponent'
      })
    .state('spXinXiceshi.detail', {
      url: '/:id',
      component: 'spxinxiceshidetailComponent'
    })
    .state('spGuiLei', {
      abstract: true,
      url: '/spGuiLei',
      template: "<ui-view/>"
    }).state('spGuiLei.list', {
      url: '/',
      component: 'spguileiComponent'
    })
    .state('spGuiLei.detail', {
      url: '/:id',
      component: 'spguileidetailComponent'
    })
    .state('muBan', {
      abstract: true,
      url: '/muBan',
      template: "<ui-view/>"
    }).state('muBan.list', {
      url: '/',
      component: 'mubanComponent'
    })
    .state('muBan.detail', {
      url: '/:id',
      component: 'baoguandanmobanComponent'
    })
    .state('shangjianmoban', {
      abstract: true,
      url: '/shangjianmoban',
      template: "<ui-view/>"
    }).state('shangjianmoban.list', {
      url: '/',
      component: 'shangjianmobancomponent'
    })
    .state('shangjianmoban.detail', {
      url: '/:id',
      component: 'sjMobancomponent'
    })
    .state('shangjianShuJu', {
      abstract: true,
      url: '/shangjianShuJu',
      template: "<ui-view/>"
    }).state('shangjianShuJu.list', {
      url: '/',
      component: 'shangjianshujuComponent'
    }).state('shangjianShuJu.detail', {
      url: '/:id',
      component: 'shangjianshujudetailComponent'
    })
      .state('custmanager', {
        abstract: true,
        url: '/custmanager',
        template: "<ui-view/>"
      }).state('custmanager.list', {
        url: '/',
        component: 'custmanagerComponent'
      })
        .state('luWei', {
          abstract: true,
          url: '/luWei',
          template: "<ui-view/>"
        }).state('luWei.list', {
          url: '/',
          component: 'luWeiComponent'
        })
        .state('paracom', {
          abstract: true,
          url: '/paracom',
          template: "<ui-view/>"
        }).state('paracom.list', {
          url: '/',
          component: 'paracomComponent'
        })
        .state('autojudgeinfo', {
          abstract: true,
          url: '/autojudgeinfo',
          template: "<ui-view/>"
        }).state('autojudgeinfo.list', {
          url: '/',
          component: 'autojudgeinfoComponent'
        })
           .state('transport', {
             abstract: true,
             url: '/transport',
             template: "<ui-view/>"
           }).state('transport.list', {
             url: '/',
             component: 'transportComponent'
           })
            .state('compulsoryCertification', {
              abstract: true,
              url: '/compulsoryCertification',
              template: "<ui-view/>"
            }).state('compulsoryCertification.list', {
              url: '/',
              component: 'compulsoryCertificationcomponent'
            })
            .state('manualguilei', {
              abstract: true,
              url: '/manualguilei',
              template: "<ui-view/>"
            }).state('manualguilei.list', {
              url: '/',
              component: 'manualguileicomponent'
            }).state('manualguilei.detail', {
              url: '/:id',
              component: 'manualguileiDetailcomponent'
            })
             .state('yuguileibill', {
               abstract: true,
               url: '/yuguileibill',
               template: "<ui-view/>"
             }).state('yuguileibill.list', {
               url: '/',
               component: 'yuguileibillcomponent'
             }).state('yuguileibill.detail', {
               url: '/:id',
               component: 'yuguileibilldetailcomponent'
             })
              .state('classifieddata', {
                abstract: true,
                url: '/classifieddata',
                template: "<ui-view/>"
              }).state('classifieddata.list', {
                url: '/',
                params: {id: ""},
                component: 'classifieddatacomponent'
              }).state('classifieddata.detail', {
                url: '/:id',
                params: {proxyid: ''},
                component: 'classifieddataDetailcomponen'
              })
              .state('archivecomponent', {
                abstract: true,
                url: '/archivecomponent',
                template: "<ui-view/>"
              })
              .state('archivecomponent.list', {
                url: '/',
                component: 'archivecomponent'
              }).state('archivecomponent.detail', {
                url: '/:id',
                component: 'proxyarchiveDetailcomponen'
              });
}
