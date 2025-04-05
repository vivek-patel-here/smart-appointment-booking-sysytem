const {Review} =require("../models/Review");

const fetchShopReviews=async(req,res)=>{
    const {_id} = req.shop;
    const reviews = await Review.find({shopId:_id});
    if(!reviews){
        return res.status(500).json({success:false,message:"Unable to fetch data from database!"})
    }
    return res.status(200).json({success:true,message:"Reviews Fetched Successfully!",reviews})
}

module.exports={fetchShopReviews};