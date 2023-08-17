const express = require('express');
const app = express.Router();
const PokemonsController = require("../controllers/pokemons.controller");
const pokemonsController = require('../controllers/pokemons.controller');

app.post("/", pokemonsController.create)
app.get("/", pokemonsController.index)
app.get("/:id", pokemonsController.show)
app.put("/:id", pokemonsController.update)
app.delete("/:id", pokemonsController.delete)
app.patch("/:id", pokemonsController.updateStatus)

module.exports = app;