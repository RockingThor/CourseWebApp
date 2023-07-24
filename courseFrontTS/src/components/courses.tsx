import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { adminId } from "../store/atoms/admins";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Courses(){
    const state= useRecoilValue(adminId);
    const [courses, setCourses]= useState([]);
    useEffect(()=>{
        const getData= async()=>{
            const response= await axios.post(`${BASE_URL}/course/get/${state.adminId}`, null, {
                headers: {authorization: `Bearer ${localStorage.getItem('jwtToken')}`}
            });
            if(response.data.courses){
                setCourses(response.data.courses)
            }
        }
        getData();
    },[]);

    return(
        <>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
                {courses.map(course=>{
                    return <Course course={course}/>
                })}
            </div>
        </>
    )
}

function Course({course}){
    const imageSource= `${BASE_URL}/image/retreive/${course.image}`
    const navigate= useNavigate();
    return(
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200,
            padding: 20
        }}>
            <Typography textAlign={'center'} variant="h5">{course.title}</Typography>
            <Typography textAlign={'center'} variant="h6">{course.description}</Typography>
            <img src={imageSource} style={{width: 300}}></img>
            <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
                <Button variant="contained" size="large" onClick={()=>{
                    navigate(`/course/${course._id}`);
                }}>Edit</Button>
            </div>
        </Card>
    )
}

export default Courses;