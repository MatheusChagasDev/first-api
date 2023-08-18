const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "none"],
    default: "male",
  },
  region:{ type: String, required: true },
  badge: { type: Array, required: true },
  pokemons: { type: Array, required: true }
});

const Trainer = mongoose.model("Treinador", TrainerSchema);
module.exports = Trainer;
