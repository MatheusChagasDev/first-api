const mongoose = require("mongoose");

const movesSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    damage: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    pp: { type: Number, required: true },
    effect: { type: Number, required: true },
    description: { type: String, required: true },
    isHM: { type: Boolean, required: true },
},
{
    validateBeforeSave: false, // Disable pre-save validation
  }
  )

const Moves = mongoose.model("Movimentos", movesSchema);
module.exports = Moves;