const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let product = await productModel.find();
  let success = req.flash("success");

  res.render("shop", { product, success });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  //let user = userModel.findOne({ user: req.user.email });
  let user = req.user;
  user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "added to cart");
  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  console.log(user.cart);
  res.render("cart", { user });
});

module.exports = router;
