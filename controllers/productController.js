const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require("slugify");


// Controller function to create a new product
const createProduct = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        category,
        quantity,
        brand,
        images,
        color,
    } = req.body;

    // Assuming you have a slugify function
    const slug = slugify(title);

    const newProduct = await Product.create({
        title,
        slug,
        description,
        price,
        category,
        quantity,
        brand,
        images,
        color,
    });

    res.status(201).json(newProduct);
});


// Controller function to get all products
const getAllProducts = asyncHandler(async (req, res) => {
    try {

        const products = await Product.find();
        res.json(products);
    } catch (error){
        throw new Error(error);
    }
});

// Controller function to get a single product by ID
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Controller function to update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category, quantity, brand, images, color } = req.body;

    try {
        if (title) {
            req.body.slug = slugify(title, { lower: true });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                title,
                slug: req.body.slug,
                description,
                price,
                category,
                quantity,
                brand,
                images,
                color,
            },
            { new: true }
        );

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Controller function to delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Additional controller functions for handling other actions on products
// ...

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    // Add other controller functions as needed
};
 