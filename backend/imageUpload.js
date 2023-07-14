const express=require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const multer= require("multer");
//const jwt= require("jsonwebtoken");
//import User from "./UserSchema";

const app=express();
app.use(cors());
app.use(express.json());

const imageSchema= new mongoose.Schema({
    name: String,
    data: Buffer
});

const Image= mongoose.model('Image', imageSchema);

const storage= multer.memoryStorage();
const upload= multer({storage});

mongoose.connect("mongodb+srv://rohit:myMNLmffNO6uMpxy@todo.s7fvlbb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/upload', upload.single('image'), async(req,res)=>{
    const {originalName, buffer}=req.file;
    const newImage= new Image({
        name: originalName,
        data: buffer
    });
    let response= await newImage.save();
    if(response){
        return res.status(200).json({id: response._id});
    }else{
        return res.status(500).json({error:"Image upload was failed"});
    }

});

app.get('/retreive', async(req,res)=>{
    const imageId= req.body.id;
    let response= await Image.findById(imageId);
    if(response){
        res.contentType('image/jpeg');
        return res.status(200).send(response.data);
    }else{
        return res.status(404).json({error: "Image not found"});
    }
})

app.listen(3002);
