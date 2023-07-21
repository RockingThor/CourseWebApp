const express= require("express");
const {Admin} =require("../models/model");
const jwt= require("jsonwebtoken");
const {SECRET, authenticateJwt}= require("../middleware/auth");


const router= express.Router();

router.post('/signup',async (req,res)=>{
    const {name, email, password}=req.headers;
    const admin= await Admin.findOne({email});
    if(admin){
        return res.status(403).json({error: "admin already exist"});
    }else{
        const newAdmin= new Admin({name, email, password});
        let response= await newAdmin.save();
        const token = jwt.sign({ email, role: 'admin' }, SECRET, { expiresIn: '1h' });
        if(response){
            return res.status(200).json({id: response._id, token: token});
        }else{
            return res.status(400).json({error: "Something is broken"});
        }
    }  
});

router.post('/login', async(req,res)=>{
    const {email, password}=req.headers;
    const admin= await Admin.findOne({email});
    if(admin){
        if(admin.password===password){
            const token = jwt.sign({ email, role: 'admin' }, SECRET, { expiresIn: '1h' });
            return res.status(200).json({token});
        }else{
            return res.status(403).json({error: "the id and password didnt match"});
        }
    }else{
        res.status(403).json({error: "the admin with email doesnt exist"});
    }
});

router.post('/verify', authenticateJwt,async(req,res)=>{
    const email= req.user.email;
    const user= await User.findOne({email});
    //console.log(user);
    return res.status(200).json({id: user._id, email: email});
});

module.exports=router;