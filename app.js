var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var fileRouter = require("./routes/files");

require("dotenv").config();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
/**
 * @multer configuraiton for file uplaod
 */

// test path
app.get("/", function (req, res) {
  res.json("Lottie File Server is Runing!");
});

// path for Uploading file
// app.post("/upload/animation", upload.single("animation"), function (req, res) {
//   try {
//     let filePath = req.file.path.toString();
//     console.log(filePath);
//     filePath = filePath.replace("public\\", "");
//     console.log(filePath);
//     res.json(filePath);
//   } catch (error) {
//     console.error("**********Error Uploading File**********", error);
//     res.staus(500).json("error");
//   }
// });

// router for file manipulation
app.use(fileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen((port = 4002), () => {
  console.log(`************Server is listening on ${port}**********`);
});
module.exports = app;
