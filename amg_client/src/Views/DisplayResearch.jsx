import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Card, CardColumns, Button, Navbar,Nav,Jumbotron} from 'react-bootstrap';
import bg from '../../public/images/postbg.jpeg';
import bg1 from '../../public/images/postbg.jpg';

const DisplayResearch = (props) => {
 // const [user_data, setUserData] = useState([]);
  const [research, setResearch] = useState([]);
  const [images, setImages] = useState({
    images: {

    }
  });
    useEffect(() => {
      let url = "http://localhost:9000/api/get-allposts?id="+props.match.params.id;
      async function getResearch() {
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
      getResearch().then((data) => {
        if (data) {
          setResearch(data)
          console.log("data--"+data[0]['id']);
        } else {
          console.log("Error");
        }
      });
    }, []);

    const DeletePost = (data) => {
      Axios.post("http://localhost:9000/api/delete-post?id="+data)
      .then(() => {
        alert("Post Deleted");
      });
    };
    
    const imageurl="../../../server_amg/public/images/a.jpg";
    const img1=require("../../../server_amg/public/images/a.jpg");
  return (
      <div >
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
               href={"/post-research/"+props.match.params.id}
              className="btn btn-outline-info my-2 my-sm-0 pull-right"
            >
              New Post
            </a>
         
        </Navbar>
        <Jumbotron  style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover' }}>
        <h1 style={{ color: 'white' }}><b>Your Posts</b></h1>
        </Jumbotron>
          <form>
              <CardColumns>
              {research.map(rs =>  <div>
            
                <Card  style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }} text="white">
               
                  <Card.Header>
                    {rs.topic}
                  </Card.Header>
                  <Card.Body>
                  
                    <Card.Title></Card.Title>
                    <Card.Text>
                      Date :{rs.date}<br/>
    
                      Data : {rs.data}<br/>
                      
                    </Card.Text>
                    <Button variant="btn btn-outline-danger my-2 my-sm-0" onClick={()=>
                        { 
                          DeletePost(rs.id)
                        }}>Delete</Button>
                   </Card.Body>
                </Card>
                <br/>
                </div>)}
              </CardColumns>
          </form><br/><br/>
       
        </div>
      </div>
    );
  }

export default DisplayResearch;