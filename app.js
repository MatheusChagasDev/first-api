const express = require("express");
const app = express();
const pokemonsRoutes = require("./src/routes/pokemons.routes");

app.use(express.json());
app.use("/pokemons", pokemonsRoutes);

app.get("/", (req, res) => {
    res.json({
        version: "1.0.0",
        name: "Pokemon API",
    });
});

module.exports = app;