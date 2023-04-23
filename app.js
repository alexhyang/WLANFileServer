const createError = require("http-errors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const imageRouter = require("./routes/images");
const videoRouter = require("./routes/videos");
const storyRouter = require("./routes/stories");

dotenv.config();
const app = express();

app.use(cors());
app.use(logger("dev"));

app.use("/", indexRouter);
app.use("/images", imageRouter);
app.use("/videos", videoRouter);
app.use("/stories", storyRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
