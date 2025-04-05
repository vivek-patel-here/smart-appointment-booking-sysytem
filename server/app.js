const path =require("path");
require("dotenv").config({path:path.join(__dirname,".env")})
const express =require("express")
const app =express();
const authRoute = require("./Routes/Auth.js")
const BookingRoute = require("./Routes/Booking.js")
const reviewRoute =require("./Routes/Review.js")
const shopRoute =require("./Routes/Shop.js")
const connectToDB =require("./Utilities/ConnectDb.js")
const CORS=require("cors")
const {isLogin} =require("./Utilities/isRegister.js")


//middleware
app.use(CORS())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Connection with database
connectToDB()
.then((res) => {
  console.log("Connected to DB successfully");
})
.catch((err) => console.log(err));

//Route 1: for user Authentication
app.use("/Auth",authRoute)

//Route 2: for booking appointment
app.use("/book",isLogin,BookingRoute)

// Route 3: for shop Authentication
app.use("/shop",shopRoute)

//Route 4: for review management
app.use("/review",reviewRoute)

app.listen(5000,()=>{
    console.log("Server is running at port 5000");
})