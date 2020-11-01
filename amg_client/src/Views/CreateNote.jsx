import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';


function CreateNote(props) {
    const [user_id, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState("");
    const [privacy, setPrivacy] = useState("");

    const submitData = () => {
       Axios.post("http://localhost:9000/api/insert_note?id=" +props.match.params.id, {
         user_id: user_id, 
         title: title,
         date: date,
         data: data,
         privacy: privacy

        }).then(() => {
         alert(user_id);
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
              href="/login"
              className="btn btn-outline-info my-2 my-sm-0 pull-right"
            >
              Dashboard
            </a>
            &nbsp;
        </Navbar>
        <br/>
        <center>
    <div className="col-sm-6 ">
      <Jumbotron>
        <h1>Create Note</h1>
        <hr/>
        <form>
        <div className="form-group">
       
        <div className="form">
          <label>Title</label>
        <input type="text" name="title" className="form-control" onChange={(e)=>{
          setTitle(e.target.value)
          setUserId(props.match.params.s_user_id)
        }}>
          </input> 
          <br/>
          <label>Date</label>
        <input type="date" name="date" className="form-control" onChange={(e)=>{
          setDate(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Privacy</label>
        <select name="privacy" className="form-control" onChange={(e)=>{
        setPrivacy(e.target.value)
        }}>
            <option value="private">private</option>
            <option value="protected">protected</option>
            <option value="public">public</option>
          </select> 
          <br/>
        <label>Data</label>
        <textarea type="text" name="data" className="form-control" onChange={(e)=>{
        setData(e.target.value)
        }}>
          </textarea> 
          <br/>
        <Button variant="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={submitData}>Create</Button>
        <br/>
        </div>
        </div>
        </form>
        </Jumbotron>
        </div>
      </center>
      </div>
      </div>
    );
  
}

export default CreateNote; 
