const jwt =require("jsonwebtoken")
const {Shop} = require("../models/Shop.js")


const isLoginShop =async(req,res,next)=>{
    try{
        const {token} = req.headers;
        if(!token){
            return res.status(403).json({success:false,message:"You are not logged in. Please log in or sign up to continue."})
        }
        const info = jwt.verify(token,process.env.JWTSECRET);
        const shop =await Shop.findOne({registeredEmail:info.email});
        if(!shop){
            return res.status(403).json({success:false,message:"Provided token is wrong or Expired! Please Login again !"})
        }
        req.shop=shop;
        next();
    }catch(e){
        return res.status(403).json({success:false,message:"Logout Successfully"})
    }
    
}

module.exports={isLoginShop};