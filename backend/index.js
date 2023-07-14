const express=require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const jwt= require("jsonwebtoken");
//import User from "./UserSchema";

const app=express();
app.use(cors());
app.use(express.json());

const secretKey= "secretKey";

const generateJWT= (user)=>{
    const payload= {email: user.email};
    const token=jwt.sign(payload, secretKey);
    console.log(token);
    return token;
}

const authenticateJWT= (req,res, next)=>{
    const authHeader= req.headers.authorization;
    if(authHeader){
        const token= authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.user=user;
            next();
        });
    }else{
        return res.sendStatus(401);
    }
}

const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    promotion: Boolean
});

const User=mongoose.model('user', userSchema);

mongoose.connect("mongodb+srv://rohit:myMNLmffNO6uMpxy@todo.s7fvlbb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/signup',async (req,res)=>{
    const {name, email, password, promotion}=req.headers;
    const user= await User.findOne({email});
    if(user){
        return res.status(403).json({error: "user already exist"});
    }else{
        const newUser= new User({name, email, password, promotion});
        let response= await newUser.save();
        if(response){
            return res.status(200).json({id: response._id});
        }else{
            return res.status(400).json({error: "Something is broken"});
        }
    }  
});

app.post('/login', async(req,res)=>{
    const {email, password}=req.body;
    const user= await User.findOne({email});
    if(user){
        if(user.password===password){
            const token= await generateJWT(user);
            return res.status(200).json({token});
        }else{
            return res.status(403).json({error: "the id and password didnt match"});
        }
    }else{
        res.status(403).json({error: "the user with email doesnt exist"});
    }
})


app.listen(3000);