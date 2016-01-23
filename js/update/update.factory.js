'use strict';

(function(){
  angular
  .module("updateLeg")

  .factory("UpdateOld", [
    '$resource',
    '$firebaseObject',
    '$firebaseArray',
    runUpdateOld
  ])

  .factory("UpdateCurrent", [
    '$resource',
    '$firebaseObject',
    '$firebaseArray',
    runUpdateCurrent
  ])

  .factory('LegislationOld', ['$firebaseObject','$firebaseArray', legOld]);



  .factory('LegislationCurrent', ['$firebaseObject', '$firebaseArray', legCurrent])

  .factory('ClearLegislation', ['$firebaseObject, $firebaseArray', function(){

  }])

  .factory('Sessions', ['$resource,' function($resource) {
    return $resource('http://lims.dccouncil.us/api/v1/masters/CouncilPeriods/', {});
  }])

  var firebaseUrl = "https://legitrack.firebaseio.com";
  var LimsAll = $resource('http://lims.dccouncil.us/api/v1/Legislation/Search/', {"CategoryId":0})
  var LimsDetail = $resource('http://lims.dccouncil.us/api/v1/Legislation/Details/:id', {})

  function runUpdateOld($resource, $firebaseObject, $firebaseArray) {
    var bills = LimsAll.query();
    // saved = 0
    var updateFunction = {
      update: function(){
        bills.$promise.then(function($response){
          var billData = $response;
          angular.forEach(billData, function(bill){
            if(bill.CouncilPeriod < 21) {
              var getBill = LimsDetail.get({id: bill.Legislation.LegislationNumber});
              getBill.$promise.then(function($response){
                var legRef = new Firebase(firebaseUrl + "/legislation/old");
                legRef.child($response.Legislation.LegislationNumber).set($response);
                // saved++
              })
            }
          })
        })
      }
    }
    return updateFunction;
  }

  function runUpdateCurrent($resource, $firebaseObject, $firebaseArray) {

  }

  function legOld(){
    var legRef = new Firebase(firebaseUrl + "/legislation/old");
    legislation(legRef);
  }

  function legCurrent(){
    var legRef = new Firebase(firebaseUrl + "/legislation/current");

  }

  function legislation($firebaseObject, $firebaseArray, legRef) {
    var legDetails = $firebaseArray(legRef);
    var legDetail = {
      query: function() {return legDetails;},
      get: function(bill) {
        return $firebaseObject(legRef.child(bill.$id));
      }
    }
    return legDetail;
  };

})()
