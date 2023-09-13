const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

// router.get("/user", authenticate, userController.getUserData);
router.get("/user", authenticate, userController.getUserData);
module.exports = router;
