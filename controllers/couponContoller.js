const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getallCoupon = asyncHandler(async (req, res) => {
    try {
        const Coupons = await Coupon.find();
        res.json(Coupons);
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const updateCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const Coupons = await Coupon.findByIdAndUpdate(id, req.body,{new:true});
        res.json(Coupons);
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const deleteCoupon = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const Coupons = await Coupon.findByIdAndDelete(id);
        res.json(Coupons);
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = {createCoupon,getallCoupon, updateCoupon, deleteCoupon};
