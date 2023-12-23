const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    // Field for product name
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    // Field for product description
    description: {
        type: String,
        required: true,
    },
    // Field for product price
    price: {
        type: Number,
        required: true,
    },
    // Field for product category
    category: {
        type: String,
        require:true,
    },

    quantity: {
        type:Number,
        require:true,
    },
    brand:{
        type: String,
        require:true,
    },


    sold:{
        type:Number,
        default:0
    },

    // Field for product image URL
    images: [],


    // Additional fields based on your product requirements

    color: [],
    tags:[],
    rating: [
        {
            star: Number,
            comment : String,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    ],
    totalrating : {
        type : String,
        default:0
    },
}, {
    timestamps: true,
});

// Export the model
module.exports = mongoose.model('Product', productSchema);
