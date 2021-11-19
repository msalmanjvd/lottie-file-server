var express = require("express");
var router = express.Router();
var fileEditor = require("../controllers/fileEditor");
const multer = require("multer");

/**
 * @multer configuration
 */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/data/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname); //Appending date name  and  extension
  },
});
const upload = multer({ storage: storage });

/**
 * @upload animation file
 */
router.post(
  "/animations/files",
  upload.single("animation"),
  function (req, res) {
    try {
      let filePath = req.file.path.toString();
      // remove public from path as its regsitered to be accessed directly
      filePath = filePath.replace("public/", "");
      res.json(filePath);
    } catch (error) {
      console.error("*Error Uploading File*", error);
      res.staus(500).json("error");
    }
  }
);

/**
 * @edit file route
 */
router.put("/animations/files", function (req, res, next) {
  fileEditor(req, res);
});

module.exports = router;
