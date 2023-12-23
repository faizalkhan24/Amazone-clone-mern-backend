const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbid");


const createEnquiry = asyncHandler(async (req, res) => {
    try {
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

const updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});


const deleteEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json(deletedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});


const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getEnquiry = await Enquiry.findById(id);
        res.json(getEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

const getallEnquiry = asyncHandler(async (req, res) => {

    try {
        const allEnquiry = await Enquiry.find();
        res.json(allEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getallEnquiry };