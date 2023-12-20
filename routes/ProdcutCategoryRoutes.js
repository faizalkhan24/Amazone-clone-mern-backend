const express = require("express");
const { createCategory, deleteCategory, getCategory, getallCategory } = require("../controllers/ProdcutcategoryContoller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { updateCategory } = require("../controllers/ProdcutcategoryContoller");
const router = express.Router();

router.post('/createCategory', authMiddleware,isAdmin, createCategory);
router.put('/updateCategory/:id', authMiddleware,isAdmin, updateCategory);
router.delete('/deleteCategory/:id', authMiddleware,isAdmin, deleteCategory);
router.get('/getCategory/:id', authMiddleware,isAdmin, getCategory);
router.get('/getallCategory', authMiddleware,isAdmin, getallCategory);



module.exports = router;