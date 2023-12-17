// Importing the generateToken function from jwtTokens configuration
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtTokens");

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
const logincontroller = asyncHandler(async (req, res) => {
    // Destructuring email and password from the request body
    const { email, password } = req.body;

    // Check if a user with the given email exists in the database
    const findUser = await User.findOne({ email });

    // Check if the user exists, has a valid isPasswordMatched method, and the entered password is correct
    if (findUser && (await findUser.isPasswordMatched(password))) {
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
        throw new Error("Invalid password");
    }
});

//get all user

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getuser = await User.find();
        res.json(getuser);

    } catch (error) {
        throw new Error(error);
    }
});

// get a single user

const getauser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const getauser = await User.findById(id);
        res.json(
            getauser,
        )
    }
    catch (error) {
        throw new Error(error);
    }

});

// delete a single user

const deleteauser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = await req.params;
    try {
        const deleteauser = await User.findByIdAndDelete(id);
        res.json(
            deleteauser,
        )
    }
    catch (error) {
        throw new Error(error);
    }

});

// update a  user

const updateaUser = asyncHandler(async (req, res) => {
    console.log();
    const { _id } = await req.user;
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
    }
    catch (error) {
        throw new Error(error);
    }

});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const blockUser = await User.findByIdAndUpdate(
            id,
            {
                isBlooked: true,
            },
            {
                new: true,
            },
        );
      res.json({blockUser});
    } catch (error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const unblockUser = await User.findByIdAndUpdate(
            id,
            {
                isBlooked: false,
            },
            {
                new: true,
            },
        );
        res.json({unblockUser});
    } catch (error) {
        throw new Error(error);
    }
});

// Exporting the createUser and loginController functions for use in other parts of the application
module.exports = { createUser, logincontroller, getAllUsers, getauser, deleteauser, updateaUser, blockUser, unblockUser };