const {Review} =require("../models/Review.js");

const reviewFetchLogic =async(req,res)=>{
    const shopId =req.params.shopid;
    let reviews =await Review.find({shopId});
    if(!reviews){
        return res.status(500).json({success:false,message:"Internal Database Error!"}); 
    }
    return res.status(200).json({success:true,reviews});
}

const reviewPostLogic =async (req, res) => {
    const { username } = req.user;
    const { shopId, review, rating } = req.body;
    const newReview = new Review({
      shopId,
      review,
      rating,
      from: username,
    });
    const response = await newReview.save();
    if (!response) {
      return res.status(500).json({success:false,message:"Unable to post the review!"});
    }
  
    return res
      .status(200)
      .json({ success: true, message: "Review posted successfully!" });
  }

module.exports={reviewFetchLogic,reviewPostLogic};