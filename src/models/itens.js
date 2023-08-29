const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    number: Number,
    name: String,
    type: String,
    category: String,
    damage: Number,
    accuracy: Number,
    pp: Number,
    effect: String,
    description: String,
    isHM: Boolean,
    location: String,
    picture: String,
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;