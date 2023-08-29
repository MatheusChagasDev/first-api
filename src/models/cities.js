const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name: String,
    region: String,
    description: String,
    picture: String,
    gym: String,
    gym_leader: String,
    badge: String,
    badge_picture: String,
    badge_description: String,
    song: String,
})

const City = mongoose.model("City", citySchema);
module.exports = City;