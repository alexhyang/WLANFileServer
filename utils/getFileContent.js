const fs = require("fs");
const path = require("path");

var getFileContent = function (filename) {
  const text = fs.readFileSync(
    path.resolve(`./assets/texts/${filename}`),
    "utf-8"
  );
  return text;
};

module.exports = getFileContent;
