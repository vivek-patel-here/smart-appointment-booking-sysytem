const { Shop } = require("../models/Shop.js");
const { Appointment } = require("../models/Appointment.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//***************Shop Signup Logic*****************/
const shopSignupLogic = async (req, res) => {
  const { registeredEmail, owner, password } = req.body;
  const AlreadyExistingShop = await Shop.findOne({ registeredEmail });
  if (AlreadyExistingShop) {
    return res.status(404).json({
      success: false,
      message:
        "An account with this email already exists. Please use a different email or log in to continue.",
    });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newShop = new Shop({
    registeredEmail,
    owner,
    password: hashedpassword,
  });

  const registeredShop = await newShop.save();
  if (!registeredShop) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server Error" });
  }

  const payload = {
    id: registeredShop._id,
    owner: registeredShop.owner,
    email: registeredShop.registeredEmail,
  };

  let token = jwt.sign(payload, process.env.JWTSECRET);

  return res.status(200).json({
    success: true,
    message: "Shop Reistered Successfully",
    token,
    owner: registeredShop.owner,
  });
};

//************************Shop Owner Login Logic*****************************
const shopLoginLogic = async (req, res) => {
  const { registeredEmail, password } = req.body;
  const shop = await Shop.findOne({ registeredEmail });
  if (!shop) {
    return res
      .status(404)
      .json({ success: false, message: "No Owner found! Try Signup" });
  }
  const isPasswordTrue = await bcrypt.compare(password, shop.password);
  if (!isPasswordTrue) {
    return res
      .status(409)
      .json({ success: false, message: "Wrong Credentials!" });
  }

  const payload = {
    id: shop._id,
    owner: shop.owner,
    email: shop.registeredEmail,
  };

  let token = jwt.sign(payload, process.env.JWTSECRET);

  return res
    .status(200)
    .json({
      success: true,
      message: "Login Successful",
      token,
      owner: shop.owner,
    });
};

// ************************Shop detail fetch Logic *************************
const fetchShopDetails = async (req, res) => {
  const { id } = req.shop;
  const registeredShop = await Shop.findOne({ _id: id });
  if (!registeredShop) {
    return res
      .status(404)
      .json({
        success: false,
        message: "No shop found associated with these credentials!",
      });
  }
  const record = {
    ProvideService: registeredShop.ProvideService,
    bussinessNumber: registeredShop.bussinessNumber,
    category: registeredShop.category,
    closingTime: registeredShop.closingTime,
    description: registeredShop.description,
    location: registeredShop.location,
    openingTime: registeredShop.openingTime,
    owner: registeredShop.owner,
    rating: registeredShop.rating,
    registeredEmail: registeredShop.registeredEmail,
    shopImg:registeredShop.shopImg,
    shopName: registeredShop.shopName,
    _id:registeredShop._id,
  };
  return res
    .status(200)
    .json({
      success: true,
      message: "Data found successfully",
      record,
    });
};

//*******************************shop appointment details Logic*************************
const fetchShopAppointmentDetails = async (req, res) => {
  const { id } = req.shop;
  const appointments = await Appointment.find({ shopId: id });
  if (!appointments) {
    return res
      .status(404)
      .json({
        success: false,
        message: "Unable to fetch Appointment at this moments!",
      });
  }
  return res
    .status(200)
    .json({
      success: true,
      message: "Appointment fetched successfully",
      appointments,
    });
};


/*****************Route for updating appointment status by service provide end***********/
const updateStatus =async(req,res)=>{
  const {_id,status,notactive} =req.body;
  const response = await Appointment.findByIdAndUpdate(_id,{status,notactive})
  if(!response){
    return res.status(500).json({success:false,message:"Unable to process your Response at this moment!"});
  }
  return res.status(200).json({success:true,message:"Status Updated SuccessfullY!"});
}


module.exports = {
  shopLoginLogic,
  shopSignupLogic,
  fetchShopDetails,
  fetchShopAppointmentDetails,
  updateStatus
};
