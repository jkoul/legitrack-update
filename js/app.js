'use strict';

(function(){
  angular
  .module("legitrackdc-update", [
    'ui.router',
    'ngResource'
    'updateLeg'
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
      controller: "updateLegislation",
      controllerAs: "updateLeg"
    })
  }
