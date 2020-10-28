import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import {Button} from 'react-bootstrap';

function SearchUser(props) {
  const [users, setUsers] = useState({
    user_id: undefined,
    s_user_id: undefined,
  });
  return (
    <div className="col-sm-6 ">
      <form>
        <div className="form-group">
        <a
            href="/login"
            className="btn btn-primary float-right"
          >
            Logout
          </a>
        <h1>Search User by USER ID</h1>
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
        </div>
            {console.log("....."+props.match.params.id)}
        <p>Do you have an account?</p>
        <a
          href={"/display-searched-user/"+users.user_id+"/"+users.s_user_id}
          className="btn btn-primary"
        >
         Search
        </a>
      </form>
    </div>
  );
}

export default SearchUser;