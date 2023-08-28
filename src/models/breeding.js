const mongoose = require("mongoose");

const breedingSchema = new mongoose.Schema({
    bug_egg_groups: [{
        nome: String,
        descrição: String
    }],
    dragon_egg_groups: [{
        nome: String,
        descrição: String
    }],
    field_egg_groups: [{
        nome: String,
        descrição: String
    }],
    flying_egg_groups: [{
        nome: String,
        descrição: String
    }],
    grass_egg_groups: [{
        nome: String,
        descrição: String
    }],
    human_like_egg_groups: [{
        nome: String,
        descrição: String
    }],
    mineral_egg_groups: [{
        nome: String,
        descrição: String
    }],
    monster_egg_groups: [{
        nome: String,
        descrição: String
    }],
    water_1_egg_groups: [{
        nome: String,
        descrição: String
    }],
    water_2_egg_groups: [{
        nome: String,
        descrição: String
    }],
    water_3_egg_groups: [{
        nome: String,
        descrição: String
    }],
    ditto_egg_groups: [{
        nome: String,
        descrição: String
    }],
    amorphous_egg_groups: [{
        nome: String,
        descrição: String
    }],
    undiscovered_egg_groups: [{
        nome: String,
        descrição: String
    }]
})
