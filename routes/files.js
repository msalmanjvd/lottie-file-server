var express = require("express");
var router = express.Router();
var fileEditor = require("../controllers/fileEditor");

/* GET users listing. */
router.put("/animations/files", function (req, res, next) {
  fileEditor(req, res);
  // res.send("respond with a resource");
});

module.exports = router;
