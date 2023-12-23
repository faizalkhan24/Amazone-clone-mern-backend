const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color: String,
            price: Number,
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: {  // <-- Corrected field name
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model('Cart', cartSchema);

