const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });

const express = require("express");
const cors = require("cors");
const HST = require("./utils/httpStatusText");
const courseRouter = require("./routes/courseRoutes");

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("mongoDb connection successfully ✅");
  })
  .catch((err) => {
    console.log("mongoDb connection error ❌");
  });

app.use(cors());
app.use(express.json());

app.use("/", courseRouter);

//! this global middleware for not existing routes
app.all("*", (err, req, res, next) => {
  return res.status(404).json({ status: HST.ERROR, message: err.message });
});

//! global error handler "Middleware"
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    status: err.statusText || HST.ERROR,
    message: err.message,
    code: err.statusCode,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
