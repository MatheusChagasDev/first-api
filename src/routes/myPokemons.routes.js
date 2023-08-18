const express = require('express');
const app = express.Router();;
const myPokemonsController = require('../controllers/myPokemons.controller');

app.post("/", myPokemonsController.create)
app.get("/", myPokemonsController.index)
app.get("/:id", myPokemonsController.show)
app.put("/:id", myPokemonsController.update)
app.delete("/:id", myPokemonsController.delete)
app.patch("/:id", myPokemonsController.updateStatus)

module.exports = app;