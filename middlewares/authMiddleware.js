const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {   
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded); // Log decoded payload
                // ... rest of your logic
                next(); // Make sure to call next() to proceed to the next middleware
            }
        } catch (error) {
            console.error('Token verification error:', error);
            throw new Error("Not authorized, token expired. Please log in again");
        }
    } else {
        throw new Error("There is no token attached to the header");
    }
});

module.exports = { authMiddleware };