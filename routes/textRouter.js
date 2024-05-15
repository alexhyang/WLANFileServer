const express = require("express");
const router = express.Router();
const getFileContent = require("../utils/getFileContent");

router.get("/:filename(*)", (req, res) => {
  var content = getFileContent(req.params.filename);
  if (req.query.json == "true") {
    res.json(content);
  } else {
    res.send(content);
  }
});

module.exports = router;
