const express = require("express");
const router = express.Router();
const { adminPanel } = require("../controllers/owner");

router.get("/", (req, res) => {
  res.send("Its Working");
});

router.get("/adminPanel", adminPanel);

module.exports = router;
