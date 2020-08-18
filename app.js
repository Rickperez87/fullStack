const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");
const main = require("./routes/main");
const login = require("./routes/login");
const users = require("./routes/users");
const morgan = require("morgan");

app.use(morgan("short"));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/", login);
app.use("/api/main", main);
app.use("/api/data", router);

app.use("/api/users", users);

const port = process.env.PORT || 3002;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
