const express = require("express");
const path = require("path");
const app = express();
const router = require("./router");
const cors = require("cors");
const adminMain = require("./routes/adminMain");
const helmet = require("helmet");
const compression = require("compression");

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", adminMain);
app.use("/api/data", router);

const port = process.env.PORT || 3002;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
