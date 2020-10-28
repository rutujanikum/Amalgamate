import React, {useState, useEffect} from "react";
//import Axios from 'axios';
import {Card, CardColumns, Image} from 'react-bootstrap';

const DisplayResearch = (props) => {
 // const [user_data, setUserData] = useState([]);
  const [research, setResearch] = useState([]);
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
    
    const imageurl="../../../server_amg/public/images/";
    //const img1="a.jpg"
  return (
      <div>
        <div className="container">
          <form>
            <div className="form-group">
            <a
              href="/login"
              className="btn btn-primary float-right"
            >
              Logout
            </a>

            <a
              href={"/post-research/"+props.match.params.id}
              className="btn btn-primary float-right"
            >
              Post Research
            </a>
          
            </div>
            <br/>
            <h1>-: Your Posts :-</h1>
              <CardColumns>
              {research.map(rs =>  <div>
            
                <Card>
                  <Card.Header>
                    {rs.topic}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                      Date :{rs.date}<br/>
                      Data : {rs.data}<br/>
                      
                    </Card.Text>
                    {console.log("---"+imageurl+rs.img)}
                    <img src={"../../../server_amg/public/images/"+rs.img} alt="" />
                  <Image source={{uri: "../../../server_amg/public/images/"+rs.img}}/>
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