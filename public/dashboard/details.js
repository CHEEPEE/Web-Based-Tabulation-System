
var urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams.get('eventid'));

var event_id = urlParams.get('eventid');
var mainContainer = document.getElementById("mainContainer");
getEvent();
function getEvent(){
  firebase.database().ref("events").child(event_id).once("value",function (dataSnapshot){
    console.log(dataSnapshot.val())
    ReactDOM.render(
      <MainContainer eventname = {dataSnapshot.val().eventname}/>,mainContainer
    );
  });
}


class MainContainer extends React.Component{
  componentDidMount(){
    getCotestants();
    firebase.database().ref().on("child_changed",function (dataSnapshot){
      getCotestants();
    });
  }
  printpage(){
    window.print();
  }

  render() {
    return(
      <div className = "w-100">
        <div className ="row mt-5">
          <div className = "col">
            <h1>{this.props.eventname}</h1>
          </div>
          <div className = "col">
            <button type="button" onClick = {this.printpage.bind(this)}className="btn btn-outline-info m-1 d-print-none">Print Results</button>
          </div>
        </div>
        <div id = "contestantList" className = "row mt-5">

        </div>
        <div className = "row mar200Top" id = "judgeListSign">

        </div>
      </div>
    )
  }
}


function getCotestants(){
  var id = event_id;
  var container = document.getElementById("contestantList");
  var totalRatingContainer = document.getElementById("totalRating"+id);
  var contestantObjecs = [];
  var resultsFinalObjects = [];
  firebase.database().ref("candidates").child(id).once("value",function (dataSnapshot){
    dataSnapshot.forEach(function (childsnapshot){
      contestantObjecs.push(childsnapshot.val());
      var total = 0;
      var judgeNumber = 0;
      firebase.database().ref("resultTotal")
      .child("event"+childsnapshot.val().eventid)
      .child("contestant"+childsnapshot.val().contestantid).once("value",function (resultDataSnapshot){
        resultDataSnapshot.forEach(function (resultChild){

          total +=resultChild.val().totalRating;
          judgeNumber++;
          console.log("results "+resultChild.val().totalRating);

        });
        var rating = {};
        if (isNaN(total/judgeNumber)) {
          rating.rate = 0;
        }else {
          rating.rate = total/judgeNumber;
        }
        rating.contestantId = childsnapshot.val().contestantid;
        rating.contestantname = childsnapshot.val().contestantname;
        resultsFinalObjects.push(rating);
        console.log(rating);

        resultsFinalObjects.sort(function(a,b){
          return a.rate - b.rate;
        });
        resultsFinalObjects.reverse();
        for(var i in resultsFinalObjects){
          console.log("sorted "+i+" "+resultsFinalObjects[i].rate);
        }

        var listItem = resultsFinalObjects.map((objects,index)=>
          <Contestant key = {objects.contestantId} id = {objects.contestantId} index = {index+1} contestantname ={objects.contestantname} rating ={Math.round(objects.rate * 100)/100}/>
        );

        ReactDOM.render(
          <React.Fragment>
            {listItem}
          </React.Fragment>,container
        )
    });
  });
});
}

class Judges extends React.Component{
  componentDidMount(){
    getRatings(this.props.contestantid,this.props.id);
    var contestantid = this.props.contestantid;
    var judgeid = this.props.id;
    firebase.database().ref().on("child_changed",function (dataSnapshot){
        getRatings(contestantid,judgeid);
    });
    firebase.database().ref().on("child_added",function (dataSnapshot){
          getRatings(contestantid,judgeid);
    });
  }
  render() {
    return(
      <div className ="mt-3">
        <div className = "row w-75">
          <div className = "col text-success">
            <small className = "text-muted">Judge Name</small>
            <h3>{this.props.judgeName}</h3>
          </div>
          <div className  = "col">
          <div className = "row mt-2">
           <small  className = "text-muted">Judge Rating</small>
          </div>
          <div id = {"judgeRating"+this.props.contestantid+this.props.id} className = "row">

          </div>
          </div>
          
        </div>
        <small  className = "text-info">Criteria</small>
        <div id = {"criteriaRatings"+this.props.contestantid+this.props.id} className = "row">

        </div>
      </div>
    )
  }
}

