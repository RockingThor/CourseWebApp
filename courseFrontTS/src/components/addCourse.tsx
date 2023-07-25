import { Button, Card, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { adminId, adminState } from "../store/atoms/admins";

interface Course{
    title: string;
    description:string;
    createdBy:string;
    image:string
}

function AddCourse(){
    const[title, setTitle]= useState("");
    const [description, setDescrition]= useState("");
    const [image, setImage]= useState("");
    const stateAdmin= useRecoilValue(adminState);
    const id= useRecoilValue(adminId);
    const [email, SetEmail]=useState("");

    useEffect(()=>{
            if(id.adminEmail==null){
                SetEmail("Not logged in");
            }else{
                SetEmail(id.adminEmail);
            }
    },[]);

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(id.adminId==null ||image==null){
            alert("Login and upload image to submit the form");
            return;
        }
        const course: Course={
            title: title,
            description: description,
            createdBy: id.adminId,
            image: image
        };
        const response= await axios.post(`${BASE_URL}/course/create`,course,{
            headers: {authorization: `Bearer ${localStorage.getItem('jwtToken')}`}
        });
        if(response.data.id){
            alert("Course created successfully");
            setTitle("");
            setDescrition("");
            setImage("");
        }else{
            alert("something went wrong");
        }
    }

    return(
        <div className="container">
        <Card variant="outlined" style={{padding: "1vw", margin: ".5vw"}}>
            <div className="container" style={{display:"flex", justifyContent:"center", margin:"1vw"}}>
                <Typography
                    variant="h5"
                >Add a course</Typography>
            </div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={6} lg={6} style={{display:"flex", justifyContent:"center"}}>
                <Card variant={"outlined"} style={{width: 400, padding:10, marginBottom:"2vw", marginRight:"2vw"}}>
                    <TextField
                        onChange={(event)=>{
                            setTitle(event.target.value);
                        }}
                        fullWidth={true}
                        label="Title"
                        variant="outlined"
                    />
                    <TextField
                        onChange={(event)=>{
                            setDescrition(event.target.value);
                        }}
                        style={{marginTop: "1vw"}}
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                    />
                    <TextField
                       style={{marginTop: "1vw"}}
                       fullWidth={true}
                       label="Created by" 
                       disabled= {true}
                       value={email}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{display:"flex", justifyContent:"center"}}>
                <UploadImage img={image} setImg={setImage}/>
            </Grid>
        </Grid>
        <div className="container" style={{display:"flex", justifyContent:"center", margin:"1vw"}}>
            { stateAdmin.adminEmail==null &&(
                <Typography
                    variant="h6"
                    color="red"
                >Please login to submit the form</Typography>
            )}
        </div>
        </Card>
        <div className="container" style={{display: "flex", justifyContent:"center", margin: "2vw"}}>
        <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            disabled={(title=="")||(description=="")||(image=="")||(stateAdmin.adminEmail==null)}
        >Sbmit Course</Button>
        </div>
        </div>
    )
}

function UploadImage(props){
    const [img, setImg]=useState("");
    const [imgLink, setImageLink]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [selectedFile, setSelectedFile]=useState(null);
    const stateAdmin= useRecoilValue(adminState);

    const handleFileChanges=(event)=>{
        const file= event.target.files[0];
        setSelectedFile(file);
    }

    const handleImageUpload= async()=>{
        setIsLoading(true);
        const formData= new FormData();
        if(selectedFile==null){
            alert("Please upload a file.")
            return;
        }
        formData.append('image', selectedFile);
         const response= await axios.post(`${BASE_URL}/image/upload`, formData);
         if(response.data.id){
            setImg(response.data.id);
            setImageLink(`${BASE_URL}/image/retreive/${response.data.id}`);
            props.setImg(response.data.id);
            setIsLoading(false);
         }

       /* fetch(`${BASE_URL}/image/upload`,{
            method: 'POST',
            body: formData,
        }).then((response)=>{
            response.json()
        }).then((data)=>{
            setImg(data.id);
            setImageLink(`${BASE_URL}/retreive/${img}`);
            console.log("WAs here");
            setIsLoading(false);
        }).catch(err=>{
            console.error(err);
        });*/
    }
    return(
        <Card variant="outlined" style={{width:400, padding:10}}>
            <Typography variant="h6" style={{display:"flex", justifyContent: "center"}}>
                Upload the image here
            </Typography>
            {img &&(
                <div className="container">
                    <img src={imgLink} alt="Image uploaded by you"  style={{width: 200, padding: 5}}/>
                </div>
            )}
            {isLoading &&(
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <CircularProgress />
                    </div>
                </div>
            )}
            {!img &&(
                <Card variant="outlined" style={{marginTop: "1vw", padding: 20}}>
                    <input type="file" onChange={handleFileChanges}/>
                </Card>
            )}
            <Button 
                variant="contained"
                size="large"
                onClick={handleImageUpload}
                style={{marginTop: "1vw",}}
                disabled={(props.img!="")||(stateAdmin.adminEmail==null)}
            >Upload Image</Button>
        </Card>
    )
}

export default AddCourse;