import React, { useState, useEffect} from "react";
//import Axios from 'axios';
import { Card, CardGroup, CardColumns, Button} from 'react-bootstrap';
function Followers(props) {
  const [user_data, setUserData] = useState([]);
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
            href="/login"
          className="btn btn-primary float-right"
        >
          Logout
        </a>
    
        </div>
    <br/><br/>
      <CardColumns>
       {user_data.map(userdata => <div>
           
        <Card>
        <Card.Header>
        Follower
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
          USER ID :{userdata.follower_id}<br/>
          {
          userdata.accept_req === 0 &&
            <Button >Accept</Button>
          }
          {
          userdata.accept_req === 1 &&
           <p>Following You</p>
          }

          </Card.Text>
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