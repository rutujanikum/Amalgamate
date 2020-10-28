import React, { useState, useEffect} from "react";
//import Axios from 'axios';
import { Card } from 'react-bootstrap';
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
    <div className="Panel">
    <div className="container">
      <form>
        <div className="form-group">
        <a
            href={"/settings/" + props.user.id}
            className="btn btn-primary float-right"
          >
            settings
          </a>&nbsp;
        
        </div>
    
      <h1>Welcome! 
          {" "+user_data.map(userdata => userdata.fname)+" "}
          {user_data.map(userdata => userdata.lname)}</h1>
      <Card>
        <Card.Header>
        Basic Information
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
          USER ID : {user_data.map(userdata => <div>{userdata.id}</div>)}
          CONTACT : {user_data.map(userdata => <div>{userdata.contact_no}</div>)}
          EMAIL : {user_data.map(userdata => <div>{userdata.email}</div>)}
          INTEREST : {user_data.map(userdata => <div>{userdata.interest}</div>)}
          EDUCATION : {user_data.map(userdata => <div>{userdata.Education}</div>)}
          </Card.Text>
        </Card.Body>
      </Card>
      <br/>
      <a
          href={"/notes/" + props.user.id}
          className="btn btn-primary float-left"
        >
          Notes
        </a>
        <a
          href={"/diary/" + props.user.id}
          className="btn btn-primary float-left"
        >
          Diary
        </a>
        <a
          href={"/posts/" + props.user.id}
          className="btn btn-primary float-right"
        >
          Posts
        </a>
        <a
          href={"/view-followers/" + props.user.id}
          className="btn btn-primary float-left"
        >
          followers
        </a>
        <a
          href={"/explore/" + props.user.id}
          className="btn btn-primary float-left"
        >
          Explore!
        </a>
      <a
          href={"/search-user/" + props.user.id}
          className="btn btn-primary float-right"
        >
          Search User
        </a>
        </form>
    </div>
    </div>
  );
}

export default Dashboard;