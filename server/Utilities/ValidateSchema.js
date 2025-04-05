const { validationResult } = require("express-validator");

const validateSchema = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result);
    return res.status(404).json({success:false,message:result.errors[0].msg});
  }
  next();
}

module.exports={validateSchema};
