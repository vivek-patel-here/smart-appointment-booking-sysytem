const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateSchema } = require("../Utilities/ValidateSchema");
const { wrapAsync } = require("../Utilities/WrapAsync.js");
const { body } = require("express-validator");
const { BookingLogic } = require("../controllers/BookingLogic");

router.post(
  "/",
  [
    body("shopId").isString().isLength({ min: 2 }),
    body("fullname").isString().isLength({ min: 2 }),
    body("fullname").isString().isLength({ min: 2 }),
    body("mobile").isString().isLength({ min: 2 }),
    body("appointmentDateTime").isString().isLength({ min: 2 }),
    body("remark").isString().isLength({ min: 2 }).optional(),
  ],
  validateSchema,
  wrapAsync(BookingLogic)
);

module.exports = router;
