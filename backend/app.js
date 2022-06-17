const express = require("express");
const DBConnect = require("./config/db");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
app.use(bodyParser.json());
const PORT = 3000 || process.env.PORT;

// Connecting mongoDB
DBConnect();

// Routes
app.use("/", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
