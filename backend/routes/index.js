var express = require("express");
var router = express.Router();
var GenerateImageController = require("../controller/generateImage.controller");

router.post("/generate-image", GenerateImageController.generateImage);
router.get("/image-status/:id", GenerateImageController.checkStatus);

module.exports = router;
