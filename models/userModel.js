const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose
const crypto = require('crypto');


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    // Field for first name
    firstname: {
        type: String,
        required: true,
    },
    // Field for last name
    lastname: {
        type: String,
        required: true,
    },
    // Field for email with uniqueness constraint
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Field for mobile with uniqueness constraint
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    // Field for password
    password: {
        type: String,
        required: true,
    },
    // Field for user role with a default value of "user"
    role: {
        type: String,
        default: "user",
    },
    cart: {
        type: Array,
        default: [],
    },
    isBlooked :{
        type: Boolean,
        default:false
    },
    address: [{
        type: ObjectId,
        ref: "Address"
    }],
    wishlist: [{
        type: ObjectId,
        ref: "Product"
    }],
   
    refreshToken: {
        type: String,
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,

},
{
        timestamps: true,
    }
);

// Password encryption middleware (pre-save hook)
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method for checking if entered password matches the stored hashed password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generatePasswordResetToken = function () {
    // Generate a random token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Store the hashed token in the database
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the expiration time to 30 minutes from now
    this.passwordResetExpire = Date.now() + 30 * 60 * 1000;

    // Return the plain token (to be sent to the user)
    return resetToken;
};

// Export the model
module.exports = mongoose.model('User', userSchema);
