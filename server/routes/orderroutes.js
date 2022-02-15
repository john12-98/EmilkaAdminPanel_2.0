const router = require("express").Router();
const OrderModel = require("../models/order");

router.get("/getorders", async (req, res) => {
  try {
    const result = await OrderModel.find();
    res.send(result);
  } catch (e) {
    console.log("error occured,,,...", e.message);
  }
});

router.put("/updatestatus", async (req, res) => {
  try {
    const result = await OrderModel.updateOne(
      { _id: req.body.ID },
      { status: req.body.stat }
    );
    console.log(result);
  } catch (e) {
    console.log("bnbnbnbnbn", e);
  }
});
module.exports = router;
