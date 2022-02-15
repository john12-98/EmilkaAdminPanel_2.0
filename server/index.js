const express = require("express");
const mongoose = require("mongoose");
const GetProducts = require("./routes/productlist");
const OrderProducts = require("./routes/orderroutes");
//const FilterProducts = require("./routes/filterproducts");
//const CartRoutes = require("./routes/cartroutes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://yohannes:FirstMERN_Project@cluster0.3hcds.mongodb.net/MERN_db?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DB connection successful");
  })
  .catch(() => {
    console.log("DB connection failed");
  });
app.use("/getallproducts", GetProducts);
app.use("/order", OrderProducts);
//app.use("/filter", FilterProducts);
//app.use("/cart", CartRoutes);
app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
