require("dotenv").config();
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect ot MongoDB", err));

//schema
const objSchema = mongoose.Schema({
  room: String,
  date: {
    type: Date,
    default: () => {
      let date = new Date();
      return date.toLocaleString();
    },
  },
});
//model
const Obj = mongoose.model("obj", objSchema);

router.get("/", async (req, res) => {
  const result = await Obj.find().select({ room: 1, date: 1 });
  res.json(result);
});

router.post("/", async (req, res) => {
  if (!req.body) {
    console.log(req.body, "did not execute");
    return;
  }
  const obj = new Obj({
    room: req.body.room,
  });

  obj.save();
  res.send(obj);
});

router.put("/:id", async (req, res) => {
  try {
    const room = await Obj.findById(req.params.id);
    if (!room) {
      res.status(404).send("The course with the given ID was not found");
    }
    room.replaceOne();
  } catch (err) {
    console.error("error", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const room = await Obj.findById(req.params.id);
    if (!room) {
      return;
    }
    room.remove();
    res.send(room);
  } catch (err) {
    console.error("error", err);
  }
});

module.exports = router;
