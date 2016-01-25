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

  // .factory('LegislationOld', ['$firebaseObject','$firebaseArray', legOld])
  //
  //
  //
  // .factory('LegislationCurrent', ['$firebaseObject', '$firebaseArray', legCurrent])

  .factory('ClearLegislation', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){
    var clearFunc = {
      remove: function() {
        var firebaseUrl = "https://legitrack.firebaseio.com";
        var legRef = new Firebase(firebaseUrl + "/legislation/20");
        var legDetails = $firebaseArray(legRef);
        legDetails.$loaded().then(function($response) {
          angular.forEach($response, function(bill) {
            var obj = $firebaseObject(legRef.child(bill.$id));
            obj.$remove().then(function(bill){
              console.log("bill" + bill.$id + "removed")
            }, function(error) {
              console.log("Error:", error);
            });
          })
        })
      }
    }
    return clearFunc;
  }])

  .factory('Sessions', ['$resource', function($resource) {
    return $resource('http://lims.dccouncil.us/api/v1/masters/CouncilPeriods/', {});
  }])

  var firebaseUrl = "https://legitrack.firebaseio.com";

  function runUpdateOld($resource, $firebaseObject, $firebaseArray) {
    // saved = 0
    var updateFunction = {
      update: function(){
        // var sessions = [8,9,10,11,12,13,14,15,16,17,18,19,20]
        var LimsAll = $resource('http://lims.dccouncil.us/api/v1/Legislation/AdvancedSearch/', {}, {
          search: {method:'POST', isArray:true}
        })
        var LimsDetail = $resource('http://lims.dccouncil.us/api/v1/Legislation/Details/:id', {})
        var bills = LimsAll.search({"CouncilPeriod":20, "CategoryId":13});
        bills.$promise.then(function($response){
          console.log($response);
          var billsData = $response;
          angular.forEach(billsData, function(bill){
            if(bill.CouncilPeriod < 21) {
              var getBill = LimsDetail.get({id: bill.LegislationNumber});
              getBill.$promise.then(function($response){
                var billData = {
                  "CommitteeMarkup": $response.CommitteeMarkup,
                  "CongressReview": $response.CongressReview,
                  "CouncilReview": $response.CouncilReview,
                  "Hearing": $response.Hearing,
                  "Legislation": $response.Legislation,
                  "LinkedLegislations": $response.LinkedLegislations,
                  "MayorReview": $response.MayorReview,
                  "OtherDocuments": $response.OtherDocuments,
                  "VotingSummary": $response.VotingSummary,
                }
                var legRef = new Firebase(firebaseUrl + "/legislation/20");
                console.log(billData);
                legRef.child(bill.LegislationNumber).set(billData);
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
    var LimsAll = $resource('http://lims.dccouncil.us/api/v1/Legislation/AdvancedSearch/', {}, {
      search: {method:'POST', isArray:true}
    })
    var LimsDetail = $resource('http://lims.dccouncil.us/api/v1/Legislation/Details/:id', {})
    var bills = LimsAll.search({"CouncilPeriod":21});
    var updateFunction = {
      update: function(){
        bills.$promise.then(function($response){
          var billsData = $response;
          angular.forEach(billsData, function(bill){
            if(bill.CouncilPeriod == 21) {
              var getBill = LimsDetail.get({id: bill.LegislationNumber});
              getBill.$promise.then(function($response){
                var billData = {
                  "CommitteeMarkup": $response.CommitteeMarkup,
                  "CongressReview": $response.CongressReview,
                  "CouncilReview": $response.CouncilReview,
                  "Hearing": $response.Hearing,
                  "Legislation": $response.Legislation,
                  "LinkedLegislations": $response.LinkedLegislations,
                  "MayorReview": $response.MayorReview,
                  "OtherDocuments": $response.OtherDocuments,
                  "VotingSummary": $response.VotingSummary,
                }
                var legRef = new Firebase(firebaseUrl + "/legislation/21");
                legRef.child(bill.LegislationNumber).set(billData);
                console.log($response);
                // saved++
              })
            }
          })
        })
      }
    }
    return updateFunction;
  }

  // function legOld($firebaseArray, $firebaseObject){
  //   var legRef = new Firebase(firebaseUrl + "/legislation/old");
  //   legislation($firebaseArray, $firebaseObject, legRef);
  // }
  //
  // function legCurrent($firebaseArray, $firebaseObject){
  //   var legRef = new Firebase(firebaseUrl + "/legislation/current");
  //
  // }
  //
  function legislation($firebaseArray, $firebaseObject, legRef) {
    var legRef = new Firebase(firebaseUrl + "/legislation");
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
