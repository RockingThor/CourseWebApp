/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
function Navbar(){
  const [loggedIn, setLoggedIn]= useState(false);
  const [email, setEmail]= useState('');
  useEffect(()=>{
    const checkLoggedIn= async()=>{
      let token= await localStorage.getItem('jwtToken');
      token= `Bearer ${token}`;
      const response= await axios.post('http://localhost:3000/authenticate',null,{
            headers: {authorization: token}
      });
      if(response.data.result){
        setLoggedIn(true);
        setEmail(response.data.email);
        console.log("logged in");
      }
    }
    checkLoggedIn();
  },[]);
  const handleLogout= ()=>{
    localStorage.setItem('jwtToken', '');
    window.location.href='/';
  }
  if(loggedIn){
    return(
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Course WebApp</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <Link to="/" className="navbar-brand">Home</Link>
        </li>
        <li className="nav-item">
          <h5 className="nav-text">{email}</h5>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  </>
    )
  }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Course WebApp</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <Link to="/" className="navbar-brand">Home</Link>
        </li>
        <li className="nav-item">
        <Link to="/signup" className="nav-link">Signup</Link>
        </li>
        <li className="nav-item">
        <Link to="/signin" className="nav-link">Signin</Link>
        </li>
      </ul>
    </div>
  </nav>
        </>
    )
}

export default Navbar;