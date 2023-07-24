import { Button, Card, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";

function AddCourse(){
    const[title, setTitle]= useState("");
    const [description, setDescrition]= useState("");
    const [image, setImage]= useState("");
    return(
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={6} lg={6} style={{display:"flex", justifyContent:"center"}}>
                <Card variant={"outlined"} style={{width: 400, padding:20, marginBottom:"3vw"}}>
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
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{display:"flex", justifyContent:"center"}}>
                <UploadImage setImg={setImage}/>
            </Grid>
        </Grid>
    )
}

function UploadImage(props){
    const [img, setImg]=useState("");
    const [imgLink, setImageLink]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [selectedFile, setSelectedFile]=useState(null);

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
        <Card variant="outlined" style={{width:400, padding:20}}>
            <Typography variant="h4" style={{display:"flex", justifyContent: "center"}}>
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
                <Card variant="outlined" style={{marginTop: "2vw", padding: 20}}>
                    <input type="file" onChange={handleFileChanges}/>
                </Card>
            )}
            <Button 
                variant="contained"
                size="large"
                onClick={handleImageUpload}
                style={{marginTop: "2vw",}}
            >Upload Image</Button>
        </Card>
    )
}

export default AddCourse;