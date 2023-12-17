const express = require('express');
const router = express.Router();
const {createUser, logincontroller, getAllUsers, getauser, deleteauser, updateaUser} = require("../controllers/userControllers")
const {authMiddleware} = require("../middlewares/authMiddleware")

router.post('/register', createUser);
router.post('/login', logincontroller);
router.get('/all-users', getAllUsers);
router.get('/:id',authMiddleware, getauser);
router.delete('/:id', deleteauser);
router.put('/:id', updateaUser);



module.exports = router;
 