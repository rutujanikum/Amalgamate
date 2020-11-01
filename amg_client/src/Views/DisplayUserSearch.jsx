import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';

const DisplayUsers = (props) => {
 // const [user_data, setUserData] = useState([]);
  const [user, setUser] = useState({
    user_data: [],
    follow: true
  });
    useEffect(() => {
      let url = "http://localhost:9000/api/search-user?id=" +props.match.params.s_user_id+"&follower_id="+props.match.params.user_id;
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
          setUser({user_data: data.result, follow: data.follow});
          console.log("data"+data[0]['id']);
        } else {
          console.log("Error");
        }
      });
    }, []);
    const followUser = () => {
      Axios.post("http://localhost:9000/api/follow_user?user_id=" +props.match.params.s_user_id+"&follower_id="+props.match.params.user_id, {})
      .then(() => {
        alert(props.match.params.s_user_id);
      });
   };

  return (
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
        <form>
          <div className="form-group">
          <Jumbotron>
        <h1>User's Profile</h1>
        {console.log("user----"+user.user_data[0])}
        <hr/>
        {
            user.user_data != undefined &&
        <p>
          <b>USER ID :</b> {" "+user.user_data.map(userdata => userdata.id)}<br/>
          <b>Name :</b> {" "+user.user_data.map(userdata => userdata.fname)+" "}
            {user.user_data.map(userdata => userdata.lname)}<br/>
          <b>CONTACT :</b> {" "+user.user_data.map(userdata => userdata.contact_no)}<br/>
          <b>EMAIL :</b> {" "+user.user_data.map(userdata => userdata.email)}<br/>
          <b>INTEREST :</b> {" "+user.user_data.map(userdata => userdata.interest)}<br/>
          <b>EDUCATION :</b> {" "+user.user_data.map(userdata => userdata.education)}
          </p>
          
        }
        { user.follow &&
            <Button variant="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={followUser} >Follow</Button>
            }
            {
              !user.follow &&
              <p>You are following or reuested to follow</p>
            }
        
            </Jumbotron>
      </div>
      </form>
      </div>
      
    );
  }

export default DisplayUsers;