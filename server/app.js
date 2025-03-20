const path =require("path");
require("dotenv").config({path:path.join(__dirname,".env")})
const express =require("express")
const app =express();
const authRoute = require("./Routes/Auth.js")
const BookingRoute = require("./Routes/Booking.js")
const connectToDB =require("./Utilities/ConnectDb.js")
const CORS=require("cors")
const {isLogin} =require("./Utilities/isRegister.js")


//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(CORS())

//Connection with database
connectToDB()
.then((res) => {
  console.log("Connected to DB successfully");
})
.catch((err) => console.log(err));

//Routes 1 : for user Authentication
app.use("/Auth",authRoute)

//Route 2: for booking appointment
app.use("/book",isLogin,BookingRoute)

app.listen(5000,()=>{
    console.log("Server is running at port 5000");
})