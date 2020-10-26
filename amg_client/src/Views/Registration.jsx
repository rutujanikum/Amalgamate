import React, {useState} from 'react';
import Axios from 'axios';
//import './formcss.css';
import { Button } from 'react-bootstrap';


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
          <p>Already Have an account!</p>
          <a
          href={"/login"}
        >
          Login Here!
        </a>
        <h1>Registration</h1>
        <div className="form">
          <label>User ID</label>
        <input type="text" name="id" onChange={(e)=>{
          setId(e.target.value)
        }}>
          </input> 
          <br/><br/>
          <label>Password</label>
        <input type="password" name="id" onChange={(e)=>{
          setPassword(e.target.value)
        }}>
          </input> 
          <br/>
        <label>First Name</label>
        <input type="text" name="fname" onChange={(e)=>{
        setFName(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Last Name</label>
        <input type="text" name="lname" onChange={(e)=>{
        setLName(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Contact Number</label>
        <input type="number" name="contact_no" onChange={(e)=>{
        setContact(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Email</label>
        <input type="text" name="email" onChange={(e)=>{
        setEmail(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Date of Birth</label>
        <input type="date" name="dob" onChange={(e)=>{
        setDOB(e.target.value)
        }}>
          </input> 
          <br/>
          <label>Interest</label>
        <select name="interest" onChange={(e)=>{
        setInterest(e.target.value)
        }}>
            <option value="Photography">Photography</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Painting">Painting</option>
          </select> 
          <br/>
        <label>Education</label>
        <input type="text" name="education" onChange={(e)=>{
        setEdu(e.target.value)
        }}>
          </input> 
          <br/>
        <Button variant="primary" type="submit" onClick={submitData}>Submit</Button>
        <br/>
        </div>
        </div>
      </div>
    );
  
}

export default Registration; 
