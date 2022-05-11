const express = require("express");
const router = express.Router();

const { login, register, simpleLogout } = require("../../controllers/auth");

// user login & register routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", simpleLogout);

module.exports = router;
