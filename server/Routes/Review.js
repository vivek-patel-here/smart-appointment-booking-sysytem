const express = require("express");
const router = express.Router({mergeParams:true});
const {reviewFetchLogic,reviewPostLogic} = require("../controllers/ReviewLogic.js");
const { isLogin } = require("../Utilities/isRegister.js");
const { wrapAsync } = require("../Utilities/WrapAsync.js");
const { validateSchema } = require("../Utilities/ValidateSchema.js");
const {body} =require("express-validator")

//review fetch end point
router.get("/:shopid", wrapAsync(reviewFetchLogic));

//review post end point
router.post("/", [
    body("shopId").isString(),
    body("review").isString(),
    body("rating").isNumeric(),
], validateSchema, isLogin, wrapAsync(reviewPostLogic));

module.exports = router;
