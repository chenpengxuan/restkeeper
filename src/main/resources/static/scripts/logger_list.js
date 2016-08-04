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
  

	var start = {
		elem : '#start',
		format : 'YYYY/MM/DD hh:mm:ss',
		min : laydate.now(), // 设定最小日期为当前日期
		max : '2099-06-16 23:59:59', // 最大日期
		istime : true,
		istoday : false,
		choose : function(datas) {
			end.min = datas; // 开始日选好后，重置结束日的最小日期
			end.start = datas // 将结束日的初始值设定为开始日
		}
	};
	var end = {
		    elem: '#end',
		    format: 'YYYY/MM/DD hh:mm:ss',
		    min: laydate.now(),
		    max: '2099-06-16 23:59:59',
		    istime: true,
		    istoday: false,
		    choose: function(datas){
		        start.max = datas; //结束日选好后，重置开始日的最大日期
		    }
		};
	laydate(start);
	laydate(end);

  /** @ngInject */
  function loggerListCtrl($scope, $state,$http) {


    $scope.page = 1;
    $scope.pageSize = 10;
    $scope.total = 0;
    $scope.logger = {};

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

      param.functionName = $scope.logger.functionName;
      param.userName = $scope.logger.userName;
      param.applicationId = $scope.logger.applicationId;
      param.startTime = $scope.logger.startTime;
      param.endTime = $scope.logger.endTime;
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
