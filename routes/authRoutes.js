const express = require('express');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")
const { createUser, logincontroller, getAllUsers, getauser, deleteauser, updateaUser, blockUser, unblockUser } = require("../controllers/userControllers")
const router = express.Router();

router.post('/register', createUser);
router.post('/login', logincontroller);
router.get('/all-users', getAllUsers);
router.get('/:id', authMiddleware, isAdmin, getauser);
router.delete('/:id', deleteauser);
router.put('/edit-user',authMiddleware, updateaUser);
router.put('/block-user/:id',authMiddleware,isAdmin, blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin, unblockUser);



module.exports = router;
