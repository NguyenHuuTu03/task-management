const taskRoutes = require("./task.router");
const userRoutes = require("./user.router");
const authMiddleware = require("../middleware/auth.middleware");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", authMiddleware.requireAuth, taskRoutes);
  app.use(version + "/users", userRoutes);
};