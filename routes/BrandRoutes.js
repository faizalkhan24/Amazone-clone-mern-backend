const express = require("express");
const { createBrand, deleteBrand, getBrand, getallBrand } = require("../controllers/BrandContoller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { updateBrand } = require("../controllers/BrandContoller");
const router = express.Router();

router.post('/createBrand', authMiddleware,isAdmin, createBrand);
router.put('/updateBrand/:id', authMiddleware,isAdmin, updateBrand);
router.delete('/deleteBrand/:id', authMiddleware,isAdmin, deleteBrand);
router.get('/getBrand/:id', authMiddleware,isAdmin, getBrand);
router.get('/getallBrand', authMiddleware,isAdmin, getallBrand);



module.exports = router;