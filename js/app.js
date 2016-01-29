'use strict';

(function(){
  angular
  .module("legitrackdc-update", [
    'ui.router',
    'ngResource',
    'updateLeg',
    'ui.bootstrap',
  ])

  .config([
    "$stateProvider",
    "$locationProvider",
    routerFunction
  ]);

  function routerFunction($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("default", {
      url: "/",
      templateUrl: "js/update/main.html",
      controller: "showDataController",
      controllerAs: "showData"
    })
    .state("update", {
      url: "/update",
      templateUrl: "js/update/progress.html",
      controller: "updateLegislation",
      controllerAs: "updateLeg"
    })
  }
})()
