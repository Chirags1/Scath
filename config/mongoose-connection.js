const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://chirag:NsQXSoRy1nxRneAs@cluster0.awkgb.mongodb.net")
  .then(function () {
    console.log("Connected");
  })
  .catch(function (err) {
    console.log(err);
  });
module.exports = mongoose.connection;
