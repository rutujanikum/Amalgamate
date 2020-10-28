import React, { useState, useEffect} from "react";
//import Axios from 'axios';
import { Card, CardColumns } from 'react-bootstrap';
function ViewFollowerProfile(props) {
    const [data, setData] = useState({
        user_data: [],
        research: []
      });
  useEffect(() => {
    let url = "http://localhost:9000/api/view-followerprofile?id=" +props.match.params.id+"&follower_id="+props.match.params.follower_id;
    async function getUserData() {
      let data;
      await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        credentials: "include", // to send cookies and other things over cross origin requests
      })
        .then((response) => response.json())
        .then((d) => {
          console.log("dashboard:", d);
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
        setData({user_data: data.user, research: data.research});
        console.log("data"+data[0]['id']);
      } else {
        console.log("Error");
      }
    });
  }, []);
  /*const searchUser = () => {
      Axios.post("http://localhost:3000/search-user",{
        id: props.user.id, })
      .then(() => {
        console.log("Going to search");
      });
  };*/

  return (
    <div className="Panel">
    <div className="container">
      <form>
        <div className="form-group">
        <a
            href="/login"
            className="btn btn-primary float-right"
          >
            logout
          </a>&nbsp;
        
       
        {
            data.user_data == undefined &&
            <p>You do Not follow this user</p>
        }
       </div>
         
       {
            data.user_data != undefined &&
      <Card style={{width: 700}} bg="secondary" text="white">
        <Card.Body>
          <Card.Title>
          {data.user_data.map(userdata => userdata.fname)+" "}{data.user_data.map(userdata => userdata.lname)}
          </Card.Title>
          <Card.Text>
          USER ID : {data.user_data.map(userdata => <div>{userdata.id}</div>)}
          CONTACT : {data.user_data.map(userdata => <div>{userdata.contact_no}</div>)}
          EMAIL : {data.user_data.map(userdata => <div>{userdata.email}</div>)}
          INTEREST : {data.user_data.map(userdata => <div>{userdata.interest}</div>)}
          EDUCATION : {data.user_data.map(userdata => <div>{userdata.Education}</div>)}
          </Card.Text>
        </Card.Body>
      </Card>
    }
      <br/>
        
      <h1>-: Posts :-</h1>

      {data.research != undefined &&
      
              <CardColumns>
              {data.research.map(rs =>  <div>
                
                <Card>
                  <Card.Header>
                    {rs.topic}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        User Id: {rs.user_id}<br/>
                      Date :{rs.date}<br/><br/>
                      Data : {rs.data}<br/>
                      
                    </Card.Text>
                    <img src={"../../../server_amg/public/images/"+rs.img} alt="" />
                 
                  </Card.Body>
                </Card>
                <br/>
                </div>)}
              </CardColumns>
        }
        </form>
    </div>
    </div>
  );
}

export default ViewFollowerProfile;