const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.createOrderCtrl = asyncHandler(async (req, res) => {
  const { order, color, size } = req.body;
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  const productIds = order.map((item) => item.product);
  const uniqeProductIds = new Set(productIds);
  if (uniqeProductIds.size !== productIds.length)
    return res
      .status(400)
      .json({ msg: "Duplicate product found in the order" });

  const getProducts = await Promise.all(
    order.map(async (item) => {
      const productId = item.product;
      const productQuantity = item.quantity;
      const product = await Product.findById(productId);
      if (!product) throw new Error(`${productId} is not found`);
      if (product.stock - productQuantity < 0)
        throw new Error(`${product.productName} the stock is ${product.stock}`);
      return { productId, productQuantity };
    })
  );
  const products = await Promise.all(
    getProducts.map(async (item) => {
      const productId = item.productId;
      const productQuantity = item.productQuantity;
      const product = await Product.findById(productId);
      await Product.findByIdAndUpdate(
        productId,
        {
          $set: {
            stock: product.stock - productQuantity,
          },
        },
        { new: true }
      );
      const totalPrice = product.price * productQuantity;
      return totalPrice;
    })
  );
  const totalPrice = products.reduce((a, c) => a + c);

  const newOrder = await Order.create({
    order,
    totalPrice,
  });
  res.status(201).json(newOrder);
  user.purshasesHistory.push(newOrder._id);
  await user.save();
});

exports.getAllOrdersCtrl = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const orders = await Order.find().populate({
    path: "order.product",
    select: "-colors -size -stock",
  });
  res.status(200).json(orders);
});

exports.getOrderCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate({
    path: "order.product",
    select: "-colors -size -stock",
  });
  res.status(200).json(order);
});

exports.getSalesCtrl = asyncHandler(async (req, res) => {
  const firstMonth = new Date(new Date().getFullYear(), 0);

  const sales = await Order.aggregate([
    {
      $match: { createdAt: { $gte: firstMonth } },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  res.status(200).json(sales);
});

exports.getSalesOfDayCtrl = asyncHandler(async (req, res) => {
  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );

  const sales = await Order.aggregate([
    {
      $match: { createdAt: { $gte: startOfToday } },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);
  res.status(200).json(sales);
});
