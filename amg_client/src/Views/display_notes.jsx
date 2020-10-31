import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { Button, Card, CardColumns} from 'react-bootstrap';

const DisplayNotes = (props) => {
 // const [user_data, setUserData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteid, setNoteId] = useState(undefined);
    useEffect(() => {
      let url = "http://localhost:9000/api/get-allnotes?id="+props.match.params.id;
      async function getUserData() {
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
      getUserData().then((data) => {
        if (data) {
          setNotes(data)
          console.log("data--"+data[0]['id']);
        } else {
          console.log("Error");
        }
      });
    }, []);

    const DeleteNote = (data) => {
      Axios.post("http://localhost:9000/api/delete-note?id="+data)
      .then(() => {
        alert("Note Deleted");
      });
  };
    

  return (
      <div>
        <div className="container">
          <form>
            <div className="form-group">
            <a
              href="/login"
              className="btn btn-primary float-right"
            >
              Dashboard
            </a>

            <a
              href={"/create-note/"+props.match.params.id}
              className="btn btn-primary float-right"
            >
              Create Note
            </a>
          
            </div>
            <br/>
            <h1>-: Your notes :-</h1>
              <CardColumns>
              {notes.map(note =>  <div>
            
                <Card>
                  <Card.Header>
                    {note.title}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                      Date :{note.date}<br/>
                      Data : {note.data}<br/>
                      <br/><br/>
                      <a 
                      className="btn btn-info"
                      href={"/edit-note/"+props.match.params.id+"/"+note.id}
                      >Edit</a>&nbsp;&nbsp;
                      <Button className="btn btn-danger" onClick={()=>
                        { setNoteId(note.id)
                          DeleteNote(note.id)
                        }}>Delete</Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br/>
                </div>)}
              </CardColumns>
          </form>
        </div>
      </div>
    );
  }

export default DisplayNotes;