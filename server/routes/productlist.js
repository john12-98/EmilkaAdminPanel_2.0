const router = require("express").Router();
const AllProductsModel = require("../models/allproducts");
// router.get("/getallproducts", (req, res) => {
//   console.log("requested");
// });

router.get("", async (req, res) => {
  try {
    console.log("inside roter........");
    const products = await AllProductsModel.find({}).sort({
      price: 1,
      garmentName: "desc",
    });
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
});
router.get("/item", async (req, res) => {
  //for returning a single item using ID
  try {
    console.log("inside.........", req.query.id);
    const item = await AllProductsModel.findById(req.query.id);
    console.log("vvvvbbbbb", item);
    res.send(item);
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/update", async (req, res) => {
  try {
    let r = await AllProductsModel.updateOne(
      { _id: req.body.ID },
      {
        $set: {
          description: req.body.desc,
          garmentName: req.body.garName,
          gender: req.body.gen,
          price: req.body.p,
          size: req.body.s,
        },
      }
    );
    res.send(r);
  } catch (e) {
    console.log(e);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    let a = await AllProductsModel.deleteOne({ _id: req.query.id });
    console.log("333333333333", a);
    res.json(a);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
