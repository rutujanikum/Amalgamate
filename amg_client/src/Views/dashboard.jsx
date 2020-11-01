import React, { useState, useEffect} from "react";
//import Axios from 'axios';
import { Card, CardColumns, Nav,Navbar,Button, Jumbotron } from 'react-bootstrap';
import bg from '../../public/images/bg.jpg';

function Dashboard(props) {
  const [user_data, setUserData] = useState([]);
  useEffect(() => {
    let url = "http://localhost:9000/api/getUserInfo?id=" +props.user.id;
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
        setUserData(data);
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
    
    <div>
      
    <div className="container">
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home"> <img src={require("../../public/images/logo.png")} class="rounded-circle" width="50" height="50" alt=""/>&nbsp;Amalgamate</Navbar.Brand>
    <Nav className="mr-auto">
      
    </Nav>
    <a
            href={"/settings/" + props.user.id}
            className="btn btn-outline-info my-2 my-sm-0 pull-right"
          >
            settings
          </a>&nbsp;
    <button
          className="btn btn-outline-info my-2 my-sm-0 pull-right"
          onClick={(e) => {
            e.preventDefault();
            props.onLogout();
          }}
        >
          Logout
      </button>
      
  </Navbar>
    

     {console.log("Inside dashboard---"+props.user.id)}
      <form>
       <br/>
       <Jumbotron style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
       <h1 style={{ color: 'white' }}>Welcome! 
          {" "+user_data.map(userdata => userdata.fname)+" "}
          {user_data.map(userdata => userdata.lname)}</h1>
         
        <hr/>
       
       <a
          href={"/notes/" + props.user.id}
          className="btn btn-outline-success my-2 my-sm-0"
        >
          Notes
        </a>
        &nbsp;&nbsp;
        <a
          href={"/diary/" + props.user.id}
          className="btn btn-outline-light my-2 my-sm-0"
        >
          Diary
        </a>
        &nbsp;&nbsp;
        <a
          href={"/posts/" + props.user.id}
          className="btn btn-outline-info my-2 my-sm-0"
        >
          Posts
        </a>
        &nbsp;&nbsp;
        <a
          href={"/view-followers/" + props.user.id}
          className="btn btn-outline-success my-2 my-sm-0"
        >
          followers
        </a>
        &nbsp;&nbsp;
        <a
          href={"/explore/" + props.user.id}
          className="btn btn-outline-light my-2 my-sm-0"
        >
          Explore!
        </a>
        &nbsp;&nbsp;
      <a
          href={"/search-user/" + props.user.id}
          className="btn btn-outline-info my-2 my-sm-0"
        >
          Search User
        </a>
       <hr/>
       <p style={{ color: 'white' }}>
          <b>USER ID :</b> {" "+user_data.map(userdata => userdata.id)}<br/>
          <b>CONTACT :</b> {" "+user_data.map(userdata => userdata.contact_no)}<br/>
          <b>EMAIL :</b> {" "+user_data.map(userdata => userdata.email)}<br/>
          <b>INTEREST :</b> {" "+user_data.map(userdata => userdata.interest)}<br/>
          <b>EDUCATION :</b> {" "+user_data.map(userdata => userdata.education)}<br/>
          </p>
      </Jumbotron>


        </form>
    </div>
    </div>
  );
}

export default Dashboard;