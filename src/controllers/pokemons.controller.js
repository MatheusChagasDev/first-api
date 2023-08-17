const pokemon = require("../models/pokemon");
const mongoose = require("mongoose");

class PokemonsController {
    async create(req, res) {
        try {
            const requiredFields = ["dex", "name", "type", "weaknesses", "moves" ];
            const missingFields = [];
    
            for (const field of requiredFields) {
                if (!req.body[field]) {
                    missingFields.push(field);
                }
            }
    
            if (missingFields.length > 0) {
                return res.status(422).json({ message: `Faltando preencher os campos: ${missingFields.join(', ')}` });
            }
    
            const newPokemon = await pokemon.create(req.body);
            res.json(newPokemon);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar o Pokémon.", error });
        }
    }

  async index(req, res) {
    const query = req.query;
    const pokemons = await pokemon.find(query);
    res.json(pokemons);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, gender, nature } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(402)
          .json({ message: "O id do pokémon não é compativel." });
      }
      if (!name || !gender || !nature) {
        return res
          .status(400)
          .json({ message: "Campos obrigatórios não fornecidos." });
      }
      const updatedPokemon = await pokemon.updateOne(
        { _id: id },
        { name, gender, nature }
      );
      if (updatedPokemon.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "Id não esta vinculado a base de dados" });
      }
      if (updatedPokemon.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: `O pokémon ${name} foi editado com sucesso!.` });
      }
      res.json(updatedPokemon);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao excluir o Pokémon.", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(402).json({ message: "O id do pokémon não existe." });
    }

    try {
      const deletePokemon = await pokemon.deleteOne({ _id: id });

      if (deletePokemon.deletedCount === 0) {
        return res.status(404).json({ message: "Pokémon não encontrado." });
      }

      res.json(deletePokemon);
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir o Pokémon." });
    }
  }

  async show(req, res) {
    try {
      const pokemons = await pokemon.findById(req.params.id);

      if (!pokemons) {
        return res.status(404).json({ message: "Pokémon não encontrado." });
      }

      res.json(pokemons);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar o Pokémon." });
    }
  }

  async updateStatus(req, res) {
    const { active } = req.body;
    let data;
    if (active !== undefined) {
      data = { active };
    } else {
      res.status(409).json({ error: "O campo active não foi enviado." });
    }
    const { id } = req.params;
    const updatedStatusPokemon = await pokemon.updateOne({ _id: id }, data);
    res.json(updatedStatusPokemon);
  }
}

module.exports = new PokemonsController();