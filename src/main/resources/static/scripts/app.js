/*
 *  
 *  (C) Copyright 2016 Ymatou (http://www.ymatou.com/).
 *  All rights reserved.
 *  
 */

'use strict';

angular.module('BlurAdmin', [
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