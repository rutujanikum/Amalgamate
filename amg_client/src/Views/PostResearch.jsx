import React from "react";
import { useState } from "react";
import Axios from "axios";
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';
//import ritu from '../../public/1603820905552-Screenshot from 2020-10-27 20-06-05.png'

function PostResearch(props) {
    const [user_id, setUserId] = useState();
    const [topic, setTopic] = useState();
    const [date, setDate] = useState();
    const [data1, setData] = useState();
    const [file, setFile] = useState();
    const [privacy, setPrivacy] = useState();
    const [related, setRelated] = useState();
    //const [imgsrc, Setimgscr] = useState();
    const Send = (e) => {
        const data = new FormData();
        data.append("user_id",user_id);
        data.append("topic",topic);
        data.append("date",date);
        data.append("data",data1);
        data.append("privacy",privacy);
        data.append("related",related);
        data.append("file",file);   //attach file at last
        Axios.post("http://localhost:9000/api/upload", data)
        .then(() => {
            alert("success");
          });
        console.log(data);
    };
    
    return (
        <div className="PostResearch">
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
        <h1>New Post</h1>
        <hr/>
        
      <form>
        <div className="form-group">
                    <label htmlFor="name">Research Topic</label>
                    <input type="text" id="topic" className="form-control" onChange={(e)=>{
                        setTopic(e.target.value)
                        setUserId(props.match.params.id)
                    }}/>
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
                    
                    <label>Related to</label>
                    <select name="related" className="form-control" onChange={(e)=>{
                    setRelated(e.target.value)
                    }}>
                        <option value="computer_science">Computer Science</option>
                        <option value="robotics">Robotics</option>
                        <option value="electrical">Electrical</option>
                        <option value="mechanical">Mechanical</option>
                        <option value="telecommunication">Telecommunication</option>
                        <option value="space">Space</option>
                        <option value="music">Music</option>
                        <option value="choreography">Choreography</option>
                        <option value="politics">Politics</option>
                    </select> 
                    <br/> 
                    <label>Data</label>
                    <textarea type="text" name="data" className="form-control" onChange={(e)=>{
                    setData(e.target.value)
                    }}>
                    </textarea> 
                    <br/>
                    <label htmlFor="file">File</label>
                    <input type="file" id="file" className="form-control" onChange={(e)=>{
                        setFile(e.target.files[0])
                    }}/>
               
              <br/>
            
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={Send}>Send</button>
            </div>
            </form>
            </Jumbotron>
        </div>
       
        </center>
        </div>
        </div>
    );
}

export default PostResearch;