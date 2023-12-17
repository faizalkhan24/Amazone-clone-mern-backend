const express = require('express');
const router = express.Router();
const {createUser, logincontroller, getAllUsers, getauser, deleteauser, updateaUser} = require("../controllers/userControllers")


router.post('/register', createUser);
router.post('/login', logincontroller);
router.get('/all-users', getAllUsers);
router.get('/:id', getauser);
router.delete('/:id', deleteauser);
router.put('/:id', updateaUser);


module.exports = router;
 