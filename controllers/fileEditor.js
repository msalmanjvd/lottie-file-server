var fs = require("fs");
/**
 *
 * @param {*} req contains colors and indexes for chaging the file
 * @param {*} res
 * @param {*} next
 */
module.exports = function editFile(req, res, next) {
  try {
    let { color, key, path } = req.body;
    color = color.slice(1);

    //read file from path sent from request
    var fileData = fs.readFileSync("public/" + path, "utf8");

    //parse data for minuploation
    fileData = JSON.parse(fileData);
    let keys = key.split(",").map(Number);

    // convert color into RGB and divide by 255 as per lottie requirment
    let rgbColors = color.convertToRGB();
    rgbColors = rgbColors.map((c) => c / 255);

    // update color at given index
    fileData.layers[keys[0]].shapes[keys[1]].it[keys[2]].c.k = rgbColors;
    fileData = JSON.stringify(fileData); //convert it back to json

    // write the new content into same file
    fs.writeFile("public/" + path, fileData, "utf8", function (err, data) {
      if (err) {
        console.log("Error Occured!", err);
        res.status(400).json("Error!");
      }
    });

    res.json("File edited succesffuly!");
  } catch (error) {
    console.log("Error Occured!", error);
    res.status(400).json("Error");
  }
};

/***
 * String method for color conversion
 */
String.prototype.convertToRGB = function () {
  if (this.length != 6) {
    // expects 6 digits
    throw "Only six-digit hex colors are allowed.";
  }

  var aRgbHex = this.match(/.{1,2}/g);
  var aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
  return aRgb;
};
