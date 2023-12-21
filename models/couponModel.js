// Import mongoose
const mongoose = require('mongoose');

// Define the coupon schema
const couponSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
        uppercase:true,
      },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  // Additional fields can be added based on your requirements
});

// Create the Coupon model
const Coupon = mongoose.model('Coupon', couponSchema);

// Export the Coupon model
module.exports = Coupon;
