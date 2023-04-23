const express = require("express");
const router = express.Router();
const path = require("path");
const sendJSONList = require("../utils/sendJSONList");
const getFileContent = require("../utils/getFileContent");

router.get("/", (req, res) => {
  sendJSONList(req.query.key, res, "stories");
});

router.get("/:filename(*)", (req, res) => {
  var content = getFileContent(req.params.filename);
  if (req.query.json == "true") {
    res.json(content);
  } else {
    res.send(content);
  }
});

module.exports = router;
