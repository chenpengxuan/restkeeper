/*
 *  
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *  
 */

'use strict';

var app = angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
]);

addInterceptor(app);

function logout () {
  $.ajax({
    url: "/logout",
    success: function(data){
      // if(data.success){
        window.location = "login.html";
      // }
    }
  });
}

$.ajaxSetup({
  error: function (XMLHttpRequest, textStatus, errorThrown) {
    if(errorThrown == "Unauthorized"){
      location.href = "login.html";
    }
  }
});

function addInterceptor(app) {
  // 定义一个 Service ，稍等将会把它作为 Interceptors 的处理函数
  app.factory('HttpInterceptor', ['$q', HttpInterceptor]);

  function HttpInterceptor($q) {
    return {
      requestError: function(err){
        return $q.reject(err);
      },
      response: function(res){
        return res;
      },
      responseError: function(err){
        var status = err.status;
        if(status == 401){
          location.href = "login.html";
        }
        return $q.reject(err);
      }
    };
  }

// 添加对应的 Interceptors
  app.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push(HttpInterceptor);
  }]);
}