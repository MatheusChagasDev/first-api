const mongoose = require("mongoose");

const evolutionSchema = new mongoose.Schema({
    levelup: {
        type: Number,
        default: null
    },
    stone : {
        type: String,
        default: null
    },
    trade : {
        type: Boolean,
        default: false
    },
    happiness : {
        type: Boolean,
        default: false
    },
    other : {
        type: String,
        default: null
    },
    pokemon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pokemon"
    },
    evolves_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pokemon"
    }
})

const Evolution = mongoose.model("Evolution", evolutionSchema);
module.exports = Evolution;