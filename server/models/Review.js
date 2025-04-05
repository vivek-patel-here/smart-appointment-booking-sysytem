const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        review: {
            type: String,
        },
        rating: {
            type: Number,
        },
        from: {
            type: String,
        },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };
