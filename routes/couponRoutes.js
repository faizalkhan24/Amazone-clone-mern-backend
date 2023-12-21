const express = require("express");
const { createCoupon, getallCoupon, updateCoupon, deleteCoupon } = require("../controllers/couponContoller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/createCoupon',authMiddleware,isAdmin, createCoupon);
router.get('/getallCoupon',authMiddleware,isAdmin, getallCoupon);
router.put('/updateCoupon/:id',authMiddleware,isAdmin, updateCoupon);
router.delete('/deleteCoupon/:id',authMiddleware,isAdmin, deleteCoupon);



module.exports = router;