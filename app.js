const express = require("express");
const app = express();
const pokemonsRoutes = require("./src/routes/pokemons.routes");
const trainerRoutes = require("./src/routes/trainer.routes");
const myPokemonsRoutes = require("./src/routes/myPokemons.routes");
const movesRoutes = require("./src/routes/moves.routes");

app.use(express.json());
app.use("/pokemons", pokemonsRoutes);
app.use("/trainer", trainerRoutes);
app.use("/my-pokemons", myPokemonsRoutes);
app.use("/moves", movesRoutes);

app.get("/", (req, res) => {
    res.json({
        version: "1.0.0",
        name: "Pokemon API",
    });
});

module.exports = app;