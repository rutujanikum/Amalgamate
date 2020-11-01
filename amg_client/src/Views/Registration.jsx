import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import { Button,Jumbotron,Nav,Navbar } from 'react-bootstrap';


function Registration() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [contact_no, setContact] = useState("");
    const [dob, setDOB] = useState("");
    const [interest, setInterest] = useState("");
    const [education, setEdu] = useState("");
    const [email, setEmail] = useState("");

    const submitData = () => {
       Axios.post("http://localhost:9000/api/insert" , {
         id: id, 
         password: password,
         fname: fname,
         lname: lname,
         contact_no: contact_no,
         dob: dob,
         interest: interest,
         education: education,
         email: email

        }).then(() => {
         alert(fname);
       });
       Axios.get("http://localhost:3000/login");
    };

    return (

      <div className="App">
        <div className="container">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home"> <img src={require("../../public/images/logo.png")} class="rounded-circle" width="50" height="50" alt=""/>&nbsp;Amalgamate</Navbar.Brand>
          <Nav className="mr-auto">
            
          </Nav>
          <a
              href="/login"
              className="btn btn-outline-info my-2 my-sm-0 pull-right"
            >
              Login
            </a>
            &nbsp;
        </Navbar><br/>
        <center>
          <div className="col-sm-6 ">
        <Jumbotron> <h1>Registration</h1>
       <hr/>
       
        <form>
        <div className="form-group">
          <label>User ID</label>
        <input type="text" name="id" className="form-control" onChange={(e)=>{
          setId(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Password</label>
        <input type="password" name="id" className="form-control" onChange={(e)=>{
          setPassword(e.target.value)
        }}>
          </input> 
          <br/>
        <label>First Name</label>
        <input type="text" name="fname" className="form-control" onChange={(e)=>{
        setFName(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Last Name</label>
        <input type="text" name="lname" className="form-control" onChange={(e)=>{
        setLName(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Contact Number</label>
        <input type="number" name="contact_no" className="form-control" onChange={(e)=>{
        setContact(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Email</label>
        <input type="text" name="email" className="form-control" onChange={(e)=>{
        setEmail(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Date of Birth</label>
        <input type="date" name="dob" className="form-control" onChange={(e)=>{
        setDOB(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Interest</label>
        <select name="interest" className="form-control" onChange={(e)=>{
        setInterest(e.target.value)
        }}>
            <option value="Photography">Photography</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="dress-design">Dress Design</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Painting">Painting</option>
            <option value="computer_science">Computer Science</option>
            <option value="robotics">Robotics</option>
            <option value="electrical">Electrical</option>
            <option value="telecommunication">Telecommunication</option>
            <option value="space">Space</option>
            <option value="choreography">Choreography</option>
            <option value="politics">Politics</option>
          </select> 
          <br/>
        <label>Education</label>
        <input type="text" name="education" className="form-control" onChange={(e)=>{
        setEdu(e.target.value)
        }}>
          </input> 
          <br/>
        <Button variant="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={submitData}>Submit</Button>
        <br/>
        </div>
        </form>
        </Jumbotron>
        </div>
        </center>
        </div>
      </div>
    );
  
}

export default Registration; 
