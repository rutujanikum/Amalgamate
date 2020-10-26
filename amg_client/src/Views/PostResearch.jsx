import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import { Button } from 'react-bootstrap';


function PostResearch(props) {
    const [user_id, setUserId] = useState("");
    const [title, setTopic] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState("");
    const [privacy, setPrivacy] = useState("");
    const [imgage, setImage] = useState("");

    const submitData = () => {
       Axios.post("http://localhost:9000/api/insert_research?id=" +props.match.params.id, {
         user_id: user_id, 
         topic: title,
         date: date,
         data: data,
         privacy: privacy,
         imgage: imgage

        }).then(() => {
         alert(props.match.params.id);
       });
    };

    return (

      <div className="App">
        <div className="container">
        {props.match.params.s_user_id}

        <h1>Post Research</h1>
        <div className="form">
          <label>Topic</label>
        <input type="text" name="topic" onChange={(e)=>{
          setTopic(e.target.value)
          setUserId(props.match.params.s_user_id)
        }}>
          </input> 
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
        <label>Data</label>
        <textarea type="text" name="data" onChange={(e)=>{
        setData(e.target.value)
        }}>
          </textarea> 
          <br/>
          <input type="file" name="image" onChange={(e)=>{
              setImage(e.target.value)
          }}></input>
          <br/>
        <Button variant="primary" type="submit" onClick={submitData}>Post</Button>
        <br/>
        </div>
        </div>
      </div>
    );
  
}

export default PostResearch; 
