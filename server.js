const dotenv = require("dotenv").config();
const express = require("express");

const connectToMongo = require("./utils/db");
const indexRoute = require("./routes/");
const urlRoute = require("./routes/short");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
connectToMongo();

app.use("/", indexRoute);
app.use("/api/url", urlRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
