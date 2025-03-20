const express  =require("express")
const {body} =require("express-validator");
const { validateSchema } = require("../Utilities/ValidateSchema");
const router =express.Router({mergeParams:true});
const {wrapAsync} =require("../Utilities/WrapAsync.js")
const {SignupLogic} =require("../controllers/SignupLogic.js");
const { LoginLogic } = require("../controllers/LoginLogic.js");

//**************Route for signup *************************
router.post("/signup",[
    body("username").notEmpty().isString().isLength({min:2}),
    body("email","Please Enter a valid username").isEmail().notEmpty(),
    body("password","Please Enter a valid password").isString().isLength({min:8}).notEmpty()
],validateSchema,wrapAsync(SignupLogic))

//***************Route for Login**************************
router.post("/login",[
    body("email","Please Enter a valid username").isEmail().notEmpty(),
    body("password","Please Enter a valid password").isString().isLength({min:8}).notEmpty()
],validateSchema,wrapAsync(LoginLogic))


module.exports = router