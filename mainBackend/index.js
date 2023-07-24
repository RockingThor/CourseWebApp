const express= require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const adminRouter= require("./routes/admin");
const courseRouter=require("./routes/course");
const imageRouter=require("./routes/image");

const app= express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/course", courseRouter);
app.use("/image", imageRouter);

mongoose.connect("mongodb+srv://rohit:myMNLmffNO6uMpxy@todo.s7fvlbb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})