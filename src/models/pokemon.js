const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
    dex: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: Array, required: true },
    weaknesses: { type: Object, required: true },
    active: { type: Boolean, default: true },
    evolution: { type: Array, required: true },
    sprite: { type: Object, required: true },
    expGrowth: { type: Number, required: true },
    moves: { type: Array, required: true },
})

const Pokemon = mongoose.model("Pokemon", PokemonSchema);
module.exports = Pokemon;
