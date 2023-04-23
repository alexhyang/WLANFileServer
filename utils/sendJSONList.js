const fs = require("fs");
const ip = require("ip");

var sendJSONList = function (key, res, folder) {
  var dir = `./assets/${folder}/${key}`;
  console.log(dir);
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    } else {
      const urls = [];
      files.forEach((file) => {
        urls.push(
          `http://${ip.address()}:${process.env.PORT}/${folder}/${key}/${file}`
        );
      });
      res.json(urls);
    }
  });
};

module.exports = sendJSONList;
