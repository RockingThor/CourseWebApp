import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admins";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface adminLogin{
    email: string;
    password: string;
}

function Signin(){
    const [email, setEmail]= useState("");
    const [password, setPassword]=useState("");

    const adminstate= useSetRecoilState(adminState);
    const navigate= useNavigate();

    const handleLogin= async ()=>{
        const admin: adminLogin={
            email:email,
            password: password
        };
        const response= await axios.post(`${BASE_URL}/admin/login`, null,{
            headers: admin
        });
        if(response.data.token){
            adminstate({adminEmail: email, isLoading: false});
            localStorage.setItem("jwtToken",response.data.token);
            navigate("/");
        }
    }

    return(
        <>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant="h5">
                    Welcome back! Login below...
                </Typography>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Card variant="outlined" style={{width: 400, padding: 20}}>
                    <TextField
                        onChange={(event)=>{
                            setEmail(event.target.value);
                        }}
                        fullWidth={true}
                        label= "Email"
                        variant="outlined"
                    />
                    <TextField
                        onChange={(event)=>{
                            setPassword(event.target.value);
                        }}
                        style={{marginTop: "2vw"}}
                        fullWidth= {true}
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                    <Button
                        size="large"
                        variant="contained"
                        onClick={handleLogin}
                        style={{marginTop: "2vw"}}
                    >Login</Button>
                </Card>
            </div>
        </>
    )
}

export default Signin;