import React,{useState, useEffect} from 'react';
import './App.css';

//import Axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  //Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from './Views/dashboard';
import Login from './Views/Login' ;
import Registration from './Views/Registration' ;
import SearchUser from './Views/SearchUser';
import DisplayUsers from './Views/DisplayUserSearch';
import CreateNote from './Views/CreateNote';
import WriteDiary from './Views/WriteDiary';
import Followers from './Views/followers';
import Settings from './Views/settings';

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({
      id: undefined,
    });
      //useEffect for setting username

      useEffect(() => {
        let url = "http://localhost:9000/api/login-status";
        async function checkLogin() {
          let data;
          await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            credentials: "include", // to send cookies and other things over cross origin requests
          })
            .then((response) => response.json())
            .then((d) => {
              console.log("Success:", data);
              data = d;
            })
            .catch((error) => {
              data = null;
              console.error("Error:", error);
            });
          return data;
        }
        checkLogin().then((data) => {
          if (data) {
            setLoggedIn(data.status);
            setUser({ id: data.user_id});
            //console.log(loggedIn+"----useEffect---"+user.id);
          } else {
            console.log("Error");
          }
        });
      }, []);
      
      const handleLogin = (data) => {
        let  url = "http://localhost:9000/api/login";
        async function login(data) {
          let res;
          await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "include", // to send cookies and other things over cross origin requests
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          })
            .then((response) => response.json())
            .then((d) => {
              console.log("Success:", data);
              setLoggedIn(data.status);
              setUser({ id: data.user_id});
              res = d;
              //console.log(loggedIn+"+++"+user.id);
            })
            .catch((error) => {
              res = null;
              console.error("Error:", error);
            });
          return res;
        }
        login(data).then((data) => {
          if (data) {
            setLoggedIn(data.status);
            setUser({ id: data.user_id});
            console.log(data.status+"--"+data.user_id);
          }
        });
        console.log(loggedIn+"***"+user.id);
      };
      const handleLogout = () => {
        let  url = "http://localhost:9000/api/logout";
        fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          credentials: "include", // to send cookies and other things over cross origin requests
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            setLoggedIn(!data.status);
            setUser({ id: undefined});
          })
         /* .catch((error) => {
            console.log("Error:", error);
          });*/
      };
    return (
      <div className="App">
        <h1>{console.log("in return-------"+user.id)}</h1>
        <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Amalgamate
        </a>
        {loggedIn ? (
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        ) : null}
      </nav>
      <Router>
        <Switch>
          <Route exact path="/">
          {!loggedIn ? <Redirect push to="/login" /> : <Dashboard/>}
          </Route>
          <Route exact path="/login">
            {console.log("in dash route----"+user.id)}
              {!loggedIn ? (
                <Login
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                />
              ) : (
                <Dashboard
                  user={user}
                  onLogout={handleLogout}
                />
              )}
            </Route>
            <Route exact path="/search-user/:id"
              render={({ match }) => {
                return (
                  <SearchUser
                    match={match}
                    user={user}
                    onLogout={handleLogout}
                  />
                );
              }}
            >
            </Route>
            <Route exact path="/create-note/:id"
              render={({ match }) => {
                return (
                  <CreateNote
                    match={match}
                    user={user}
                    onLogout={handleLogout}
                  />
                );
              }}
            >
            </Route>
            <Route exact path="/write-diary/:id"
              render={({ match }) => {
                return (
                  <WriteDiary
                    match={match}
                    user={user}
                    onLogout={handleLogout}
                  />
                );
              }}
            >
            </Route>
            <Route exact path="/view-followers/:id"
              render={({ match }) => {
                return (
                  <Followers
                    match={match}
                    user={user}
                    onLogout={handleLogout}
                  />
                );
              }}
            >
            </Route>

            <Route exact path="/settings/:id"
              render={({ match }) => {
                return (
                  <Settings
                    match={match}
                    user={user}
                    onLogout={handleLogout}
                  />
                );
              }}
            >
            </Route>

            <Route exact path="/registration">
                <Registration/>
            </Route>
            <Route exact path="/display-searched-user/:user_id/:s_user_id"
            render={({ match }) => {
                return (
                  <DisplayUsers
                    match={match}
                    user={user}
                    onLogout={handleLogout}
                  />
                );
              }}
              //component={DisplayUsers}
              >
             
            
            </Route>
        </Switch>
      </Router>
      </div>
    );
}


export default App;
