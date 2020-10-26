import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Button, Card} from 'react-bootstrap';

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
    <div>
      <h1>Search user{props.match.params.s_user_id}</h1>
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
        </form>
        <h1>Welcome! 
            {" "+user.user_data.map(userdata => userdata.fname)+" "}
            {user.user_data.map(userdata => userdata.lname)}</h1>
        {console.log("user----"+user.user_data[0])}
        <Card>
          <Card.Header>
          Basic Information
          </Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
            USER ID : {user.user_data.map(userdata => <div>{userdata.id}</div>)}
            CONTACT : {user.user_data.map(userdata => <div>{userdata.contact_no}</div>)}
            EMAIL : {user.user_data.map(userdata => <div>{userdata.email}</div>)}
            INTEREST : {user.user_data.map(userdata => <div>{userdata.interest}</div>)}
            EDUCATION : {user.user_data.map(userdata => <div>{userdata.Education}</div>)}
            </Card.Text>
            { user.follow &&
            <Button variant="primary" type="submit" onClick={followUser} >Follow</Button>
            }
          </Card.Body>
        </Card>
            {
              !user.follow &&
              <p>You are following</p>
            }
      </div>
      </div>
      </div>
    );
  }

export default DisplayUsers;