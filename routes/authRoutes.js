const express = require('express');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createUser, getAllUsers, getauser, deleteauser, updateaUser, blockUser, unblockUser, handleRefreshToken, handleLogout, loginController, updatePassword, forgotPasswordToken, resetPassword, AdminloginController, getwislist, saveAddress, addToCart, getusercart, emptyCart, applyCoupon, createOrder, getOrder, updateOrderstatus } = require("../controllers/userControllers");
const router = express.Router();

// Register a new user
router.post('/register', createUser);

// User login
router.post('/login', loginController);

// User admin login
router.post('/login', AdminloginController);

// User logout
router.post('/logout', handleLogout);

// Get all users
router.get('/users', getAllUsers);

// Refresh token endpoint
router.get('/refresh-token', handleRefreshToken);

// Get a specific user by ID (requires admin privileges)
router.get('/users/:id', authMiddleware, isAdmin, getauser);

//get wishlist 
router.get('/wishlist', authMiddleware, getwislist);

// Delete a user by ID
router.delete('/users/:id', deleteauser);

// Update user information (requires authentication)
router.put('/users/:id', authMiddleware, updateaUser);

// Block a user by ID (requires admin privileges)
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);

// Unblock a user by ID (requires admin privileges)
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

router.put('/password',authMiddleware,updatePassword);

router.post('/forgot-password', forgotPasswordToken);

router.post('/cart', authMiddleware, addToCart);

router.post('/applycoupon', authMiddleware, applyCoupon);

router.post('/cash-order', authMiddleware, createOrder);

router.get('/getusercart', authMiddleware, getusercart);

router.get('/get-orders', authMiddleware, getOrder);

router.put('/order/update-order/:id',authMiddleware, isAdmin, updateOrderstatus );


router.delete('/empty-cart', authMiddleware, emptyCart);

router.put('/reset-password/:token', resetPassword);

// save user address
router.put('/saveaddress', authMiddleware, saveAddress);


module.exports = router;
