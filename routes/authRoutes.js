const express = require('express');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createUser, getAllUsers, getauser, deleteauser, updateaUser, blockUser, unblockUser, handleRefreshToken, handleLogout, loginController, updatePassword, forgotPasswordToken, resetPassword } = require("../controllers/userControllers");
const router = express.Router();

// Register a new user
router.post('/register', createUser);

// User login
router.post('/login', loginController);

// User logout
router.post('/logout', handleLogout);

// Get all users
router.get('/users', getAllUsers);

// Refresh token endpoint
router.get('/refresh-token', handleRefreshToken);

// Get a specific user by ID (requires admin privileges)
router.get('/users/:id', authMiddleware, isAdmin, getauser);

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

router.put('/reset-password/:token', resetPassword);

module.exports = router;
