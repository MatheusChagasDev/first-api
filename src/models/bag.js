const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema({
   TMs_HMs: [{
        nome: String,
        quantidade: Number,
        descrição: String,
        preço: Number
    }],
    itens: [{
        nome: String,
        quantidade: Number,
        descrição: String,
        preço: Number
    }],
    medicine: [{
        nome: String,
        quantidade: Number,
        descrição: String,
        preço: Number
    }],
    berries: [{
        nome: String,
        quantidade: Number,
        descrição: String,
        preço: Number
    }],
    key_itens: [{
        nome: String,
        descrição: String
    }] 
},
)

const Bag = mongoose.model("Bag", bagSchema);
module.exports = Bag;