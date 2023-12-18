const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose


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
    refreshToken:{
        type: String,
    },

},
{
        timestamps: true,
    }
);

// Password encryption middleware (pre-save hook)
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method for checking if entered password matches the stored hashed password
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', userSchema);
