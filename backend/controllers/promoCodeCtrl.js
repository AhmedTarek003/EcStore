const asyncHandler = require("express-async-handler");
const PromoCode = require("../models/PromoCode");
const { disconnect } = require("mongoose");

exports.createPromoCodeCtrl = asyncHandler(async (req, res) => {
  const { promoCode, expireAt, discountPercent } = req.body;
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  if (!promoCode || !expireAt || !discountPercent)
    res.status(400).json({ msg: "please fill all fields" });
  const existPromoCode = await PromoCode.findOne({ promoCode });
  if (existPromoCode)
    return res.status(400).json({ msg: "promo code already exists" });
  const expireDate = new Date(expireAt);
  if (expireDate <= new Date())
    return res.status(400).json({ msg: "Expire Date must be in the future" });
  const newPromoCode = await PromoCode.create({
    promoCode,
    discountPercent,
    expireAt: expireDate,
  });
  res.status(200).json(newPromoCode);
});

exports.getAllPromoCodeCtrl = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const promoCodes = await PromoCode.find();
  res.status(200).json(promoCodes);
});

exports.getPromoCodeCtrl = asyncHandler(async (req, res) => {
  const { promoCode } = req.body;
  const promocode = await PromoCode.findOne({ promoCode });
  if (!promocode) return res.status(404).json({ msg: "invalid code" });
  res.status(200).json({
    promoCode: promocode.promoCode,
    discountPercent: promocode.discountPercent,
  });
});

exports.deletePromoCode = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const promoCode = await PromoCode.findById(id);
  if (!promoCode) return res.status(404).json({ msg: "Promo Code not found" });
  await PromoCode.findByIdAndDelete(id);
  res.status(200).json(promoCode);
});
