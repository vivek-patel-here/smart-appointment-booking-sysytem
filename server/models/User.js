const mongoose =require("mongoose");

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:2
    }
    ,email:{
        type:String,
        required:true,
        minLength:4
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password must be 8 character long"]
    }
});



const User = mongoose.model("User",userSchema);

module.exports={User};