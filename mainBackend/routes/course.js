const express= require("express");
const {Course}= require("../models/model");
const {authenticateJwt}= require("../middleware/auth");

const router= express.Router();

router.post('/create',authenticateJwt,async(req,res)=>{
    const {title, description, createdBy, image}= req.body;
    const newCourse= new Course({title, description, createdBy, image});
    let response=await newCourse.save();
    if(response){
        return res.status(200).json({id: response._id});
    }else{
        return res.status(403).json({error: "The db didnt respond"});
    }
});

router.post('/get/:user', authenticateJwt,async(req,res)=>{
    const user= req.params.user;
    const query= {createdBy: {$eq: user}};
    const response= await Course.find(query);
    if(response){
        //console.log(response);
        return res.status(200).json({courses: response});
    }else{
        return res.status(404).json({error: "No courses found"});
    }
});

module.exports=router;