class CriteriaRating extends React.Component{
  componentDidMount(){
    var container = document.getElementById("criterianame"+this.props.contestantid+this.props.judgeid+this.props.id);
    firebase.database().ref("criteria").child(event_id).child(this.props.id).once("value",function(dataSnapshot){
      ReactDOM.render(
        <div className = "w-100">{dataSnapshot.val().criteriaName+" - ("+dataSnapshot.val().criteriaPercentage+"%)"}</div>,container
      );
    });
  }
  render() {
    return(
      <div className ="row w-75">
        <div id = {"criterianame"+this.props.contestantid+this.props.judgeid+this.props.id} className ="col">

        </div>
        <div className = "col text-truncate">
          {this.props.rating}
        </div>
      </div>
    )
  }
}

function getjudges(id){
 var container = document.getElementById("judgesContainer"+id);
 var judgesObjects = [];
 firebase.database().ref("judges").child(event_id).once("value",function (dataSnapshot){
   dataSnapshot.forEach(function (childsnapshot){
     judgesObjects.push(childsnapshot.val());
   });
   var listItem = judgesObjects.map((objects)=>
   <Judges key={objects.judgeId} contestantid = {id} judgeName = {objects.judgeName} id ={objects.judgeId}/>
  );
  var listItemJudgeSign = judgesObjects.map((objects)=>
  <JudgeItemSign key={objects.judgeId} contestantid = {id} judgeName = {objects.judgeName} id ={objects.judgeId}/>
 );
 ReactDOM.render(
   <React.Fragment>
     {listItemJudgeSign}
   </React.Fragment>,document.getElementById("judgeListSign")
 )
  ReactDOM.render(
    <div className = "container">
      {listItem}
    </div>,container
  )
 });
}

function getRatings(contestantid,judgeid){
  var container = document.getElementById("criteriaRatings"+contestantid+judgeid);
  var criteriaobjects = [];
  firebase.database().ref("ratings").child("event"+event_id).child("contestant"+contestantid).child("judge"+judgeid).once("value",function(dataSnapshot){
    dataSnapshot.forEach(function (childsnapshot){
      criteriaobjects.push(childsnapshot.val());
    });
    var listItem = criteriaobjects.map((objects)=>
      <CriteriaRating key = {objects.criteriaId} id = {objects.criteriaId} contestantid={contestantid} judgeid = {judgeid} rating = {objects.rating}/>
    );
    ReactDOM.render(
      <div className = "container">
        {listItem}
      </div>,container
    )
  });

  var totalRatingContainer = document.getElementById("judgeRating"+contestantid+judgeid);

  firebase.database().ref("resultTotal").child("event"+event_id).child("contestant"+contestantid).child("judge"+judgeid).once("value",function(dataSnapshot){
    ReactDOM.render(
      <h3 className = "text-success">{Math.round(dataSnapshot.val().totalRating*100)/100}</h3>,totalRatingContainer
    );
  });

}

class Contestant extends React.Component{
  componentDidMount(){
    getjudges(this.props.id);
  }
  render() {
    return(
      <div className = "col-sm-6 mt-5">
        <div className = "row w-100">
          <div className = "col-sm-6">
              <div className = "text-danger">{"Rank #"+this.props.index}</div>
             <h2 className = "text-capitalize font-weight-light text-danger">{this.props.contestantname}</h2>
          </div>
          <div className = "col-sm-4 mt-2">
          <div className = "text-danger">Final Rating</div>
            <h1 className = "text-danger">{this.props.rating} %</h1>
          </div>
        </div>
        <div id = {"judgesContainer"+this.props.id} className = "row">

        </div>
      </div>
    )
  }
}




class JudgeItemSign extends React.Component{
  render(){
    return(
      <div className = "col-sm-3 border-top border-dark m-3 text-center">
        <h4>{this.props.judgeName}</h4>
      </div>
    );
  }
}
