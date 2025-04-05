const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateSchema } = require("../Utilities/ValidateSchema");
const { wrapAsync } = require("../Utilities/WrapAsync.js");
const { body } = require("express-validator");
const { BookingLogic} = require("../controllers/BookingLogic");
const {fetchBookingLogic,cancelAppointment} =require("../controllers/fetchBookingLogic.js")

/**************************Route for book an new appointment*************************/
router.post(
  "/",
  [
    body("shopId").isString().isLength({ min: 2 }),
    body("shopName").isString().isLength({min:2}),
    body("fullname").isString().isLength({ min: 2 }),
    body("fullname").isString().isLength({ min: 2 }),
    body("mobile").isString().isLength({ min: 2 }),
    body("appointmentDateTime").isString().isLength({ min: 2 }),
    body("remark").isString().isLength({ min: 2 }).optional(),
  ],
  validateSchema,
  wrapAsync(BookingLogic)
);

/**********Route for fetch all the appointment for a specific user********************/
router.post("/booking",wrapAsync(fetchBookingLogic));

/********************Route for cancel the appointment for a specific user ************/
router.put("/status",wrapAsync(cancelAppointment));


module.exports = router;
