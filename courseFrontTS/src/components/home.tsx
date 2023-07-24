import { useNavigate } from "react-router-dom";
import { AdminState, adminState } from "../store/atoms/admins";
import { useRecoilValue } from "recoil";
import '@fontsource/roboto/300.css';
import {  Button, Grid, Typography } from "@mui/material";

function Home(){
    const navigate= useNavigate();
    const stateAdmin: AdminState= useRecoilValue(adminState);
    return(
        <>
            <div className="container">
              <Grid container style={{padding : "5vw"}}>
                <Grid item xs={12} md={6} lg={6}>
                    <div style={{marginTop: 100}}>
                        <Typography variant={"h2"}>
                            Welcome aboard!!
                        </Typography>
                        <Typography variant={"h4"}>
                            Create and upload courses to reach the world!!
                        </Typography>
                        {(stateAdmin.adminEmail) && <div style={{display: "flex", marginTop: 20}}>
                            <div style={{marginRight: 10}}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={()=>{
                                        navigate("/signup")
                                    }}
                                >Signup</Button>
                            </div>
                            <div>
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={()=>{
                                        navigate("/signin")
                                    }}
                                >Signin</Button>
                            </div>
                        </div>}
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} style={{marginTop: 20}}>
                    <img src={"src/assets/courseM.jpg"} width={"100%"} />
                </Grid>
              </Grid>
            </div>
        </>)
}

export default Home;