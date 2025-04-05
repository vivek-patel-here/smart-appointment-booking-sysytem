const mongoose =require("mongoose");

const appointmentSchema =new mongoose.Schema({
    shopId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"ShopId not provided"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Client Id not provided!"]
    },
    shopName:{
        type:String,
        required:[true,"ShopName is missing"]
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
    remark:String,
    status :{
        type:String,
        default:"Pending"
        ,enum:{values:["Pending","Granted","Cancelled By Shop","Cancelled By Customer","Rescheduled"],message:`Given Value is not supported`}
    },
    notactive:{
        type:Boolean,
        default:false
    }
});



const Appointment = mongoose.model("Appointment",appointmentSchema);

module.exports={Appointment};