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
  function funcSubmitCtrl($scope,$stateParams,$state,$http,JSONFormatterConfig) {

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
      $scope.functionVo.requestStr = "";
      $scope.functionVo.responseStr = "";
    });

    $scope.submit = function(){
      $scope.functionVo.functionParam = $scope.functionVo.jsonBody;
      $.ajax({
        type: "POST",
        url: "/function/submit",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify($scope.functionVo),
        success: function (data) {
          try {
            $scope.functionVo.requestStr = JSON.parse(data.request);
            $scope.functionVo.responseStr = JSON.parse(data.response);
          } catch (e) {
            $scope.functionVo.requestStr = data.request;
            $scope.functionVo.responseStr = data.response;
          }
          if ($("#response").attr("class").lastIndexOf("panel-open") == -1) {
            $("#response").find("a").click();
          }
          if ($("#request").attr("class").lastIndexOf("panel-open") == -1) {
            $("#request").find("a").click();
          }
          $scope.$apply();//需要手动刷新
        }
      });
    };


    $scope.prettify = function(){
      try {
        $scope.functionVo.jsonBody = JSON.stringify(JSON.parse($scope.functionVo.jsonBody), "", 2);
      } catch (e) {
        layer.alert("json 格式不正确",{closeBtn: 0},function (index) {
          layer.close(index)
        });
      }
    };
  }

})();
