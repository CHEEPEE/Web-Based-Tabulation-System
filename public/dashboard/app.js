var sidenNaveElement  = document.getElementById('side-nav');
var mainElement = document.getElementById('main');
var nameElement = document.getElementById('username');
var name = "Momoland Nancy";
const tabulation  = "Tabulation"
const dashboard  ="Dashboard";
const announcements = "Announcements";
var datafeather = "data-feather";
var eventsRef = firebase.database().ref("event");

function renderTabulation(){
  ReactDOM.render(<MainTabulation />,mainElement);
  ReactDOM.render(
    <div>
      <SideNav ficon = "grid" cname = "nav-link" lname = {dashboard} eventc = {(e) => renderDashboard()} />
      <SideNav ficon = "grid" cname = "nav-link custom-active" lname = {tabulation} eventc = {(e) => renderTabulation()} />
      <SideNav ficon = "circle" cname = "nav-link" lname = {announcements}  eventc = {(e) => renderAnnouncements()}/>
    </div>
    ,sidenNaveElement);

}
function renderAnnouncements(){
  ReactDOM.render(<MainAnnouncement />,mainElement);
  ReactDOM.render(
    <div>
      <SideNav ficon = "grid" cname = "nav-link" lname = {dashboard} eventc = {(e) => renderDashboard()} />
      <SideNav ficon = "grid" cname = "nav-link " lname = {tabulation} eventc = {(e) => renderTabulation()} />
      <SideNav ficon = "circle" cname = "nav-link custom-active" lname = {announcements}  eventc = {(e) => renderAnnouncements()}/>
    </div>
    ,sidenNaveElement);

}
function renderDashboard(){
  ReactDOM.render(<MainDashboard />,mainElement);
  ReactDOM.render(
    <div>
      <SideNav ficon = "grid" cname = "nav-link custom-active" lname = {dashboard} eventc = {(e) => renderDashboard()}  />
      <SideNav ficon = "grid" cname = "nav-link " lname = {Tabulation} eventc = {(e) => renderTabulation()} />
      <SideNav ficon = "circle" cname = "nav-link " lname = {announcements}  eventc = {(e) => renderAnnouncements()}/>
    </div>
    ,sidenNaveElement);
}

class MainTabulation extends React.Component {
componentDidMount(){
  getEvents();
}

  render(){
  return(
    <div className ="container pt-5">
      <div className = "col-sm-12">
        <button type="button" className="btn btn-primary ml-2" data-toggle="modal" data-target="#exampleModalCenter">
        Add Event
        </button>
        <div  id="eventscontainer">

        </div>
      </div>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Add Event</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body ">

            <div className = "row pl-3 pr-3">
              <div className = "col-sm-12">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Event Name</span>
                  </div>
                  <input id = "eventname" type="text" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={(e) => writeEventName()} >Save changes</button>
          </div>
        </div>
      </div>
      </div>
    </div>

  );
  }
}
function MainAnnouncement(){
  return(
    <div className ="container">
      MainAnnouncement
    </div>
  );
}
function MainDashboard(){
  return(
    <div className ="container">
      Dashboard
    </div>
  );
}

function Nameclass(){
  return(
    <div className ="username">{name}</div>
  );
}


class SideNav extends React.Component{
  render(){
    return(
      <div>
        <a className={this.props.cname}  onClick ={this.props.eventc}><i data-feather = {this.props.ficon}></i>{this.props.lname}</a>
      </div>
    );
  }

}

class Getevents extends React.Component{

  delEvent(){
    deleteEvent(this.props.event_id);
    $("#confirmdelete"+this.props.event_id).modal('hide');
    getEvents();
  }
  addCriteria(){
    var idCriteria = "c-name"+this.props.event_id;
    var idPercent = "c-percent"+this.props.event_id;
    var criteriaName = document.getElementById(idCriteria);
    var criteriaPercent = document.getElementById(idPercent);
    console.log(criteriaName.value+" "+criteriaPercent.value);
  }
  componentDidMount(){
    feather.replace();
  }
  updateEventName(){
    var update = $("#eventname"+this.props.event_id).val();
    updateEventName(update,this.props.event_id);
  }

