const { Shop } = require("../models/Shop.js");
const cloudinary = require("cloudinary").v2;

const updateDetails = async (req, res) => {
  const { _id } = req.shop;
  // const updatedDetails = { ...req.body, ProvideService: true };

  //updating only new values
  let updateDetail = { ProvideService: true };
  const {
    shopName,
    description,
    category,
    bussinessNumber,
    location,
    openingTime,
    closingTime,
  } = req.body;
  if (shopName) updateDetail["shopName"] = shopName;
  if (description) updateDetail["description"] = description;
  if (category) updateDetail["category"] = category;
  if (bussinessNumber) updateDetail["bussinessNumber"] = bussinessNumber;
  if (location) updateDetail["location"] = location;
  if (openingTime) updateDetail["openingTime"] = openingTime;
  if (closingTime) updateDetail["closingTime"] = closingTime;
  if (req.file && req.file.path) updateDetail["shopImg"] = req.file.path;

  let data = await Shop.findByIdAndUpdate(_id, updateDetail);

  //In case updation fails
  if (!data) {
    if (req.file) {
      await cloudinary.uploader.destroy(
        req.file.path.split("/").slice(-2).join("/").split(".")[0]
      );
    }
    return res.status(501).json({
      success: false,
      message: "Updation failed due to database Error!Try again later.",
    });
  }

  //deleting the previous Img from cloud storage
  if (req.file && req.file.path && req.shop.shopImg) {
    await cloudinary.uploader.destroy(
      req.shop.shopImg.split("/").slice(-2).join("/").split(".")[0]
    );
  }

  //returning success response
  return res
    .status(200)
    .json({ success: true, message: "Updation successfull!" });
};

const getShops = async (req, res) => {
  let shops = await Shop.find({ ProvideService: true });
  if (!shops) {
    return res.status(501).json({
      success: false,
      message: "Unable to fetch data at this moment!",
    });
  }

  shops = shops.map((s) => {
    return {
      shopId: s._id,
      registeredEmail: s.registeredEmail,
      owner: s.owner,
      rating: s.rating,
      bussinessNumber: s.bussinessNumber,
      category: s.category,
      description: s.description,
      location: s.location,
      openingTime: s.openingTime,
      shopImg: s.shopImg,
      closingTime: s.closingTime,
      shopName: s.shopName,
    };
  });

  return res
    .status(200)
    .json({ success: true, message: "Data fetched successfully!", shops });
};

module.exports = { updateDetails, getShops };
