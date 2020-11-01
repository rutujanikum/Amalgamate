import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    //Link,
    Switch,
    Redirect,
  } from "react-router-dom";
import { Button,Card,Nav,Navbar} from 'react-bootstrap';
import bg from '../../public/images/bg1.jpg';

const deleteAccount = (props) => {
 const [delAcc, setDelete] = useState(false);

 /*const DeleteAccount = () => {
    Axios.post("http://localhost:9000/api/delete-account?id="+props.match.params.id)
    .then(() => {
        setDelete(true);
        alert("account deleted :(");
    });
};*/

const DeleteAccount = () => {
    let  url = "http://localhost:9000/api/delete-account?id="+props.match.params.id;
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "include", // to send cookies and other things over cross origin requests
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setDelete(true);
        alert("account deleted :(");
      })
     /* .catch((error) => {
        console.log("Error:", error);
      });*/
  };

  return (
      
      <div> {
          delAcc == true &&
          <Redirect to = {{ pathname: "/login" }} />
      }
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
              <br/><br/>
              <Card bg="secondary">
              <Card.Header>
                <h1>Are you Sure!!!</h1>
                </Card.Header>
                <Card.Body>
            <a
              href="/login"
              className="btn btn-success my-2 my-sm-0"
            >
              No! Go back to Dashboard:)
            </a>
            &nbsp;
            <Button
              variant="btn btn-danger my-2 my-sm-0"
                onClick={DeleteAccount}
            >
              Yes, Delete my account:(
            </Button>
            </Card.Body>
            </Card>
            </div>
          
          </form>
        </div>
      </div>
    );
  }

export default deleteAccount;