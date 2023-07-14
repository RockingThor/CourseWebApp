const express=require("express");
const mongoose= require("mongoose");
const cors= require("cors");
//import Course from "./CourseSchema";

const app=express();
app.use(cors());
app.use(express.json());

const {Schema}= mongoose;

const courseSchema= new Schema({
    title: String,
    description: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref:'Image'
    }
});

const Course=mongoose.model('course', courseSchema);

mongoose.connect("mongodb+srv://rohit:myMNLmffNO6uMpxy@todo.s7fvlbb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/create', async(req,res)=>{
    const {title, description, createdBy, image}= req.body;
    const newCourse= new Course({title, description, createdBy, image});
    let response=await newCourse.save();
    if(response){
        return res.status(200).json({id: response._id});
    }else{
        return res.status(403).json({error: "The db didnt respond"});
    }
});

app.listen(3001);