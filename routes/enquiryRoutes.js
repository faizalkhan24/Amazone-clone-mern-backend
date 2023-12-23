const express = require("express");
const { createEnquiry, deleteEnquiry, getEnquiry, getallEnquiry,updateEnquiry } = require("../controllers/enquiryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/createEnquiry', authMiddleware,isAdmin, createEnquiry);
router.put('/updateEnquiry/:id', authMiddleware,isAdmin, updateEnquiry);
router.delete('/deleteEnquiry/:id', authMiddleware,isAdmin, deleteEnquiry);
router.get('/getEnquiry/:id', authMiddleware,isAdmin, getEnquiry);
router.get('/getallEnquiry', authMiddleware,isAdmin, getallEnquiry);



module.exports = router;