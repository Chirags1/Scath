const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
  res.send("Its Working");
});

router.post("/create", upload.single("productImage"), function (req, res) {
  try {
    let {
      productName,
      productPrice,
      productDiscountPrice,
      backgroundColor,
      panelColor,
      textColor,
    } = req.body;
    let product = productModel.create({
      image: req.file.buffer,
      name: productName,
      price: productPrice,
      discount: productDiscountPrice,
      bgColor: backgroundColor,
      panelColor: panelColor,
      textColor: textColor,
    });
    req.flash("success", "Product Added Successfully");
    res.redirect("/owners/adminPanel");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
