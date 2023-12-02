const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  age: String,
  health: String,
  hunger: String,
  happiness: String,
  speed: String,
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
// _id: mongoose.Schema.Types.ObjectId,
