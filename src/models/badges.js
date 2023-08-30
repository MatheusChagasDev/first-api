const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: String,
    picture: String,
    region: String,
    description: String,

})

const Badge = mongoose.model("Badge", badgeSchema);
module.exports = Badge;