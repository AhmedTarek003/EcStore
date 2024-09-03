const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const fs = require("fs");
const {
  uploadImageToCloudinary,
  removeImagefromCludinary,
} = require("../utils/cloudinary");

exports.createProductCtrl = asyncHandler(async (req, res) => {
  const { productName, category, price, discountPrice, stock, colors, size } =
    req.body;
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(403).json({ msg: "access denied" });
  }

  // upload Image to Cloudinary
  const files = req.files;
  let images = [];
  if (files.length > 0) {
    for (img of files) {
      const results = await uploadImageToCloudinary(img.path);
      images.push({
        url: results.url,
        publicId: results.public_id,
      });
      fs.unlinkSync(img.path);
    }
  } else {
    return res
      .status(400)
      .json({ msg: "your must add images for your product" });
  }

  await Product.create({
    productName,
    category,
    price,
    discountPrice,
    stock,
    colors,
    size,
    productImages: images,
  });
  res.status(201).json({ msg: "Product created successfully" });
});

exports.getAllProductsCtrl = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const pageNumber = req.query.pageNumber;
  const PRODUCTS_PER_PAGE = pageNumber === "-" ? "" : 5;
  let products;

  if (pageNumber || category === "all") {
    products = await Product.find()
      .skip((pageNumber - 1) * PRODUCTS_PER_PAGE)
      .limit(PRODUCTS_PER_PAGE)
      .sort("-stock");
  }
  if (category && category !== "all") {
    products = await Product.find({ category: category });
  }
  if (search && search.trim() !== "") {
    products = await Product.find({
      productName: { $regex: search, $options: "i" },
    });
  }

  const productsCount = await Product.countDocuments();
  const pages = Math.ceil(productsCount / PRODUCTS_PER_PAGE);
  res.status(200).json({
    pages,
    page: Number(pageNumber),
    result: products.length,
    products,
  });
});

exports.getProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ msg: "Product not found" });
  res.status(200).json(product);
});

exports.updateProductCtrl = asyncHandler(async (req, res) => {
  const { productName, category, price, discountPrice, stock, colors, size } =
    req.body;
  const { id } = req.params;

  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });

  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        productName,
        category,
        price,
        discountPrice,
        stock,
        size,
        colors,
      },
    },
    { new: true }
  );
  res.status(200).json({ msg: "Product updated successfully" });
});

exports.updateProductImagesCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });

  const files = req.files;
  let images = [];
  if (files.length > 0) {
    product.productImages.map(async (item) => {
      await removeImagefromCludinary(item.publicId);
    });
    for (img of files) {
      const results = await uploadImageToCloudinary(img.path);
      images.push({
        url: results.url,
        publicId: results.public_id,
      });
      fs.unlinkSync(img.path);
    }
  } else {
    return res
      .status(400)
      .json({ msg: "your must add images for your product" });
  }

  await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        productImages: images,
      },
    },
    { new: true }
  );
  res.status(200).json({ msg: "Product Images updated successfully" });
});

exports.deleteProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });

  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  product.productImages.map(async (item) => {
    await removeImagefromCludinary(item.publicId);
  });

  await Product.findByIdAndDelete(id);
  res.status(200).json({ msg: "Product deleted successfully" });
});