  render(){
    return(
      <div className="container-fluid col-sm-12 m-2 center" width="100%">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{this.props.event_name} <i className = "ml-3" data-toggle="modal" data-target={"#editeventname"+this.props.event_id} data-feather = "edit-3"></i></h5>
            {/* Edit Event title */}
            <div className="modal fade" id={"editeventname"+this.props.event_id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Event Name</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body ">
                  <div className = "row pl-3 pr-3">
                    <div className = "col-sm-12">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">Event Name</span>
                        </div>
                        <input id = {"eventname"+this.props.event_id} type="text" className="form-control" defaultValue = {this.props.event_name} placeholder="New name" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={this.updateEventName.bind(this)} >Save changes</button>
                </div>
              </div>
            </div>
            </div>
              {/* End Edit Event title modal */}
            <h6 className="card-subtitle mb-2 text-muted">{this.props.event_date}</h6>
            <div className="container-fluid col-sm-12">

            </div>
            {/* card body */}
            <div className = "container-fluid col-sm-12 m-2">

            <div className= "row">
              <div className="col-sm-5 m2">
                {/* Contestant Container */}
                <button type="button" className="btn btn-outline-primary mb-2" data-toggle="modal" data-target={"#addContestantModal"+this.props.event_id}>
                Add Contestant
                </button>
                {/* add Criteria modal */}
                <div className="modal fade" id={"addContestantModal"+this.props.event_id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">Contestant</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <div className = "row pl-3 pr-3">
                        <div className = "col-sm-12">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">Contestant Name</span>
                            </div>
                            <input id = {"c-name"+this.props.event_id} type="text" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                          </div>
                        </div>
                        <div className = "col-sm-12">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Description</span>
                            </div>
                            <textarea className="form-control" aria-label="With textarea"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" onClick = {this.addCriteria.bind(this)} className="btn btn-primary" >Save changes</button>
                    </div>
                  </div>
                </div>
                </div>
                  {/*End add Criteria modal */}

                {/* End Contestant Container */}
              </div>
              <div className="col-sm-5 m2">
                {/* Criteria Container */}
                <button type="button" className="btn btn-outline-primary mb-2" data-toggle="modal" data-target={"#addcriteriamodel"+this.props.event_id}>
                Add Criteria
                </button>

                {/* add Criteria modal */}
                <div className="modal fade" id={"addcriteriamodel"+this.props.event_id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">Add Criteria</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <div className = "row pl-3 pr-3">
                        <div className = "col-sm-9">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text" id="basic-addon1">Criteria Name</span>
                            </div>
                            <input id = {"c-name"+this.props.event_id} type="text" className="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
                          </div>
                        </div>
                        <div className = "col-sm-3">
                          <div className="input-group mb-3">
                            <input id={"c-percent"+this.props.event_id} type="text" className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                              <span className="input-group-text" id="basic-addon2">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" onClick = {this.addCriteria.bind(this)} className="btn btn-primary" >Save changes</button>
                    </div>
                  </div>
                </div>
                </div>

                  {/*End add Criteria modal */}

                {/* End Criteria Container */}
              </div>
            </div>
            <button type="button" className="btn btn-outline-danger mr-3" data-toggle="modal" data-target={"#confirmdelete"+this.props.event_id}>
            <i data-feather = "trash-2"></i> Delete
            </button>
            </div>
            {/* end card body */}

          {/* confirm event delete modal */}
          <div className="modal fade" id={"confirmdelete"+this.props.event_id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Confirm Delete</h5>
              </div>
              <div className="modal-body ">
                <p className = "flow-text">Are You Sure To Delete This Shit?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick = {this.delEvent.bind(this)} >Delete</button>
              </div>
            </div>
          </div>
          </div>
          {/* end confirm event delete modal */}
          </div>
        </div>
    </div>
    );
  }
}

  ReactDOM.render(<MainDashboard />,mainElement);
  ReactDOM.render(
    <div>
      <SideNav ficon = "grid" cname = "nav-link custom-active" lname = {dashboard} eventc = {(e) => renderDashboard()}  />
      <SideNav ficon = "grid" cname = "nav-link" lname = {tabulation} eventc = {(e) => renderTabulation()} />
      <SideNav ficon = "circle" cname = "nav-link" lname = {announcements}  eventc = {(e) => renderAnnouncements()}/>
    </div>
    ,sidenNaveElement);
      feather.replace();
function writeEventName(){
  var eventname = document.getElementById('eventname').value;
  var currentDate = getCurrentDate();
  var eventpostkey = firebase.database().ref().child('event').push().key;
  firebase.database().ref('events/'+eventpostkey).set({
    eventname:eventname,
    date:currentDate,
    key:eventpostkey
  });
  getEvents();
  $('#exampleModalCenter').modal('hide');
  $("#eventname").val("");
}

function getEvents(){
var eventString = [];
var eventsObjects = [];
var eventDate=[];
console.log("called getEvents");
var eventscontainer = document.getElementById("eventscontainer");
 firebase.database().ref("events").orderByChild("key").once('value',function(snapshot){
   snapshot.forEach(function(childsnapshot){
     console.log(childsnapshot.val());
     eventString.push(childsnapshot.val().eventname);
     eventsObjects.push(childsnapshot.val());
   });
  eventsObjects.reverse();
   var listItem = eventsObjects.map((eventObject) =>
     <Getevents event_id = {eventObject.key} event_name = {eventObject.eventname} event_date = {eventObject.date}/>
   );
   ReactDOM.render(
     <div className = "row">
     {listItem}</div>,eventscontainer
   );
 });

}
function getCriteria(){

}
function deleteEvent(event_id){
  console.log(event_id);
  return  firebase.database().ref("events/"+event_id).remove();
}

function updateEventName(name,key_id){

  firebase.database().ref('events/'+key_id).update({eventname:name});
  getEvents();
  var eventnameid = "#editeventname"+key_id;
  $(eventnameid).modal('hide');
  $(eventnameid).val("");
}
function writeCriteria(){

}
function getCurrentDate(){
  var d = new Date();
 return getMonthString(d.getMonth())+" "+("0" + (d.getDate())).slice(-2)+", "+d.getFullYear();
}
function getMonthString(month){

  switch(month) {
      case 0:
          return "January";
          break;
      case 1:
          return "Febuary";
          break;
      case 2:
          return "March";
          break;
      case 3:
          return "April";
          break;
      case 4:
          return "May";
          break;
      case 5:
          return "June";
          break;
      case 6:
          return "July";
          break;
      case 7:
          return "August";
          break;
      case 8:
          return "September";
          break;
      case 9:
          return "October";
          break;
    case 10:
        return "November";
        break;
    case 11:
        return "December";
        break;
      default:
          return "Month Doesnt Exist";
  }
}
