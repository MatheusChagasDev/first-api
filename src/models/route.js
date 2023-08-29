const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    number: Number,
    name: String,
    region: String,
    description: String,
    song: String,
    pokemons: [{
        nome: String,
        descrição: String,
        tipo: String,
        categoria: String,
    }]
})
