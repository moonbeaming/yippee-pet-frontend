const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  age: String,
  health: String,
  hunger: String,
  happiness: String,
  speed: String,
});

const pet = mongoose.model("Pet", petSchema);

module.exports = pet;
// _id: mongoose.Schema.Types.ObjectId,
