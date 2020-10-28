import React, {useState, useEffect} from "react";
//import Axios from 'axios';
import { Card,} from 'react-bootstrap';

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
          <form>
            <div className="form-group">
            <a
              href="/login"
              className="btn btn-primary float-right"
            >
              Logout
            </a>

            <a
              href={"/write-diary/"+props.match.params.id}
              className="btn btn-primary float-right"
            >
              Write Diary
            </a>
          
            </div>
            <br/>
           <br/>
              
              
            
                <Card /*style={{ width: 800 }}*/>
                  <Card.Header>
                  <h1>-: Your Diary :-</h1>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    {diary.map(d =>  <div>
                    Title: <b>{d.title}</b><br/>
                      Date :<b>{d.date}</b><br/>
                      {d.data}<br/><hr/><br/>
                     
                      </div>)}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br/>
               
              
          </form>
        </div>
      </div>
    );
  }

export default DisplayNotes;