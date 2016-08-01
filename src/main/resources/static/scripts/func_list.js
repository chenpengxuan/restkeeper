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

  angular.module('BlurAdmin.pages.app')
      .controller('funcListCtrl', funcListCtrl);

  /** @ngInject */
  function funcListCtrl($scope, $state,$http) {


    $scope.page = 1; //���õ�ǰҳ��
    $scope.pageSize = 10;//����һҳ������
    $scope.total = 0;//����һҳ������

    $scope.pagingAction = function(page,pageSize) {
      var param = {};
      param.page = page;
      param.size = pageSize;
      //param.name = $scope.user.name;
      //param.roleId = $scope.user.roleId;

      doPaging($http,"/system/listFunc",param,function (data) {
          $scope.total = data.content.totalElements;
          $scope.funcList = data.content.content;
      });
    };
    $scope.pagingAction($scope.page,$scope.pageSize,$scope.total);
  }

})();
