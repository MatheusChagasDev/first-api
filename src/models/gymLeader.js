const mongoose = require("mongoose");

const gymLeaderSchema = new mongoose.Schema({
    name: String,
    picture: String,
    song: String,
    leaderSong: String,
    region: String,
    description: String,
    city: String,
    badge: String,
    pokémon: String,
    type: String,
    level: Number,
    moves: [String],
    sprite: String,

})

const GymLeader = mongoose.model("GymLeader", gymLeaderSchema);
module.exports = GymLeader;