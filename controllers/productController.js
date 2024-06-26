const { query } = require('express');
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbid");
const User = require("../models/userModel");
const {cloudinaryUploadImg,cloudinaryDeleteImg} = require('../utils/cloudinary');
const fs = require('fs');

// Controller function to create a new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const queryObject = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];

        // Remove excluded fields from the queryObject
        excludeFields.forEach((el) => delete queryObject[el]);

        // Convert queryObject to string and replace comparison operators
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        // Parse the modified string back to JSON
        const parsedQuery = JSON.parse(queryString);

        // Find products based on the modified query
        let query = Product.find(parsedQuery);

        // Handle sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        }

        // Handle pagination
        if (req.query.page) {
            try {
                const page = req.query.page;
                const limit = req.query.limit;
                const startIndex = (page - 1) * limit;

                if (startIndex >= (await Product.countDocuments())) {
                    throw new Error("This page does not exist");
                }

                query = query.skip(startIndex).limit(limit);

            } catch (error) {
                console.error('Pagination error:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }

        // Execute the query
        const products = await query;

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single product by ID
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!validateMongoDbId(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findById(id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category, quantity, brand, images, color } = req.body;

    // Validate MongoDB ObjectId
    if (!validateMongoDbId(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

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

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!validateMongoDbId(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { proId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyadd = user.wishlist.find((id) => id.toString() === proId);
        if (alreadyadd) {
            let user = await User.findByIdAndUpdate(_id, {
                $pull: { wishlist: proId },
            },
                {
                    new: true,
                },
            );
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: { wishlist: proId },
            },
                {
                    new: true,
                },
            );
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});


const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, proId, comment } = req.body;
    try {
        const product = await Product.findById(proId);
        let alreadyrated = product.rating.find(
            (rating) => rating.postedby.toString() === _id.toString()
        );

        if (alreadyrated) {
            await Product.findOneAndUpdate(
                {
                    "rating.postedby": _id,
                },
                {
                    $set: { "rating.$.star": star, "rating.$.comment": comment },
                },
                {
                    new: true,
                }
            );

            const updatedProduct = await Product.findById(proId);
            res.json({ message: 'Rating updated successfully', product: updatedProduct });
        } else {
            const rateproduct = await Product.findByIdAndUpdate(
                proId,
                {
                    $push: {
                        rating: {
                            star: star,
                            comment: comment,
                            postedby: _id,
                        },
                    },
                },
                {
                    new: true,
                }
            );

            const getallrating = await Product.findById(proId);
            let ratingsum = 0;

            for (const rating of getallrating.rating) {
                ratingsum += rating.star;
            }

            let actualRating = Math.round(ratingsum / getallrating.rating.length);

            const finalProduct = await Product.findByIdAndUpdate(
                proId,
                {
                    totalrating: actualRating,
                },
                {
                    new: true,
                }
            );

            res.json({ message: 'Rating added successfully', product: finalProduct });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const uploadImages = asyncHandler(async (req, res) => {

    try {
        const uploader = (path) => cloudinaryUploadImg(path, 'images');
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        const images = urls.map((file) => {
            return file;
        })
        res.json(images);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteImages = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = cloudinaryDeleteImg(id, 'images');
        res.json({message: "deleted"});
   
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
    uploadImages,
    deleteImages
    // Add other controller functions as needed
};
