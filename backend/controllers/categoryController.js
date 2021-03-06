import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, url, tags, isPopular, description, isFeatured } = req.body;

  const category = new Category({
    author: req.user._id,
    name,
    url,
    tags,
    description,
    isFeatured,
    isPopular,
  });
  const createCategory = await category.save();
  res.status(201).json(createCategory);
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

export { createCategory, getCategories };
