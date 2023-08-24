const express = require('express');
const app = express.Router();;
const movesController = require('../controllers/moves.controller');

app.post("/", movesController.create)
app.get("/", movesController.index)
app.get("/:id", movesController.show)
app.put("/:id", movesController.update)
app.delete("/:id", movesController.delete)
app.patch("/:id", movesController.updateStatus)

module.exports = app;