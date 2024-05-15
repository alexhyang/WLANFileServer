const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const searchRouter = require("./routes/searchRouter");
const imageRouter = require("./routes/images");
const videoRouter = require("./routes/videos");
const textRouter = require("./routes/textRouter");
const favRouter = require("./routes/favs");

dotenv.config();
const app = express();

app.use(cors());
app.use(logger("dev"));

app.use("/", indexRouter);
app.use("/api/search", searchRouter);
app.use("/api/images", imageRouter);
app.use("/api/videos", videoRouter);
app.use("/api/texts", textRouter);
app.use("/api/favs", favRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
