const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
    uploadImages
    // Add other controllers as needed
} = require('../controllers/productController');

const { uploadPhoto, productImgResize } = require('../middlewares/uploadimg');

// Routes for product actions

// Create a new product
router.post('/create', authMiddleware, isAdmin, createProduct);

// Get all products
router.get('/all', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Update a product by ID
router.put('/update/:id', authMiddleware, isAdmin, updateProduct);

// Delete a product by ID
router.delete('/delete/:id', authMiddleware, isAdmin, deleteProduct);

// Add to wishlist
router.put('/wishlist', authMiddleware, isAdmin, addToWishlist);

// Rating
router.put('/rating', authMiddleware, isAdmin, rating);

// Image upload route with middleware for resizing and handling image uploads
router.put(
    '/upload/:id',
    authMiddleware,
    isAdmin,
    uploadPhoto.array('images', 2),
    productImgResize,
    uploadImages
);
module.exports = router;
