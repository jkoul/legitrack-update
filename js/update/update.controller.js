'use strict';

(function(){
  angular
  .module("updateLeg")
  .controller("updateLegislation", [
    "UpdateOld",
    // "UpdateCurrent",
    // "LegislationOld",
    // "LegislationCurrent",
    // "Sessions",
    // "ClearLegislation",
    updateCtrlModels
  ]);

  function updateCtrlModels(
    UpdateOld
    // ClearLegislation
  ) {

    this.updateOld = UpdateOld.update();
    // scope.old = LegislationOld.query();
    // scope.current = LegislationCurrent.query();

    // this.sessions = Sessions.query();
    // this.clearFirebase = ClearLegislation.remove();
  }

})()
