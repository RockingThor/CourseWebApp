import axios from "axios";
import { useState } from "react";

function AddCourse(){
    const [selectedImage, setSelectedImage]= useState(null);

    const handleImageChange= (event)=>{
        setSelectedImage(event.target.files[0]);
    }
    const handleUpload= ()=>{
        const formData= new FormData();
        formData.append('image', selectedImage);
        axios.post('http://localhost:3002/upload', formData).then(
            (res)=>{console.log(res.data)}
        ).catch(
            (err)=>{console.error(err)}
        );
    }

    return (
        <div>
            <h1>Image Uploader</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}


export default AddCourse;