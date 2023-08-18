const express = require('express');
const app = express.Router();;
const trainerController = require('../controllers/trainer.controller');

app.post("/",trainerController.create)
app.get("/",trainerController.index)
app.get("/:id",trainerController.show)
app.put("/:id",trainerController.update)
app.delete("/:id",trainerController.delete)
app.patch("/:id",trainerController.updateStatus)

module.exports = app;