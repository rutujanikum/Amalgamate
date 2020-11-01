import React, { useState } from "react";
import { Nav,Navbar ,Jumbotron} from 'react-bootstrap';

function Login(props) {
  const [user_id, setUID] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container">
       <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home"> <img src={require("../../public/images/logo.png")} class="rounded-circle" width="50" height="50" alt=""/>&nbsp;Amalgamate</Navbar.Brand>
          <Nav className="mr-auto">
            
          </Nav>
          <a
              href="/registration"
              className="btn btn-outline-info my-2 my-sm-0 pull-right"
            >
              Sign Up
            </a>
            &nbsp;
        </Navbar><br/>
    <center>
    <div className="col-sm-6 ">
      <Jumbotron>
        <h1>USER LOGIN</h1>
        <hr/>
       
      <form>
        <div className="form-group">
          <label>User ID</label>
          <input
            type="text"
            className="form-control"
            name="user_id"
            placeholder="User ID"
            onChange={(e) => {
              setUID(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-outline-info my-2 my-sm-0"
          onClick={(e) => {
            e.preventDefault();
            let data = { user_id: user_id, password: password };
            props.onLogin(data);
          }}
        >
          Login
        </button>
      </form>
      </Jumbotron>
    </div>
    </center>
    </div>
  );
}

export default Login;