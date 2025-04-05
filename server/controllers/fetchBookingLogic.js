const {Appointment} = require("../models/Appointment.js")

const fetchBookingLogic=async(req,res)=>{
    const {_id} = req.user;
    let appointments = await Appointment.find({userId:_id});
    if(!appointments){
        return res.status(409).json({success:true,message:"Some Internal Database Error!"})

    }
    return res.status(200).json({success:true,message:"appointment Fetched successfully",appointments})
}

const cancelAppointment =async(req,res)=>{
    const {_id} =req.body;
    const response =await Appointment.findByIdAndUpdate(_id,{status:"Cancelled By Customer",notactive:true });
    if(!response){
        return res.status(409).json({success:true,message:"Some Internal Database Error!"})
    }
    return res.status(200).json({success:true,message:"appointment cancelled successfully"})
    
}

module.exports ={fetchBookingLogic,cancelAppointment};