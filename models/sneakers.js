const mongoose = require("mongoose");

const SneakerSchema = new mongoose.Schema({
  nameSneaker: {
    type: String,
    unique: true,
  },
  size: {
    type: Number,
  },
  material: {
    type: String,
  },
  price: {
    type: String,
  },
  color: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Sneaker = mongoose.model("Sneaker", SneakerSchema);

module.exports = Sneaker;
