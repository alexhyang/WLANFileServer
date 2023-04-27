const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:filename(*)", (req, res) => {
  res.sendFile(path.resolve(`assets/favs/${req.params.filename}`));
});

module.exports = router;
