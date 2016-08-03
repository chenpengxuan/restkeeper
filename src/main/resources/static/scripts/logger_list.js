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

  angular.module('BlurAdmin.pages.logger')
      .controller('loggerListCtrl', loggerListCtrl);

  /** @ngInject */
  function loggerListCtrl($scope, $state,$http) {


    $scope.page = 1;
    $scope.pageSize = 10;
    $scope.total = 0;
    $scope.func = {};

    //获取应用
    $http({
      url: "/application/getAll",
      method: 'GET'
    }).success(function (data) {
      if (data.success) {
        $scope.applications = data.content;
      }
    });

    $scope.pagingAction = function(page,pageSize) {
      var param = {};
      param.page = page;
      param.size = pageSize;
      //param.name = $scope.user.name;
      //param.roleId = $scope.user.roleId;
//      param.name = $scope.logger.name;
//      param.url = $scope.logger.url;
//      param.author = $scope.logger.userName;
      param.applicationId = $scope.func.applicationId;
      param.sort = "o.update_time,desc";

      doPaging($http,"/logger/list",param,function (data) {
          $scope.total = data.content.totalElements;
          $scope.loggerList = data.content.content;
      });
    };
    $scope.pagingAction($scope.page,$scope.pageSize,$scope.total);

    $scope.search = function(){
      $scope.page = 1;
      $scope.pagingAction($scope.page,$scope.pageSize);
    };
  }

})();
