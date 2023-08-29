const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    song: String,
})

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;