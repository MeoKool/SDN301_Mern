const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const authWatches = require("./routes/watch");
const authBrand = require("./routes/brand");
const authComment = require("./routes/comment");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/sdn301m")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");

const staticDirPath =
  "D:\\FPTU_SE\\SE_Semester_7\\SDN301m\\SDN301_Mern\\BackEnd";
app.use(express.static(staticDirPath));

//Router API
app.use("/v1/auth", authRoutes);
app.use("/v1/watch", authWatches);
app.use("/v1/brand", authBrand);
app.use("/v1/feedback", authComment);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
