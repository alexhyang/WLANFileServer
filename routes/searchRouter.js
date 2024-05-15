const express = require("express");
const router = express.Router();
const SearchRequestHandler = require("../utils/SearchRequestHandler");

router.get("/", (req, res) => {
  let handler = new SearchRequestHandler(req, res);
  handler.sendResponse();
});

module.exports = router;
