const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controllers");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/password/forgot", controller.forgot);
router.post("/password/otp", controller.otp);
router.post("/password/reset", controller.reset);
router.get("/detail", authMiddleware.requireAuth, controller.detail);
router.get("/list", controller.list);
module.exports = router;