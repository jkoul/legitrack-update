'use strict';

(function(){
  angular
  .module("updateLeg")
  .directive("updateProgress", [
    "UpdateOld",
    "UpdateCurrent",
    updateTemplate
  ])

  function updateTemplate(UpdateOld, UpdateCurrent){
    return {
      templateUrl: "js/update/progress.html",
      replace: true,
      scope: {
        bill: '='
      }
      link: updateProgressFunction
    }

    function updateProgressFunction(scope) {
      // more here, still to come
    }
  }

})()
