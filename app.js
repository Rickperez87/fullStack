const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
