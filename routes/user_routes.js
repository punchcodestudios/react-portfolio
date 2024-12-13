const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/auth");
const userController = require("../controllers/users");

router.get("/list", isAuthenticated, userController.getUserList);
router.get("/me", isAuthenticated, userController.getAuthenticatedUser);
router.get("/:id", isAuthenticated, userController.getUserById);

module.exports = router;
