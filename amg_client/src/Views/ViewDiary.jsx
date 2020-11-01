import React, {useState, useEffect} from "react";
//import Axios from 'axios';
import { Card,Navbar,Nav,Jumbotron} from 'react-bootstrap';
import bg from '../../public/images/dbg3.jpg';
import bg1 from '../../public/images/diarybg.jpg';

const DisplayNotes = (props) => {
 // const [user_data, setUserData] = useState([]);
  const [diary, setDiary] = useState([]);
    useEffect(() => {
      let url = "http://localhost:9000/api/get-diary?id="+props.match.params.id;
      async function getUserData() {
        let data;
        await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          //credentials: "include", // to send cookies and other things over cross origin requests
        })
          .then((response) => response.json())
          .then((d) => {
            console.log("diary:", d);
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
          setDiary(data)
          console.log("data--"+data[0]['id']);
        } else {
          console.log("Error");
        }
      });
    }, []);
    

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
               href={"/write-diary/"+props.match.params.id}
              className="btn btn-outline-info my-2 my-sm-0 pull-right"
            >
              Write Diary
            </a>
         
        </Navbar>
        <Jumbotron  style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover' }}>
        <h1><b><u>Dear Diary</u></b></h1>
        </Jumbotron>
          <form>
            <div className="form-group">
            
            {diary.map(d =>  <div>
                <Card style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    
                    <b>Title: </b>{d.title}<br/>
                    <b>Date :</b>{d.date}<br/>
                      {d.data}<br/>
                     
                     
                    </Card.Text>
                  </Card.Body>
                </Card>
                <hr/>
                 </div>)}
                <br/>
               
              </div>
          </form>
        </div>
      </div>
    );
  }

export default DisplayNotes;