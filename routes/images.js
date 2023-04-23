const express = require("express");
const router = express.Router();
const path = require("path");
const sendJSONList = require("../utils/sendJSONList");

router.get("/", (req, res) => {
  sendJSONList(req.query.key, res, "images");
});

router.get("/:filename(*)", (req, res) => {
  res.sendFile(path.resolve(`assets/images/${req.params.filename}`));
});

module.exports = router;
