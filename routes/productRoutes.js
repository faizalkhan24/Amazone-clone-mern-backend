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
    // Add other controllers as needed
} = require('../controllers/productController');

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

router.put('/wishlist', authMiddleware, isAdmin, addToWishlist);

router.put('/rating', authMiddleware, isAdmin, rating);


module.exports = router;
