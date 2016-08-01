/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', pageTop)
      // .controller("pageTopCtrl",pageTopCtrl);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
    };
  }

  function pageTopCtrl($scope) {
    $scope.signout = function () {
      alert($scope);
    }
  }

})();