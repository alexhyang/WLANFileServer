const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const searchRouter = require("./routes/search");
const imageRouter = require("./routes/images");
const videoRouter = require("./routes/videos");
const textRouter = require("./routes/texts");
const favRouter = require("./routes/favs");

dotenv.config();
const app = express();

app.use(cors());
app.use(logger("dev"));

app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/images", imageRouter);
app.use("/videos", videoRouter);
app.use("/texts", textRouter);
app.use("/favs", favRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
