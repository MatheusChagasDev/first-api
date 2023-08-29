const mongoose = require("mongoose");

const effortValueSchema = new mongoose.Schema({
    hp: Number,
    attack: Number,
    defense: Number,
    special_attack: Number,
    special_defense: Number,
    speed: Number,
})

const EffortValue = mongoose.model("EffortValue", effortValueSchema);
module.exports = EffortValue;