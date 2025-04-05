const mongoose = require("mongoose");
let rate =Math.floor(Math.random()*5);
const shopSchema = new mongoose.Schema({
  registeredEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  ProvideService: {
    type: Boolean,
    default: false,
    required: true,
  },
  bussinessNumber: {
    type: Number,
  },
  shopName: {
    type: String,
  },
  shopImg: String,
  description: String,
  shopImg: String,
  rating: {
    type: Number,
    default: rate<3?rate+2:rate
  },
  category: {
    type: String,
    enum: [
      "Beauty & Wellness",
      "Medical & Health Services",
      "Car Services",
      "Educational",
      "Restaurant",
      "Others",
    ],
  },
  location: String,
  openingTime: String,
  closingTime: String
});

const Shop = mongoose.model('Shop',shopSchema);

module.exports={Shop}
