const { Appointment } = require("../models/Appointment.js");

const BookingLogic = async(req, res) => {
    let { id } = req.user;
    let { shopId, fullname, mobile, address, appointmentDateTime, remark } =
      req.body;
    const newAppointment = new Appointment({
      shopId: shopId,
      userId: id,
      fullname,
      mobile,
      address,
      appointmentDateTime,
      remark,
    });

    const registeredappointment = await newAppointment.save();
    if(!registeredappointment){
        return res.status(500).json({success:false,message:"Unable to process your Response at this moment!"});
    }
    return res.status(200).json({success:true,message:"Appointment Booked SuccessfullY!"});
  }

module.exports={BookingLogic};