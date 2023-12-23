const express = require("express");
const { createColor, deleteColor, getColor, getallColor } = require("../controllers/ColorController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { updateColor } = require("../controllers/ColorController");
const router = express.Router();

router.post('/createColor', authMiddleware,isAdmin, createColor);
router.put('/updateColor/:id', authMiddleware,isAdmin, updateColor);
router.delete('/deleteColor/:id', authMiddleware,isAdmin, deleteColor);
router.get('/getColor/:id', authMiddleware,isAdmin, getColor);
router.get('/getallColor', authMiddleware,isAdmin, getallColor);



module.exports = router;