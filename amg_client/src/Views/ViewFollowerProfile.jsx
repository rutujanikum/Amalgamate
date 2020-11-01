import React, { useState, useEffect} from "react";
//import Axios from 'axios';
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';
function ViewFollowerProfile(props) {
    const [data, setData] = useState({
        user_data: [],
        research: []
      });
  useEffect(() => {
    let url = "http://localhost:9000/api/view-followerprofile?id=" +props.match.params.id+"&follower_id="+props.match.params.follower_id;
    async function getUserData() {
      let data;
      await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        credentials: "include", // to send cookies and other things over cross origin requests
      })
        .then((response) => response.json())
        .then((d) => {
          console.log("dashboard:", d);
          data = d;
        });
        /*.catch((error) => {
          data = null;
          console.error("Error:", error);
        });*/
      return data;
    }
    getUserData().then((data) => {
      if (data) {
        setData({user_data: data.user, research: data.research});
        console.log("data"+data[0]['id']);
      } else {
        console.log("Error");
      }
    });
  }, []);
  /*const searchUser = () => {
      Axios.post("http://localhost:3000/search-user",{
        id: props.user.id, })
      .then(() => {
        console.log("Going to search");
      });
  };*/

  return (
    <div className="Panel">
    <div className="container">
    <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home"> <img src={require("../../public/images/logo.png")} class="rounded-circle" width="50" height="50" alt=""/>&nbsp;Amalgamate</Navbar.Brand>
          <Nav className="mr-auto">
            
          </Nav>
          <a
              href="/login"
              className="btn btn-outline-info my-2 my-sm-0 pull-right"
            >
              Dashboard
            </a>
            &nbsp;
        </Navbar>
        <Jumbotron>
        <h1 ><b>Follower's Profile</b></h1><hr/>
        {
            data.user_data != undefined &&
        <p>
          <b>USER ID :</b> {" "+data.user_data.map(userdata => userdata.id)}<br/>
          <b>Name :</b> {" "+data.user_data.map(userdata => userdata.fname)+" "}
            {data.user_data.map(userdata => userdata.lname)}<br/>
          <b>CONTACT :</b> {" "+data.user_data.map(userdata => userdata.contact_no)}<br/>
          <b>EMAIL :</b> {" "+data.user_data.map(userdata => userdata.email)}<br/>
          <b>INTEREST :</b> {" "+data.user_data.map(userdata => userdata.interest)}<br/>
          <b>EDUCATION :</b> {" "+data.user_data.map(userdata => userdata.education)}
          </p>
        }
        </Jumbotron> 
      <form>
        <div className="form-group">
       
        {
            data.user_data == undefined &&
            <p>You do not follow this user</p>
        }
       </div>
       <Jumbotron><h1>Posts</h1><hr/>

      {data.research != undefined &&
      
              <CardColumns>
              {data.research.map(rs =>  <div>
                
                <Card>
                  <Card.Header>
                    {rs.topic}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        User Id: {rs.user_id}<br/>
                      Date :{rs.date}<br/><br/>
                      Data : {rs.data}<br/>
                      
                    </Card.Text>                 
                  </Card.Body>
                </Card>
                <br/>
                </div>)}
              </CardColumns>
        }
        </Jumbotron>
        </form>
    </div>
    </div>
  );
}

export default ViewFollowerProfile;