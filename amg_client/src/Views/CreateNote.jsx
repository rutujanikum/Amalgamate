import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import { Button } from 'react-bootstrap';


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
        {props.match.params.s_user_id}

        <h1>Create Notes</h1>
        <div className="form">
          <label>Title</label>
        <input type="text" name="title" onChange={(e)=>{
          setTitle(e.target.value)
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
        <Button variant="primary" type="submit" onClick={submitData}>Create</Button>
        <br/>
        </div>
        </div>
      </div>
    );
  
}

export default CreateNote; 
