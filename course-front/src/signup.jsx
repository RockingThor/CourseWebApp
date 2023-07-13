import { useState } from "react";
import axios from "axios";

/* eslint-disable no-unused-vars */
function Signup(){
    const [name, setName]= useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const handleSubmit= async(e)=>{
      e.preventDefault();
        const newUser={
            name: name,
            email: email,
            password: password,
            promotion: true
        };
        try{
          //console.log("was here");
          const response= await axios.post('http://localhost:3000/signup',null,{
            headers: newUser
          });
          console.log(response.data);
        }catch(err){
          console.log(err);
        }
    }

    return(
        <>
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Registration Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label >Name</label>
                <input 
                placeholder="Enter your name" 
                type="text" 
                className="form-control" 
                id="name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                required/>
              </div>
              <div className="form-group">
                <label >Email address</label>
                <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Enter your email" 
                required/>
              </div>
              <div className="form-group">
                <label >Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter your password"  
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required/>
              </div>
              <div className="form-group">
                <label >Confirm Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="confirmPassword" 
                placeholder="Confirm your password" 
                required/>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}

export default Signup;