const jwt =require("jsonwebtoken")
const {User} = require("../models/User.js")


const isLogin =async(req,res,next)=>{
    try{
        const {token} = req.headers;
        if(!token){
            return res.status(403).json({success:false,message:"You are not logged in. Please log in or sign up to continue."})
        }
        const info = jwt.verify(token,process.env.JWTSECRET);
        const user =await User.findOne({email:info.email});
        if(!user){
            return res.status(403).json({success:false,message:"Provided token is wrong or Expired! Please Login again !"})
        }
        req.user=user;
        next();
    }catch(e){
        return res.status(403).json({success:false,message:"Logout Successfully"})
    }
    
}

module.exports={isLogin};