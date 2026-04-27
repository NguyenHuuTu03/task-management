const taskRoutes = require("./task.router");
const userRoutes = require("./user.router");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", taskRoutes);
  app.use(version + "/users", userRoutes);
};