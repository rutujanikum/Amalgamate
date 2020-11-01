import React, { useState, useEffect} from "react";
import Axios from 'axios';
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';
import bg from '../../public/images/followerbg.jpeg';

function Followers(props) {
  const [user_data, setUserData] = useState([]);
  //const [follower_id, setFollower] = useState(undefined);
  useEffect(() => {
    let url = "http://localhost:9000/api/get-followers?id=" +props.match.params.id;
    async function getUserData() {
      let data;
      await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        //credentials: "include", // to send cookies and other things over cross origin requests
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
        setUserData(data);
        console.log("data"+data[0]['id']);
      } else {
        console.log("Error");
      }
    });
  }, []);
  const acceptRequest = (data) => {
      Axios.post("http://localhost:9000/api/accept-req?id="+props.match.params.id,{
        follower_id: data, })
      .then(() => {
        alert("Request accepted");
      });
  };

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
        <h1 ><b>Your followers</b></h1>
        </Jumbotron>
      <form>    
      <CardColumns>
       {user_data.map(userdata => <div>
           
        <Card style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
        <Card.Header>
        Follower
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
          USER ID :{userdata.follower_id}<br/>
          
          </Card.Text>
          {console.log("accepted?----"+userdata.accept_req)}
          {
          userdata.accept_req === '0' &&
            <Button variant="btn btn-outline-info my-2 my-sm-0" onClick={()=>
              {/*setFollower(userdata.follower_id)*/
              acceptRequest(userdata.follower_id)}}>Accept</Button>
          }
          {
          userdata.accept_req === '1' &&
           <p>Following You</p>
          }
          <a
          className="btn btn-outline-primary my-2 my-sm-0"
          href={"/view-followerprofile/"+props.match.params.id+"/"+userdata.follower_id}
          >
            View Profile
          </a>
        </Card.Body>
      </Card>
      <br/>
      </div>)}
      </CardColumns>

      
     
    </form>
    </div>
    </div>
  );
}

export default Followers;