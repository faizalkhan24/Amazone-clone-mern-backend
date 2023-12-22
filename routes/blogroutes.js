const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createblog, getallblog, updateblog, deleteblog, getblog, likesblog, dislikesblog, uploadimg, uploadImages } = require('../controllers/blogController');
const { blogImgResize, uploadPhoto } = require('../middlewares/uploadimg');

// Define routes for blog-related operations with authentication and isAdmin check
router.post('/create', authMiddleware, isAdmin, createblog);
router.get('/allblogs', authMiddleware, getallblog);
router.get('/blogs/:id', getblog);
router.put('/update/:id', authMiddleware, isAdmin, updateblog);
router.delete('/delete/:id', authMiddleware, isAdmin, deleteblog);
router.put('/likes', authMiddleware, isAdmin, likesblog);
router.put('/dislikes', authMiddleware, isAdmin, dislikesblog);

// Image upload route with middleware for resizing and handling image uploads
router.put(
    '/upload/:id',
    authMiddleware,
    isAdmin,
    uploadPhoto.array('images', 10),
    blogImgResize,
    uploadImages
  );
// Additional routes for other blog-related operations
// ...

module.exports = router;
