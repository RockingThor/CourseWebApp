//import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const navigate= useNavigate();
    const handleLogin= async(e)=>{
        e.preventDefault();
        const requestOptions={
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password})
        };
        try{
            const response = await fetch('http://localhost:3000/login', requestOptions);
            const data= await response.json();
            if(data){
                const jwtToken= data.token;
                localStorage.setItem('jwtToken', jwtToken);
                navigate('/courseDetails');
            }
        }catch(error){
            console.error('Error', error);
        }
    };

    return (
        <>
        <div className="d-flex justify-content-center align-items-center login-card">
            <div className="card text-center">
                <div className="card-text">
                    <form onSubmit={handleLogin} style={{padding: "10px"}}>
                        <div className="form-group mt-2">
                            <label htmlFor="inputEmail">Email address</label>
                            <input 
                            type="email" 
                            className="form-control" 
                            id="inputEmail" 
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            placeholder="Enter email"/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password">Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            placeholder="Enter password"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}

export default Login;