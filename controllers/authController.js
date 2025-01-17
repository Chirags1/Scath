const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  let { fullName, email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (user) {
    return res.status(401).send("You already have account, Please Login");
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      if (err) {
        return res.send(err.message);
      } else {
        let userCreated = await userModel.create({
          fullName,
          email,
          password: hash,
        });
        let token = jwt.sign(
          { email, id: userCreated._id },
          process.env.JWT_KEY
        );
        res.cookie("token", token);
        res.send("user created");
        console.log(userCreated, token);
      }
    });
  });
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let loggedUser = await userModel.findOne({ email: email });
  if (!loggedUser) {
    return res.status(401).send("You have not Created Account ");
  }
  bcrypt.compare(password, loggedUser.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email, id: loggedUser._id }, process.env.JWT_KEY);
      res.cookie("token", token);
      res.send("you can login");
    } else {
      return res.status(401).send("Email or password Incorrect ");
    }
  });
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
