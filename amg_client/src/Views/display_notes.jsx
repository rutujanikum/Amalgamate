import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { Button, Card, CardColumns, Nav, Navbar, Jumbotron} from 'react-bootstrap';
import bg from '../../public/images/note3.jpg';



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
            <a
              href={"/create-note/"+props.match.params.id}
              className="btn btn-outline-info my-2 my-sm-0 pull-right"
            >
              Create Note
            </a>
         
        </Navbar>
        <Jumbotron>
        <h1>Notes</h1>
        </Jumbotron>
          <form>
            <div className="form-group">
            </div>
              <CardColumns>
              {notes.map(note =>  <div>
            
                <Card style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
                  <Card.Header>
                   <b>{note.title}</b> 
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                     <b>Date :</b> {note.date}<br/>
                     <b>Data :</b>  {note.data}<br/>
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