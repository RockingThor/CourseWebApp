const mongoose= require("mongoose");

const {Schema}= mongoose;

const courseSchema= new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    image: {
        type: Schema.Types.ObjectId,
        ref:'Image'
    }
});

const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const adminSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const imageSchema= new mongoose.Schema({
    name: String,
    data: Buffer
});

const Course=mongoose.model('course', courseSchema);
const Image= mongoose.model('Image', imageSchema);
const User=mongoose.model('user', userSchema);
const Admin= mongoose.model('admin', adminSchema);

module.exports={
    User,
    Admin,
    Course,
    Image
};