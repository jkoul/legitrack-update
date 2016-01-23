'use strict';

(function(){
  angular
  .module("updateLeg")
  .controller("updateLegislation", [
    "UpdateOld",
    "UpdateCurrent",
    "LegislationOld",
    "LegislationCurrent",
    "Sessions",
    updateCtrlModels
  ]);

  function updateCtrlModels(UpdateOld, UpdateCurrent, LegislationOld, LegislationCurrent, scope) {

    scope.updateOld = UpdateOld.update();
    scope.old = LegislationOld.query();
    scope.current = LegislationCurrent.query();

    scope.sessions = Sessions.query();
  }

})()
