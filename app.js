const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");
const adminMain = require("./routes/adminMain");
const morgan = require("morgan");

app.use(morgan("short"));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/", adminMain);
app.use("/api/data", router);

const port = process.env.PORT || 3002;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
