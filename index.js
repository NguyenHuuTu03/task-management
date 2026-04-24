const express = require("express");
const databaseConfig = require("./config/database");
const routesV1 = require("./api/v1/routes/index.router");
const bodyParser = require('body-parser');


require("dotenv").config();

const app = express();
const port = process.env.PORT;


databaseConfig.connect();

// parse application/json
app.use(bodyParser.json());

// router
routesV1(app);
// end router

app.listen(port, () => {
  console.log(`Hãy truy cập trang: http://localhost:${port}`);
})