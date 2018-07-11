
var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('eventid'));

var event_id = urlParams.get('eventid');

firebase.database().ref("candidates").child(event_id).once('value', function (snapshot) {
  snapshot.forEach(function (childsnapshot) {
    // candidateObjects.push(childsnapshot.val());
    console.log(childsnapshot.val());
  });
  // var candidateListItem = candidateObjects.map((canidateObj) =>
  //   <Candidates key={canidateObj.contestantid} contestantid={canidateObj.contestantid} eventid={canidateObj.eventid} candidatedescription={canidateObj.contestantDescription} candidatename={canidateObj.contestantname} />
  // );
  // ReactDOM.render(
  //   <div className="list-group mt-2 mb-2">
  //     {candidateListItem}
  //   </div>, candidateContainer
  // )
  
});
