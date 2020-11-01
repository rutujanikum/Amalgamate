import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    //Link,
    Switch,
    Redirect,
  } from "react-router-dom";
import { Button} from 'react-bootstrap';

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
      
      <div>{
          delAcc == true &&
          <Redirect to = {{ pathname: "/login" }} />
      }
        <div className="container">
          <form>
            <div className="form-group">
                <h1>Are you Sure!!!</h1>
            <a
              href="/login"
              className="btn btn-success"
            >
              No! Go back to Dashboard:)
            </a>
            &nbsp;
            <Button
              className="btn btn-danger"
                onClick={DeleteAccount}
            >
              Yes, Delete my account:(
            </Button>
          
            </div>
          
          </form>
        </div>
      </div>
    );
  }

export default deleteAccount;