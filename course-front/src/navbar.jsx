/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
function Navbar(){
  const [loggedIn, setLoggedIn]= useState(false);
  useEffect(()=>{
    const checkLoggedIn= async()=>{
      let token= await localStorage.getItem('token');
      token= `"Bearer "+${token}`;
      const response= await axios.post('http://localhost:3000/signup',null,{
            headers: {authorization: token}
      });
      if(response.data.result){
        setLoggedIn(true);
      }
    }
    checkLoggedIn();
  },[]);
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-center">
        <Link to="/" className="navbar-brand">Course App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/signin" className="nav-link">Signin</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Navbar;