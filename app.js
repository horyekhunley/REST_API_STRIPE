const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const ip = require("ip");
const app = express();

const userRoutes = require("./routes/user_routes");
const productRoutes = require("./routes/product_routes");
const cartRoutes = require("./routes/cart_routes");
const orderRoutes = require("./routes/order_routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`MongoDB connected...`);
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB. Error...", err);
    process.exit;
  });

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${ip.address()}:${port}`);
});
