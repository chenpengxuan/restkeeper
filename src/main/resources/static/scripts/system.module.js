/*
 *
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *
 */

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.system', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        //todo 根据数据库查义菜单
        $.ajax({
            url: "/application/list",
            success: function(data){
                console.log(data);
                if(data.success){

                    $.each(data.content,function (i,item) {
                        console.log(item);
                        $stateProvider.state('system_'+ item.id,{
                            title: item.name,
                            template : '<ui-view></ui-view>',
                            abstract: true,
                            sidebarMeta: {
                                icon: 'ion-grid',
                                order: item.id,
                            }
                        });

                        $.each(item.functions,function (g,group) {
                            console.log(group);
                            $stateProvider.state('system_'+ item.id+'.func_'+group.id,{
                                title: group.name,
                                url: '/func_'+group.id,
                                templateUrl: 'func-list.html',
                                //abstract: true,
                                controller: detailControl,
                                param:group.id,
                                sidebarMeta: {
                                    order: 200,
                                }
                            });

                            //$stateProvider.state('system_'+ item.id+'.group.aaa',{
                            //    title: "aaa",
                            //    //template : '<ui-view></ui-view>',
                            //    url: '/func_cbdd',
                            //    templateUrl: 'user-list.html',
                            //    //abstract: true,
                            //    controller: detailControl,
                            //    sidebarMeta: {
                            //        order: 200,
                            //    }
                            //});

                            //$.each(group.functions,function (f,func) {
                            //    console.log(func);
                            //    //$stateProvider.state('system_'+ item.id+'.group.func_'+ func.id,{
                            //    //    url: '/func_'+ func.id,
                            //    //    //templateUrl: 'user-list.html',
                            //    //    template : '<ui-view></ui-view>',
                            //    //    title: func.name,
                            //    //    controller:detailControl,
                            //    //    sidebarMeta: {
                            //    //        order: 200,
                            //    //    }
                            //    //});
                            //});
                        });
                    })
                }
            }
        });

        function detailControl($scope,$stateParams,$state) {
            //var id = location.href.substring(location.href.indexOf('func_')+5);
            console.log($scope);
            console.log($stateParams);
            //console.log(id);
            console.log($state)

        }
        //
        // $stateProvider
        //     .state('user', {
        //       url: '/user',
        //       template : '<ui-view></ui-view>',
        //       abstract: true,
        //       controller: 'TablesPageCtrl',
        //       title: '用户管理',
        //       sidebarMeta: {
        //         icon: 'ion-grid',
        //         order: 300,
        //       },
        //     }).state('user.smart', {
        //       url: '/smart',
        //       templateUrl: 'user-list.html',
        //       title: '用户列表',
        //       sidebarMeta: {
        //         order: 100,
        //       },
        //     });
        // $urlRouterProvider.when('/user','/user/smart');
    }

})();
