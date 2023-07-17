import axios from "axios";
import { useEffect, useState } from "react";

function AddCourse(){
    const [selectedImage, setSelectedImage]= useState(null);
    const [title, setTitle]= useState("");
    const [description, setDescription]= useState("");
    const [image, setImage]= useState("");
    const [_id, set_id]= useState("");

    useEffect(()=>{
        const getEmail= async()=>{
            const token= `Bearer ${localStorage.getItem('jwtToken')}`;
            const response= await axios.post('http://localhost:3000/authenticate',null,{
                headers: {authorization: token}
            });
            if(response.data.result){
                const id= await axios.post('http://localhost:3000/email/getId', null,{
                    headers: {authorization: token}
                });
                set_id(id.data.id);
            }else{
                alert('User is not autorized!!');
                setTimeout(() => {
                    window.location.href='/';
                }, 5000);
            }
        }
        getEmail();
    },[]);

    const handleImageChange= (event)=>{
        setSelectedImage(event.target.files[0]);
    }
    const handleUpload= async ()=>{
        const formData= new FormData();
        formData.append('image', selectedImage);
        const response= await axios.post('http://localhost:3002/upload', formData);
        setImage(response.data.id);
        console.log(image);
    }

    const onSubmitCourse= async(e)=>{
        e.preventDefault();
        await handleUpload();
        const newCourse= {
            title: title,
            description: description,
            image: image,
            createdBy: _id
        };
        const response= await axios.post('http://localhost:3001/create',newCourse);
        if(response.data._id){
            alert("The course created successfully");
        }else{
            console.error(response.data);
        }
    }

    return (
        <>
        <div className="container mt-4 border border-primary rounded">
            <form onSubmit={onSubmitCourse}>
                <div className="form-group mt-2">
                    <label htmlFor="titleInput">Enter title</label>
                    <input 
                    type="text" 
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    required
                    />
                </div>
                <div className="form-group mt-2">
                   <label htmlFor="descriptionInput">Description</label> 
                   <textarea 
                   className="form-control" 
                   value={description}
                   onChange={(e)=>{setDescription(e.target.value)}}
                   required
                   rows="3">
                   </textarea>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="imageInput">Upload image</label> <br />
                    <input type="file" className="form-control-file" onChange={handleImageChange} />
                </div>
                <button className="btn btn-primary mt-2 mb-2" type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}


export default AddCourse;