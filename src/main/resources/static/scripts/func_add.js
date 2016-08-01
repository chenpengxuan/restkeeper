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
  function funcAddCtrl($scope,$stateParams,$state,$http,$location) {
    console.log($scope);
    console.log($stateParams);
    console.log($state);
  }

})();
