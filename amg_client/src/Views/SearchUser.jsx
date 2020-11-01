import React, { useState } from "react";
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';
//import {Button} from 'react-bootstrap';

function SearchUser(props) {
  const [users, setUsers] = useState({
    user_id: undefined,
    s_user_id: undefined, 
  });
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
        <center>
    <div className="col-sm-6 ">
      <form>
        <div className="form-group">
        <Jumbotron>
        <h1>Search User by USER ID</h1>
        <hr/>
          <label>User ID</label>
          <input
            type="text"
            className="form-control"
            name="user_id"
            placeholder="User ID"
            onChange={(e) => {
              setUsers({ s_user_id: e.target.value, user_id: props.match.params.id});
            }}
          />
          <br/>
        <a
          href={"/display-searched-user/"+users.user_id+"/"+users.s_user_id}
          className="btn btn-outline-info my-2 my-sm-0"
        >
         Search
        </a>
        </Jumbotron>
        </div>
      </form>
    </div>
    </center>
    </div>
  );
}

export default SearchUser;