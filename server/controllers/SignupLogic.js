const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt")
const {User} = require("../models/User.js")

const SignupLogic =async(req,res)=>{
    const {username,email,password} =req.body;
    const findUser =await User.findOne({email});
    if(findUser){
        return res.status(404).json({success:false,message:"An account with this email already exists. Please use a different email or log in to continue."})
    }
    const hashedpassword =await bcrypt.hash(password,10);
    const newuser =new User( {
        username,
        email,
        password:hashedpassword
    });
    const registeredUser = await newuser.save();
    if(!registeredUser){
        return res.status(500).json({success:false,message:"Internal server Error"})
    }
    const payload = {
        id : registeredUser._id,
        username:registeredUser.username,
        email :registeredUser.email
    }

    let token = jwt.sign(payload,process.env.JWTSECRET);

    return res.status(200).json({success:true,message:"User Reistered Successfully",token});
}

module.exports={SignupLogic};