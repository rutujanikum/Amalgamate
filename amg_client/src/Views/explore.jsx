import React, {useState, useEffect} from "react";
//import Axios from 'axios';
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';
import bg from '../../public/images/research.jpeg';

const DisplayResearch = (props) => {
 // const [user_data, setUserData] = useState([]);
  const [research, setResearch] = useState([]);
    useEffect(() => {
      let url = "http://localhost:9000/api/explore";
      async function getallResearch() {
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
      getallResearch().then((data) => {
        if (data) {
          setResearch(data)
          console.log("data--"+data[0]['id']);
        } else {
          console.log("Error");
        }
      });
    }, []);
    
    const imageurl="../../../server_amg/public/images/";
    //const img1="a.jpg"
  return (
      <div styles={{ backgroundImage:`url(${bg})` }}>
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
          <form>
            <div className="form-group">
            
            </div>
            <Jumbotron>
            <h1>Explore Amalgamate</h1>
            <hr/>
              <CardColumns>
              {research.map(rs =>  <div>
            
                <Card bg="secondary" text="white">
                  <Card.Header>
                    {rs.topic}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    <b>User ID:</b>{rs.user_id}<br/>
                    <b>Date:</b>{rs.date}<br/><br/>
                    <b>-----Data-----</b><br/>{rs.data}<br/>
                      
                    </Card.Text>
                    {console.log("URL => "+imageurl+rs.img)}
                  </Card.Body>
                </Card>
                <br/>
                </div>)}
              </CardColumns>
              </Jumbotron>
          </form><br/><br/>
          
        </div>
      </div>
    );
  }

export default DisplayResearch;