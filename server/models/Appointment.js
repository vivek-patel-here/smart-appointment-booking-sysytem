const mongoose =require("mongoose");

const appointmentSchema =new mongoose.Schema({
    shopId:{
        type:[mongoose.Schema.Types.ObjectId,"Please provide a valid shopId"],
        required:[true,"ShopId not provided"]
    },
    userId:{
        type:[mongoose.Schema.Types.ObjectId,"Please provide a valid userId"],
        required:[true,"Client Id not provided!"]
    },
    fullname:{
        type:String,
        required:[true,"Client Name is Required"]
    },
    mobile:{
        type:String,
        required:[true,"Mobile number is Required Field"]
    },
    address:{
        type:String,
        required:[true,"Please provide client address"]
    },
    appointmentDateTime:{
        type:String,
        required:[true,"Please provide a valid date and Time "]
    },
    remark:String
});



const Appointment = mongoose.model("Appointment",appointmentSchema);

module.exports={Appointment};