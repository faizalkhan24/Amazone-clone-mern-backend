const express = require('express');
const Blog = require('../models/blogModel');
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const slugify = require("slugify");

const createblog = asyncHandler(async (req, res) => {
  try {
    const newblog = await Blog.create(req.body);
    res.json(newblog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateblog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateblog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateblog);
  } catch (error) {
    throw new Error(error);
  }
});


//get blog

const getblog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getblog = await Blog.findById(id).populate("likes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true },
    );

    // Ensure numViews is treated as a number
    updateViews.numViews = Number(updateViews.numViews);

    res.json({ getblog, updateViews });
  } catch (error) {
    throw new Error(error);
  }
});


//get all blog

const getallblog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getblog = await Blog.find();
    res.json(getblog);
  } catch (error) {
    throw new Error(error);
  }
});

//delete blog

const deleteblog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteblog = await Blog.findByIdAndDelete(id);
    res.json(deleteblog);
  } catch (error) {
    throw new Error(error);
  }
});



//likes the blog

const likesblog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?._id;
  const isLiked = blog?.likes?.includes(loginUserId?.toString());

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  const alreadyDisliked = blog?.dislikes?.includes(loginUserId?.toString());

  if (alreadyDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else if (isLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(updatedBlog);
  }
});



//disliked the blog


const dislikesblog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?._id;
  const isDisliked = blog?.dislikes?.includes(loginUserId?.toString());

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  const alreadyLiked = blog?.likes?.includes(loginUserId?.toString());

  if (alreadyLiked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else if (isDisliked) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(updatedBlog);
  }
});





module.exports = {
  createblog,
  updateblog,
  getblog,
  getallblog,
  deleteblog,
  likesblog,
  dislikesblog
};
