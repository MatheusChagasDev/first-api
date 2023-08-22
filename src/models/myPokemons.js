const mongoose = require("mongoose");

const MyPokemonsSchema = new mongoose.Schema({
  pokemon: { type: Object, required: true },
  height:{ type: Number, required: true },
  weight:{ type: Number, required: true },
  abilities: { type: Array, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "none"],
  },
  evolution: {
    evolvesFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
    evolvesTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
  },
  description: { type: String },
  stats: { type: Object, required: true },
  shiny: { type: Boolean, default: false }, 
  level: { type: Number, default: false },
  exp: { type: Number, required: true }
});

const MyPokemons = mongoose.model("Meus pokémons", MyPokemonsSchema);
module.exports = MyPokemons;
