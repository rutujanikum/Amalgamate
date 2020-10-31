import React from "react";
import { useState } from "react";
import Axios from "axios";
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
             <a
              href="/login"
              className="btn btn-primary float-right"
            >
              Dashboard
            </a>
            <br/><br/>
            <h1>Post Research</h1>
            <form action="#">
               
                    <label htmlFor="name">Research Topic</label>
                    <input type="text" id="topic" onChange={(e)=>{
                        setTopic(e.target.value)
                        setUserId(props.match.params.id)
                    }}/>
                                <br/><br/>
                    <label>Date</label>
                    <input type="date" name="date" onChange={(e)=>{
                    setDate(e.target.value)
                    }}>
                    </input> 
                    <br/>
                    <label>Privacy</label>
                    <select name="privacy" onChange={(e)=>{
                    setPrivacy(e.target.value)
                    }}>
                        <option value="private">private</option>
                        <option value="protected">protected</option>
                        <option value="public">public</option>
                    </select> 
                    <br/>
                    <br/>
                    <label>Related to</label>
                    <select name="related" onChange={(e)=>{
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
                    <br/><br/>
                    <label>Data</label>
                    <textarea type="text" name="data" onChange={(e)=>{
                    setData(e.target.value)
                    }}>
                    </textarea> 
                    <br/><br/>
                    <label htmlFor="file">File</label>
                    <input type="file" id="file"  onChange={(e)=>{
                        setFile(e.target.files[0])
                    }}/>
               
              <br/>
            </form>
            <button onClick={Send}>Send</button>
            </div>
        </div>
    );
}

export default PostResearch;