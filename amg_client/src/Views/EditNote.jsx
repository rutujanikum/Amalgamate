import React, {useState, useEffect} from 'react';
import Axios from 'axios';
//import './formcss.css';
import { Button } from 'react-bootstrap';


function EditNote(props) {
    const [user_id, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState("");
    const [privacy, setPrivacy] = useState("");
    const [note, setNote] = useState([]);
    useEffect(() => {
      let url = "http://localhost:9000/api/get-note?id="+props.match.params.note_id+"&user_id="+props.match.params.id;
      async function getNote() {
        let data;
        await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          //credentials: "include", // to send cookies and other things over cross origin requests
        })
          .then((response) => response.json())
          .then((d) => {
            console.log("display_notes:", d);
            data = d;
          });
          /*.catch((error) => {
            data = null;
            console.error("Error:", error);
          });*/
        return data;
      } 
      getNote().then((data) => {
        if (data) {
          setNote(data)
          console.log("data--"+data[0]['id']);
        } else {
          console.log("Error");
        }
      });
    }, []);
  
    const submitData = () => {
       Axios.post("http://localhost:9000/api/update-note?id=" +props.match.params.note_id, {
         //user_id: user_id, 
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
        
        <a
          href={"/notes/" + props.match.params.id}
          className="btn btn-primary float-right"
        >
          Go Back!
        </a>

        <h1>Edit Note</h1>
        <p>Editing all fields is compulsary otherwise it will considered as empty fields</p>
        <div className="form">
        {note.map(notedata => <div>
            
            <label>Note ID</label>
            <input type="number" name="id" defaultValue={notedata.id} disabled required></input>
            <br/>
          <label>Title</label>
        <input type="text" name="title" defaultValue={notedata.title} onChange={(e)=>{
          setTitle(e.target.value)
          setUserId(props.match.params.s_user_id)
        }} required>
          </input> 
          <br/><br/>
          <label>Date</label>
        <input type="date" name="date" defaultValue={notedata.date} onChange={(e)=>{
          setDate(e.target.value)
        }} required>
          </input> 
          <br/>
          <label>Privacy</label>
        <select name="privacy" defaultValue={notedata.privacy} onChange={(e)=>{
        setPrivacy(e.target.value)
        }} required>
            <option value="private">private</option>
            <option value="protected">protected</option>
            <option value="public">public</option>
          </select> 
          <br/>
        <label>Data</label>
        <textarea type="text" name="data" defaultValue={notedata.data} onChange={(e)=>{
        setData(e.target.value)
        }} required>
          </textarea> 
          <br/>
          </div>)}
        <Button variant="primary" type="submit" onClick={submitData}>Edit</Button>
        <br/>
        </div>
        </div>
      </div>
    );
  
}

export default EditNote; 
