const express = require('express');
const router = express.Router();
const {createUser, logincontroller} = require("../controllers/userControllers")


router.post('/register', createUser);
router.post('/login', logincontroller);

module.exports = router;
