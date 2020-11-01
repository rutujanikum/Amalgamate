import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';


function WriteDiary(props) {
    const [user_id, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState("");

    const submitData = () => {
       Axios.post("http://localhost:9000/api/add_diary?id=" +props.match.params.id, {
         user_id: user_id, 
         title: title,
         date: date,
         data: data,

        }).then(() => {
         alert(props.match.params.id);
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
        <h1>Write Diary</h1>
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
        <label>Data</label>
        <textarea type="text" name="data" className="form-control" onChange={(e)=>{
        setData(e.target.value)
        }}>
          </textarea> 
          <br/>
        <Button variant="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={submitData}>Submit</Button>
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

export default WriteDiary; 
