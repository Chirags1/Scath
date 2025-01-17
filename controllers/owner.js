module.exports.adminPanel = (req, res) => {
  let success = req.flash("success");
  res.render("create-product", { success });
};
