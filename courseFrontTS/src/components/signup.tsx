import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admins";

interface admin{
    name: string;
    email: string;
    password: string;
}

function Signup(){
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [name, setName]= useState("");
    const navigate= useNavigate();
    const setAdmin= useSetRecoilState(adminState);

    const onSubmit= async()=>{
        const newAdmin: admin={
            name: name,
            email: email,
            password: password
        }
        try{
            const response= await axios.post(`${BASE_URL}/admin/signup`,null,{
                headers: newAdmin
            });
            const jwtToken : string =response.data.token;
            localStorage.setItem('jwtToken', jwtToken);
            setAdmin({isLoading: false, adminEmail: email});
            navigate("/");
        }catch(e){
            console.error(e);
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
            <Typography variant="h6">
                Welcome!! Sign up below.
            </Typography>
        </div>
        <div style={{display: "flex", justifyContent:"center"}}>
            <Card variant="outlined" style={{width: 400, padding:20}}>
                <TextField
                    onChange={(event)=>{
                        setName(event.target.value);
                    }}
                    fullWidth={true}
                    label="Name"
                    variant="outlined"
                />
                <TextField
                    onChange={(event)=>{
                        setEmail(event.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                    style={{marginTop: "1vw"}}
                />
                <TextField
                    onChange={(event)=>{
                        setPassword(event.target.value);
                    }}
                    fullWidth={true}
                    label= "Password"
                    variant="outlined"
                    style={{marginTop: "1vw"}}
                />
                <Button
                    size="large"
                    variant="contained"
                    onClick={onSubmit}
                    style={{marginTop: "1vw", justifyContent: "center", display:"flex"}}
                > Signup</Button>
            </Card>
        </div>
        </>
    )
}

export default Signup;