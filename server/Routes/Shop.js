const express  =require("express")
const {body} =require("express-validator");
const { validateSchema } = require("../Utilities/ValidateSchema");
const router =express.Router({mergeParams:true});
const {wrapAsync} =require("../Utilities/WrapAsync.js");
const {shopLoginLogic,shopSignupLogic,fetchShopDetails,fetchShopAppointmentDetails, updateStatus} = require("../controllers/ShopLogic.js");
const { isLoginShop } = require("../Utilities/isRegisterShop.js");
const  {updateDetails,getShops} =require("../controllers/UpdateShopDetails.js")
const {upload} =require("../Utilities/cloudinaryConfig.js");
const { fetchShopReviews } = require("../controllers/fetchShopReview.js");

//**************Route for shop owner signup *************************
router.post("/signup",[
    body("owner").notEmpty().isString().isLength({min:2}),
    body("registeredEmail","Please Enter a valid username").isEmail().notEmpty(),
    body("password","Please Enter a valid password").isString().isLength({min:8}).notEmpty()
],validateSchema,wrapAsync(shopSignupLogic))

//***************Route for shop owner Login**************************
router.post("/login",[
    body("registeredEmail","Please Enter a valid username").isEmail().notEmpty(),
    body("password","Please Enter a valid password").isString().isLength({min:8}).notEmpty()
],validateSchema,wrapAsync(shopLoginLogic))

//******************Route for fetching route detail********************
router.get("/",isLoginShop,wrapAsync(fetchShopDetails));

//*******************Route for fetching Appointmensts details *****************************
router.get("/appointments",isLoginShop,wrapAsync(fetchShopAppointmentDetails));

//************************Route for uploading the image and other shop details ****************************
router.patch("/",isLoginShop,upload.single("shopImg"),wrapAsync(updateDetails));

//**************************Route for fetching all the shops*************************
router.get("/services",wrapAsync(getShops));

/*************Route for changing the status of appointment by shop******************/
router.put("/status",isLoginShop,wrapAsync(updateStatus));

/**********************Route for fetching a review of a specific users*****************/
router.get("/review",isLoginShop,wrapAsync(fetchShopReviews));

module.exports = router