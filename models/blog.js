const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    role:String,
    blog:Array,    
})
const User=mongoose.model("users",UserSchema);
module.exports={
    User,
}