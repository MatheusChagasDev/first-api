const pokemon = require("../models/pokemon");
const mongoose = require("mongoose");

class PokemonsController {
  async create(req, res) {
    try {
      const requiredFields = [
        "dex",
        "name",
        "type",
        "weaknesses",
        "active",
        "evolution",
        "sprite",
        "expGrowth",
        "moves",
        "baseExperience",
        "captureRate",
        "generation",
        "genderRatio",
        "eggGroups",
        "baseFriendship",
        "habitat",
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (req.body[field] === undefined || req.body[field] === null) {
          missingFields.push(field);
          console.log(field);
        }
      }

      if (missingFields.length > 0) {
        console.log(missingFields);
        return res.status(422).json({
          message: `Faltando preencher os campos: ${missingFields.join(", ")}`,
        });
      }

      const newPokemon = await pokemon.create(req.body);
      console.log(newPokemon);
      res.json(newPokemon);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar o Pokémon.", error });
    }
  }

  async index(req, res) {
    const validFields = ["dex", "name", "type", "generation"];
    const query = req.query;

    const invalidFields = Object.keys(query).filter(
      (field) => !validFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        error: `Campos de consulta inválidos: ${invalidFields.join(", ")}`,
      });
    }

    const pokemons = await pokemon.find(query);

    if (query.dex && pokemons.length === 0) {
      return res.status(404).json({
        error: `Nenhum Pokémon encontrado com o número da dex '${query.dex}'`,
      });
    }

    if (query.name && pokemons.length === 0) {
      return res.status(404).json({
        error: `Nenhum Pokémon encontrado com o nome '${query.name}'`,
      });
    }

    if (query.type && pokemons.length === 0) {
      return res.status(404).json({
        error: `Nenhum Pokémon encontrado com o tipo '${query.type}'`,
      });
    }

    if (query.generation && pokemons.length === 0) {
      return res.status(404).json({
        error: `Nenhum Pokémon da geração ${generation} foi encontrado '${query.generation}'`,
      });
    }
    res.json(pokemons);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        dex,
        name,
        type,
        weaknesses,
        evolution,
        sprite,
        expGrowth,
        moves,
      } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(402)
          .json({ message: "O id do pokémon não é compativel." });
      }
      const requiredFields = [
        "dex",
        "name",
        "type",
        "weaknesses",
        "active",
        "evolution",
        "sprite",
        "expGrowth",
        "moves",
        "baseExperience",
        "captureRate",
        "generation",
        "genderRatio",
        "eggGroups",
        "baseFriendship",
        "habitat",
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (req.body[field] === undefined || req.body[field] === null) {
          missingFields.push(field);
          console.log(field);
        }
      }

      if (missingFields.length > 0) {
        console.log(missingFields);
        return res.status(422).json({
          message: `Faltando preencher os campos: ${missingFields.join(", ")}`,
        });
      }
      const updatedPokemon = await pokemon.updateOne(
        { _id: id },
        {
          dex,
          name,
          type,
          weaknesses,
          evolution,
          sprite,
          expGrowth,
          moves,
          baseExperience,
          captureRatio,
          eggGroups,
          baseFriendship,
          habitat
        }
      );
      if (updatedPokemon.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "Id não esta vinculado a base de dados" });
      }
      if (updatedPokemon.modifiedCount === 0) {
        return res
          .status(200)
          .json({ message: `O pokémon ${name} não teve alteração.` });
      }
      if (updatedPokemon.modifiedCount !== 0) {
        return res
          .status(200)
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

      if (deletePokemon.deletedCount === 1) {
        return res
          .status(200)
          .json({ message: "Pokémon deletado com sucesso!." });
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(402)
        .json({ message: "O id do pokémon não é compativel." });
    }
    const updatedStatusPokemon = await pokemon.updateOne({ _id: id }, data);
    if (updatedStatusPokemon.modifiedCount !== 0) {
      return res
        .status(200)
        .json({ message: `O pokémon foi editado com sucesso!.` });
    }
    res.json(updatedStatusPokemon);
  }
}

module.exports = new PokemonsController();
