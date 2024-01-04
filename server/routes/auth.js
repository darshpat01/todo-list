const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../controllers/auth");

router.route("/register").post(auth.register);

router.route("/login").post(auth.login);

module.exports = router;
