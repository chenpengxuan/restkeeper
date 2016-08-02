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
      .controller('funcAddCtrl', funcAddCtrl);

  /** @ngInject */
  function funcAddCtrl($scope,$stateParams,$state,$http,$location, editableOptions, editableThemes,$filter) {

    $scope.functionVo = {
      functionParams:[]
    };

    console.log($state);
    console.log($scope);
    $state.current.title = "创建功能";
    var id = $stateParams.id;
    if (id != "") {
      $state.current.title = "修改功能";
      $http({
        url: "/function/get",
        method: 'GET',
        params: {id: id}
      }).success(function (data) {
        if (data.success) {
          $scope.functionVo = data.content;


          console.log($scope.functionVo);
        }
      });
    }

    $scope.submit = function(){
      $.ajax({
        type: "POST",
        url: "/function/save",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify($scope.functionVo),
        success: function (data) {
          alert(data);
        }
      });
    };

    $scope.paramTypes = [
      {value: "number", text: '数字'},
      {value: "string", text: '字符串'},
      {value: "time", text: '日期'}
    ];

    $scope.arrays = [
      {value: false, text: '否'},
      {value: true, text: '是'}
    ];


    $scope.showParamTypes = function(funcParam) {
      var selected = [];
      if(funcParam.type) {
        selected = $filter('filter')($scope.paramTypes, {value: funcParam.type});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.showIsArray = function(funcParam) {
      var selected = $filter('filter')($scope.arrays, {value: funcParam.array});

      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.addParam = function() {
      $scope.inserted = {
        id: $scope.functionVo.functionParams.length+1,
        name: '',
        description:'',
        type: "string",
        array: "0"
      };
      $scope.functionVo.functionParams.push($scope.inserted);
    };

    $scope.removeParam = function(index) {
      $scope.functionVo.functionParams.splice(index, 1);
    };

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

  }

})();
