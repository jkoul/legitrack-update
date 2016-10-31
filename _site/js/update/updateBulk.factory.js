

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
