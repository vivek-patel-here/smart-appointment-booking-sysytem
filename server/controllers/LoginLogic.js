const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt")
const {User} = require("../models/User.js")

const LoginLogic = async(req,res)=>{
    const {email,password} =req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({success:false,message:"No User found! Try Signup"})
    }
    const isPasswordTrue = await bcrypt.compare(password,user.password);
    if(!isPasswordTrue){
        return res.status(409).json({success:false,message:"Wrong Credentials!"})
    }

    const payload = {
        id : user._id,
        username:user.username,
        email :user.email
    }

    let token = jwt.sign(payload,process.env.JWTSECRET);

    return res.status(200).json({success:true,message:"User Login Successful",token});
}

module.exports={LoginLogic}