import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function Login(props) {
  const [user_id, setUID] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="col-sm-6 ">

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
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            let data = { user_id: user_id, password: password };
            props.onLogin(data);
          }}
        >
          Login
        </button>
        <p>Do you have an account?</p>
        <a
          href={"/registration"}
        >
          Create Account!
        </a>
      </form>
    </div>
  );
}

export default Login;