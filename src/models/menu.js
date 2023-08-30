const mongoose = require("mongoose");

const itemSchema = require("./item");

const menuSchema = new mongoose.Schema({
    pokédex: {
        type: String,
        default: null
    },
    pokémon: {
        type: String,
        default: null
    },
    bag: [itemSchema],
    trainerCard: {
        type: String,
        default: null
    },
    save: {
        type: String,
        default: null
    },
    options: {
        type: String,
        default: null
    },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;