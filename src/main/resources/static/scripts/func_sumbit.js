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

  angular.module('BlurAdmin.pages.appMenu')
      .controller('funcSubmitCtrl', funcSubmitCtrl);

  /** @ngInject */
  function funcSubmitCtrl($scope,$stateParams,$state,$http,$location, editableOptions, editableThemes,$filter) {

    var id = $state.current.param;
    $scope.functionVo = {};

    $http({
      url: "/function/get",
      method: 'GET',
      params: {id: id}
    }).success(function (data) {
      if (data.success) {
        $scope.functionVo = data.content;
      }
    });


    $scope.submit = function(){

      $.ajax({
        type: "POST",
        url: "/function/submit",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify($scope.functionVo),
        success: function (data) {
          $scope.functionVo.resultStr = data.message;
          $("#resultGroup").find("a").click();
          $("#request").find("a").click();
        }
      });
    };
  }

})();
