const { generateToken } = require("../config/jwtTokens");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")

const createUser = asyncHandler(async(req, res) =>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        // new user create
        const newUser = await User.create(req.body);
        res.json(newUser);
    } 
    else{
        // already exist 
     throw new Error("User already exist.")
    }
});

const logincontroller = asyncHandler(async(req, res)=>{
    const {email,password} = req.body;
    // check if user is exsit
    const finduser = await User.findOne({email});
    if (finduser && typeof finduser.isPasswordMatched === 'function' && (await finduser.isPasswordMatched(password))) {
        res.json({
            _id: finduser?._id,
            firstname:finduser?.firstname,
            lastname:finduser?.lastname,
            email:finduser?.email,
            mobile:finduser?.mobile,
            token:generateToken(finduser?._id),
        });
    }
    else{
        throw new Error("invalid password");
    }
});
module.exports = {createUser, logincontroller};