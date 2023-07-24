const express= require("express");
const {Image}= require("../models/model");
const multer= require("multer");

const router= express.Router();

const storage= multer.memoryStorage();
const upload= multer({storage});

router.post('/upload', upload.single('image'), async(req,res)=>{
    const {originalName, buffer}=req.file;
    const newImage= new Image({
        name: originalName,
        data: buffer
    });
    let response= await newImage.save();
    //console.log(response);
    if(response){
        return res.status(200).json({id: response._id});
    }else{
        return res.status(500).json({error:"Image upload was failed"});
    }

});

router.get('/retreive/:id', async(req,res)=>{
    const imageId= req.params.id;
    let response= await Image.findById(imageId);
    if(response){
        res.contentType('image/jpeg');
        return res.status(200).send(response.data);
    }else{
        return res.status(404).json({error: "Image not found"});
    }
});

module.exports=router;