'use strict';

(function(){
  angular
  .module("updateLeg")
  .controller("updateLegislation", [
    "UpdateOld",
    "UpdateCurrent",
    "ClearLegislation",
    updateCtrlModels
  ])

  function updateCtrlModels(
    UpdateOld,
    UpdateCurrent,
    ClearLegislation
  ) {
    var self=this;
    this.updateOld = function(){
      return UpdateOld.update();
    }

    this.updateCurrentAll = function(){
      return UpdateCurrent.updateAll();
    }



    // scope.old = LegislationOld.query();
    // scope.current = LegislationCurrent.query();


    this.clearFirebase = function(){
      return ClearLegislation.remove();
    }
  }

})()
