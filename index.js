const express = require("express");
const databaseConfig = require("./config/database");
const Task = require("./models/tasks.model");

require("dotenv").config();

const app = express();
const port = process.env.PORT;


databaseConfig.connect();
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });
  console.log(tasks);
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Hãy truy cập trang: http://localhost:${port}`);
})