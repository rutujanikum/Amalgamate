import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import { Button,Navbar,Nav ,Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Settings(props) {
    const [acc_privacy, setPrivacy] = useState("");
    const [follow_enable, setFollowEnable] = useState("");

    const submitData = () => {
       Axios.post("http://localhost:9000/api/change_settings?id=" +props.match.params.id, {
         acc_privacy: acc_privacy,
         follow_enable: follow_enable,

        }).then(() => {
         alert("Settings changed");
       });
    };

    return (

      <div className="App">
        <div className="container">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home"> <img src={require("../../public/images/logo.png")} class="rounded-circle" width="50" height="50" alt=""/>&nbsp;Amalgamate</Navbar.Brand>
          <Nav className="mr-auto">
            
          </Nav>
          <a
                  href={"/delete-my-account/" + props.match.params.id}
                  className="btn btn-outline-danger my-2 my-sm-0 pull-right"
                >
                  Delete Account
                </a>&nbsp;
          <a
                  href="/login"
                  className="btn btn-outline-info my-2 my-sm-0 pull-right"
                >
                  Dashboard
                </a>
            
        </Navbar>
        <hr/>
       <Jumbotron>
        <h1>Manage Settings</h1>
        </Jumbotron>
        <center>
        <div className="col-sm-6 ">
        <form>
        <div className="form-group">
        <label>Set Privacy(Default Public)</label>
        <br/>
        <select 
        name="acc_privacy" 
        style={{width: 500}}            
        className="form-control select-custom-class"
        onChange={(e)=>{
        setPrivacy(e.target.value)
        }}>
            <option value="">Select</option>
            <option value="public">public</option>
            <option value="private">private</option>
            <option value="protected">protected</option>
          </select> 
          <br/>
        <label>Follow Enable</label>
        <small id="msg" className="form-text text-muted">
        can people follow you? People who follow you will be able to view your public and protected data (not private data!)
          </small>
        <br/>

        <select 
        name="follow_enable" 
        style={{width: 500}}            
        className="form-control select-custom-class"
        onChange={(e)=>{
        setFollowEnable(e.target.value)
        }}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select> 
        <br/>
        <Button variant="btn btn-outline-info my-2 my-sm-0" type="submit" onClick={submitData}>Change Settings</Button>
        <br/>
        </div>
        </form>
        </div>
        </center>
       
       </div>
       </div>
    );
  
}

export default Settings; 
