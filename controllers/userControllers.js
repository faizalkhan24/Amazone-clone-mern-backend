// Importing required modules and functions
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtTokens");
const validateMongodbId = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

// Controller function to handle user creation
const createUser = asyncHandler(async (req, res) => {
    // Extracting email from the request body
    const email = req.body.email;

    // Checking if a user with the given email already exists in the database
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        // If user does not exist, create a new user
        const newUser = await User.create(req.body);
        res.json(newUser); // Sending the newly created user as a JSON response
    } else {
        // If user already exists, throw an error
        throw new Error("User already exists.");
    }
});

// Controller function for handling user login
const loginController = asyncHandler(async (req, res) => {
    // Destructuring email and password from the request body
    const { email, password } = req.body;

    // Check if a user with the given email exists in the database
    const findUser = await User.findOne({ email });

    // Check if the user exists and if the entered password is correct
    if (findUser && (await findUser.isPasswordMatched(password))) {
        // Generate a new refreshToken and update it in the user document
        const refreshToken = await generateRefreshToken(findUser?._id);
        
        // Update refreshToken in the user document
        const updatedUser = await User.findByIdAndUpdate(
            findUser.id,
            { refreshToken },
            { new: true }
        );

        // Set refreshToken as a cookie with a 72-hour expiration
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });

        // Respond with user details and a generated JWT token
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        // If user does not exist or password is invalid, throw an error
        throw new Error("Invalid email or password");
    }
});

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookie.");

    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No refresh token present in db");

    // Verify refreshToken and generate a new accessToken
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with the refresh token");
        }

        const accessToken = generateToken(user?._id);
        res.json(accessToken);
    });
});

// Handle logout user
const handleLogout = asyncHandler(async (req, res) => {
    const cookie = req.cookies; // Use req.cookies to get cookies
    if (!cookie?.refreshToken) {
        throw new Error("No refresh token in cookie");
    }

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // No Content
    }

    // Assuming you store refreshToken in the user model and need to update it
    user.refreshToken = "";
    await user.save();

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    return res.sendStatus(204); // No Content
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getuser = await User.find();
        res.json(getuser);
    } catch (error) {
        throw new Error(error);
    }
});

// Get a single user
const getauser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getauser = await User.findById(id);
        res.json(getauser);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete a single user
const deleteauser = asyncHandler(async (req, res) => {
    const { id } = await req.params;
    validateMongodbId(id);
    try {
        const deleteauser = await User.findByIdAndDelete(id);
        res.json(deleteauser);
    } catch (error) {
        throw new Error(error);
    }
});

// Update a user
const updateaUser = asyncHandler(async (req, res) => {
    const { _id } = await req.user;
    validateMongodbId(_id);
    try {
        const updateaUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updateaUser);
    } catch (error) {
        throw new Error(error);
    }
});

// Block a user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const blockUser = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({ blockUser });
    } catch (error) {
        throw new Error(error);
    }
});

// Unblock a user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const unblockUser = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({ unblockUser });
    } catch (error) {
        throw new Error(error);
    }
});

// Exporting all functions for use in other parts of the application
module.exports = {
    createUser,
    loginController,
    handleRefreshToken,
    handleLogout,
    getAllUsers,
    getauser,
    deleteauser,
    updateaUser,
    blockUser,
    unblockUser,
};
