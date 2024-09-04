const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectMongoDB = require("./db/connectMongoDB");
const globelErrorHandler = require("./middlewares/golobelErrorHandler");
const cors = require("cors");

const app = express();

connectMongoDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    // methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/reviews", require("./routes/reviewRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/promocode", require("./routes/promoCodeRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/stripe", require("./routes/stripeRoute"));

app.use("*", () => {
  throw new Error("Invalid Route");
});

app.use(globelErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Runing at ${PORT}`);
});
