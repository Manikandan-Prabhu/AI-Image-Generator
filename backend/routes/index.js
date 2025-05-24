var express = require("express");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var router = express.Router();
var GenerateImageController = require("../controller/generate-image.controller");
var authenticateJWT = require("../middleware/authenticate");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:4200?token=${token}`);
  }
);

router.post(
  "/generate-image",
  authenticateJWT,
  GenerateImageController.generateImage
);
router.get(
  "/image-status/:id",
  authenticateJWT,
  GenerateImageController.checkStatus
);

module.exports = router;
