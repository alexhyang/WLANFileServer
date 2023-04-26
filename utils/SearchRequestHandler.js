const path = require("path");
const fs = require("fs");
const ip = require("ip");

class SearchRequestHandler {
  //  request queries:
  //    cat: category (required)
  //    key: folder (required)
  //    name: filename (optional)
  //    filter: file type filter (optional)
  //
  //  (cat, key, name) => fileExists ? return file url : return 404
  //  (cat, key) => folderExists ? return listOfFiles : return 404

  constructor(req, res) {
    this.res = res;
    this.query = req.query;
    this.relativePath = `${req.query.cat}/${req.query.key}`;
    this.searchRootDir = `./assets/${this.relativePath}`;
    this.urlRoot = `http://${ip.address()}:${process.env.PORT}/${
      this.relativePath
    }`;
    this.fileName = req.query.name;
    this.fileType = req.query.fileType;
  }

  sendResponse() {
    if (fs.existsSync(this.searchRootDir)) {
      if (this.queryContainsFileName()) {
        this.sendFileUrl();
      } else {
        this.sendListOfUrls();
      }
    } else {
      this.res.status(404).end();
    }
  }

  async sendFileUrl() {
    try {
      const files = await fs.promises.readdir(this.searchRootDir);
      files.forEach((file) => {
        if (path.parse(file).name == this.fileName) {
          this.res.json(this.generateFileUrl(file));
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  async sendListOfUrls() {
    try {
      const urls = [];
      const files = await fs.promises.readdir(this.searchRootDir);
      files.forEach((file) => {
        urls.push(this.generateFileUrl(file));
      });
      if (urls.length == 0) {
        this.res.status(404).end();
      } else {
        this.res.json(urls);
      }
    } catch (err) {
      console.log(err);
    }
  }

  queryContainsFileName() {
    return this.fileName != undefined && this.fileName != "";
  }

  generateFileUrl(filename) {
    return `${this.urlRoot}/${filename}`;
  }
}

var getFileType = function (file) {
  var images = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".tiff"];
  var videos = [".mp4", ".rmvb", ".mkv", ".wmv"];
  var texts = [".txt"];

  var ext = path.extname(file);
  if (images.includes(ext)) return "images";
  if (videos.includes(ext)) return "videos";
  if (texts.includes(ext)) return "stories";
};

var isSameTypeOfFile = function (file, type) {
  return getFileType(file) === type;
};

module.exports = SearchRequestHandler;
