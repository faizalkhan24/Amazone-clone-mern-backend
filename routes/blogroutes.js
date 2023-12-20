// blogRoutes.js

const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createblog, getallblog, updateblog, deleteblog, getblog, likesblog } = require('../controllers/blogController');

// Define routes for blog-related operations with authentication and isAdmin check
router.post('/create', authMiddleware, isAdmin, createblog);
router.get('/allblogs', authMiddleware, getallblog);
router.get('/blogs/:id', getblog);
router.put('/update/:id', authMiddleware, isAdmin, updateblog);
router.delete('/delete/:id', authMiddleware, isAdmin, deleteblog);
router.put('/likes',authMiddleware, isAdmin, likesblog)

// Additional routes for other blog-related operations
// ...

module.exports = router;
