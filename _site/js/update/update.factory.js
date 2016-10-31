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

  .factory('LegislationOld', ['$firebaseArray', '$firebaseObject', legislation])
  //
  //
  //
  // .factory('LegislationCurrent', ['$firebaseObject', '$firebaseArray', legCurrent])

  .factory('ClearLegislation', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject){
    var clearFunc = {
      remove: function() {
        var firebaseUrl = "https://legitrack.firebaseio.com";
        var legRef = new Firebase(firebaseUrl + "/legislation");
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

        var LimsAll = $resource('http://lims.dccouncil.us/api/v1/Legislation/AdvancedSearch/', {}, {
          search: {method:'POST', isArray:true}
        })
        var LimsDetail = $resource('http://lims.dccouncil.us/api/v1/Legislation/Details/:id', {})

        var sessions = [
          // 8,9,10,11
          // 12,13,14,15
          16,17,18,19,20
        ];
        var billCats = [
        // [1,1]
        // [1,2],[1,3]
        // [1,4]
        // [2,5]
        // [2,6],[2,7]
        [2,8],[2,9]
        // [3,10]
        // [8,11],[11,13],[13,19]
      ]

        angular.forEach(sessions, function(session) {
          angular.forEach(billCats, function(cat) {
            console.log("Session: " + session + "; Category: " + cat)
            var bills = LimsAll.search({"CouncilPeriod":session, "CategoryId":cat[0], "SubCategoryId":cat[1]});
            bills.$promise.then(function($response){
              console.log($response);
              var billsData = $response;
              angular.forEach(billsData, function(bill){
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
                  };
                  var legRef = new Firebase(firebaseUrl + "/legislation/CouncilPeriod" + session);
                  legRef.child(bill.LegislationNumber).set(billData);
                })
              })
            })
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

    var billCats = [
      [1,1],
      [1,2],[1,3],
      [1,4],
      [2,5],
      [2,6],[2,7],
      [2,8],[2,9],
      [3,10],
      [8,11],[11,13],[13,19]
    ]

    var updateFunction = {
      updateAll: function(){
        angular.forEach(billCats, function(cat){
          console.log("Session: 21; Category: " + cat)
          var bills = LimsAll.search({"CouncilPeriod":21, "CategoryId":cat[0], "SubCategoryId":cat[1]});
          bills.$promise.then(function($response){
            console.log($response);
            var billsData = $response;
            angular.forEach(billsData, function(bill){
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
                var legRef = new Firebase(firebaseUrl + "/legislation/CouncilPeriod21");
                legRef.child(bill.LegislationNumber).set(billData);
              })
            })
          })
        })
      },
      updateRecent: function(lastDate){
        angular.forEach(billCats, function(cat){
          console.log("Session: 21; Category: " + cat)
          var bills = LimsAll.search({"CouncilPeriod":21, "CategoryId":cat[0], "SubCategoryId":cat[1], "StartDate":lastDate});
          bills.$promise.then(function($response){
            console.log($response);
            var billsData = $response;
            angular.forEach(billsData, function(bill){
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
                var legRef = new Firebase(firebaseUrl + "/legislation/CouncilPeriod21");
                legRef.child(bill.LegislationNumber).set(billData);
              })
            })
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
  function legislation($firebaseArray, $firebaseObject) {
    var legRef = new Firebase(firebaseUrl + "/legislation");
    var legDetails = $firebaseArray(legRef);
    var legDetail = {

      query: function(){
        return legDetails;
      },
      sessionQuery: function(session) {
        var sessionBills = legRef.child("CouncilPeriod" + session.Id);
        sessionBills.on('value', function(snapshot) {
          var length = snapshot.numChildren();
          console.log(length);
          session.count = length;
        });

        // console.log(session);
        // var sessionBills = $firebaseObject(legRef.child(session));
        // sessionBills.$loaded().then(function($response) {
        //   console.log($response);
        //   return $response;
        //   // return snapshot.val();
        // })
      },
      get: function(bill, session) {
        // var session =
        // var legRef = new Firebase(firebaseUrl + "/legislation/" + session);
        return $firebaseObject(legRef.child(bill.$id));
      }
    }
    return legDetail;
  };

})()
