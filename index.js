const express = require("express");
const databaseConfig = require("./config/database");
const routesV1 = require("./api/v1/routes/index.router");



require("dotenv").config();

const app = express();
const port = process.env.PORT;


databaseConfig.connect();

// router
routesV1(app);
// end router

app.listen(port, () => {
  console.log(`Hãy truy cập trang: http://localhost:${port}`);
})