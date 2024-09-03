const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { category } = req.body;
  const { isAdmin } = req.user;
  if (!category) return res.status(400).json({ msg: "please fill all fields" });
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const existCatgory = await Category.findOne({ category });
  if (existCatgory)
    return res.status(400).json({ msg: "catgory already exists" });
  const newCategory = await Category.create({ category });
  res.status(201).json({ msg: "category created successfully" });
});

exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

exports.getCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const category = await Category.findById(id);
  if (!category) return res.status(400).json({ msg: "catgory not found" });
  res.status(200).json(category);
});

exports.updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { category } = req.body;
  const { id } = req.params;
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const existCatgory = await Category.findById(id);
  if (!existCatgory) return res.status(400).json({ msg: "catgory not found" });
  const findCategory = await Category.findOne({ category });
  if (findCategory && findCategory.category !== existCatgory.category)
    return res.status(400).json({ msg: "category already exists" });
  await Category.findByIdAndUpdate(
    id,
    {
      $set: {
        category,
      },
    },
    { new: true }
  );
  res.status(200).json({ msg: "catgory updated successfully" });
});

exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const existCatgory = await Category.findById(id);
  if (!existCatgory) return res.status(400).json({ msg: "catgory not found" });
  await Category.findByIdAndDelete(id);
  res.status(200).json(existCatgory);
});
