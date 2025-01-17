const mongoose = require("mongoose");

ownerSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  gst: String,
  picture: String,
});
module.exports = mongoose.model("owner", ownerSchema);
