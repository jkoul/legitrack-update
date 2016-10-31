'use strict';

(function(){
  angular
  .module("updateLeg")
  .controller("showDataController", [
    "LegislationOld",
    // "LegislationCurrent",
    "Sessions",
    showDataFunction
  ])

  function showDataFunction(
    LegislationOld,
    Sessions
  ) {
    var self=this
    this.sessions = Sessions.query();
    this.sessions.$promise.then(function($response, $LegislationOld){
      var data = $response;
      console.log($response);
      angular.forEach(data, function(s, $LegislationOld){
        LegislationOld.sessionQuery(s);
        console.log(s);
        // sessionData.$loaded().then(function($response){
        //   var data = $response;
        //   console.log(data);
        //   // return data
          // angular.extend(self.sessionCounts,{id: data})
        // })
      })
    })

    // var sessionNums=[8,9,10,11,12,13,14,15,16,17,18,19,20]




    // self.getBills = function(sessionId){
    //   console.log(sessionId);




      // })
    // var sessionCounts = {};
    // this.all.$loaded().then(function($response){
    //   console.log($response);
    //   var data = $response;
    //   angular.forEach(data, function(d){
    //     angular.extend(sessionCounts, {$id: d.length});
    //   })
    // })



    this.countAll = function(){
      var total = 0;
      angular.forEach(self.sessions, function(s){
        total += self.sessionCount(s.Id);
      });
      return total;
    }
  }
})()
