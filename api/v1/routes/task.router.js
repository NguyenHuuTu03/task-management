const express = require("express");
const router = express.Router();
const controller = require("../controllers/task.controllers");

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.post("/create", controller.create);
router.patch("/edit/:id", controller.edit);
router.delete("/delete/:id", controller.delete);
router.post("/users/register", controller.register);
router.post("/users/login", controller.login);

module.exports = router;