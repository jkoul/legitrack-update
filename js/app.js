'use strict';

(function(){
  angular
  .module("legitrackdc-update", [
    'ui.router',
    'ngResource'
  ]);
  .config([
    "$stateProvider",
    routerFunction
  ]);

  function routerFunction($stateProvider) {
    $stateProvider
    .state("Update", {
      url: "/",
      templateUrl: "js/update/main.html",
    })
    .state("Update.progress", {
      url: "/updating",
      templateUrl: "js/update/progress.html",
      controller: "UpdateLegislation",
      controllerAs: "UpdateLeg"
    })
  }
