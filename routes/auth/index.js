const express = require("express");
const router = express.Router();
const { authUser } = require("../../middlewares/testAuth");

const { login, register, simpleLogout } = require("../../controllers/auth");

// user login & register routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", simpleLogout);

//testing route auth
router.get("/", authUser, (req, res) => {
  res.send("welcome");
});

module.exports = router;
