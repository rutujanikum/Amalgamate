import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Settings(props) {
    const [user_id, setUserId] = useState("");
    const [acc_privacy, setPrivacy] = useState("");
    const [follow_enable, setFollowEnable] = useState("");

    const submitData = () => {
       Axios.post("http://localhost:9000/api/change_settings?id=" +props.match.params.id, {
         user_id: user_id, 
         acc_privacy: acc_privacy,
         follow_enable: follow_enable,

        }).then(() => {
         alert("Settings changed");
       });
    };

    return (

      <div className="App">
        <div className="container">
        <a
            href="/login"
            className="btn btn-primary float-right"
          >
            Dashboard
          </a>

        <h1>Manage Settings</h1>
        <div className="form">
        <form>
        <div className="form-group">
        <label style={{float: 'left'}} >Set Privacy(Default Public)</label>
        <br/>
        <select 
        name="acc_privacy" 
        style={{width: 500}}            
        className="form-control select-custom-class"
        onChange={(e)=>{
        setPrivacy(e.target.value)
        setUserId(props.match.params.s_user_id)
        }}>
            <option value="">Select</option>
            <option value="public">public</option>
            <option value="private">private</option>
            <option value="protected">protected</option>
          </select> 
          <br/>
        <label style={{float: 'left'}} >Follow Enable(can people follow you? People who follow you will be able to view your public and protected data (not private data!))</label>
        <br/>
        <select 
        name="follow_enable" 
        style={{width: 500}}            
        className="form-control select-custom-class"
        onChange={(e)=>{
        setFollowEnable(e.target.value)
        setUserId(props.match.params.s_user_id)
        }}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select> 
          <br/>
          <br/>
          
        <Button variant="primary" type="submit" onClick={submitData}>Change Settings</Button>
        <br/>
        </div>
        </form>
        </div>
        </div>
      </div>
    );
  
}

export default Settings; 
