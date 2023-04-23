const path = require("path");
const fs = require("fs");
const ip = require("ip");

var getFileType = function (file) {
  var images = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".tiff"];
  var videos = [".mp4", ".rmvb", ".mkv", ".wmv"];
  var texts = [".txt"];

  var ext = path.extname(file);
  test = ext in images;
  if (images.includes(ext)) return "images";
  if (videos.includes(ext)) return "videos";
  if (texts.includes(ext)) return "stories";
};

var isSameTypeOfFile = function (file, folder) {
  return getFileType(file) === folder;
};

var sendJSONList = function (key, res, folder) {
  var dir = `./assets/${folder}/${key}`;
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    } else {
      const urls = [];
      files.forEach((file) => {
        if (isSameTypeOfFile(file, folder)) {
          urls.push(
            `http://${ip.address()}:${
              process.env.PORT
            }/${folder}/${key}/${file}`
          );
        }
      });
      res.json(urls);
    }
  });
};

module.exports = sendJSONList;
