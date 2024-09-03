const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.stripCtrl = asyncHandler(async (req, res) => {
  const { products, discountPercent } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.productName,
        images: [product.productImages[0].url],
      },
      unit_amount: Math.round(product.discountPercent * 100),
    },
    quantity: product.quantity,
  }));
  const sessionParams = {
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  };
  if (discountPercent && discountPercent > 0) {
    const coupon = await stripe.coupons.create({
      percent_off: discountPercent,
      duration: "once",
    });
    sessionParams.discounts = [{ coupon: coupon.id }];
  }
  const session = await stripe.checkout.sessions.create(sessionParams);

  res.json({ id: session.id });
});
