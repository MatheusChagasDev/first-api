const mypokemons = require("../models/myPokemons");
const mongoose = require("mongoose");

class myPokemonsController {
  async create(req, res) {
    try {
      const requiredFields = [
        "pokemon",
        "height",
        "weight",
        "abilities",
        "gender",
        "evolution",
        "description",
        "stats",
        "shiny",
        "level",
        "exp",
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (!req.body[field]) {
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

      const newPokemon = await mypokemons.create(req.body);
      res.json(newPokemon);
      console.log(newPokemon);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar o pokémon.", error });
    }
  }

  async index(req, res) {
    const validFields = [
      "pokemon",
      "height",
      "weight",
      "abilities",
      "gender",
      "evolution",
      "description",
      "stats",
      "shiny",
      "level",
      "exp",
    ];
    const query = req.query;

    const invalidFields = Object.keys(query).filter(
      (field) => !validFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        error: `Campos de consulta inválidos: ${invalidFields.join(", ")}`,
      });
    }

    const MyPokemon = await mypokemons.find(query);

    if (query.pokemon && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon encontrado com o nome '${query.pokemon}'`,
      });
    }

    if (query.height && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhuma altura encontrada '${query.height}'`,
      });
    }

    if (query.weight && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `O peso não corresponde a nenhum pokémon '${query.weight}'`,
      });
    }

    if (query.abilities && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhuma habilidade encontrada '${query.abilities}'`,
      });
    }

    if (query.gender && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon com o genero '${query.gender}'`,
      });
    }
    if (query.evolution && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon com a evolução encontrado '${query.evolution}'`,
      });
    }
    if (query.description && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon com a descrição encontrado '${query.description}'`,
      });
    }
    if (query.stats && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon com o status '${query.stats}'`,
      });
    }
    if (query.shiny && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon brilhante '${query.shiny}'`,
      });
    }
    if (query.level && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon com o level '${query.level}'`,
      });
    }
    if (query.exp && MyPokemon.length === 0) {
      return res.status(404).json({
        error: `Nenhum pokémon com o exp '${query.exp}'`,
      });
    }
    res.json(MyPokemon);
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        pokemon,
        height,
        weight,
        abilities,
        gender,
        evolution,
        description,
        stats,
        shiny,
        level,
        exp,
      } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(402)
          .json({ message: "O id do pokémon não é compativel." });
      }
      const requiredFields = [
        "pokemon",
        "height",
        "weight",
        "abilities",
        "gender",
        "evolution",
        "description",
        "stats",
        "shiny",
        "level",
        "exp",
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (!req.body[field]) {
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
      const updatedMyPokemon = await mypokemons.updateOne(
        { _id: id },
        {
          pokemon,
          height,
          weight,
          abilities,
          gender,
          evolution,
          description,
          stats,
          shiny,
          level,
          exp,
        }
      );
      if (updatedMyPokemon.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "Id não esta vinculado a base de dados" });
      }
      if (updatedMyPokemon.modifiedCount === 0) {
        return res
          .status(200)
          .json({ message: `O pokémon ${pokemon} não teve alteração.` });
      }
      if (updatedMyPokemon.modifiedCount !== 0) {
        return res
          .status(200)
          .json({ message: `O pokémon ${pokemon} foi editado com sucesso!.` });
      }
      res.json(updatedMyPokemon);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao excluir o pokémon.", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(402).json({ message: "O id do pokémon não existe." });
    }

    try {
      const deleteMyPokemon = await mypokemons.deleteOne({ _id: id });

      if (deleteMyPokemon.deletedCount === 0) {
        return res.status(404).json({ message: "Pokémon não encontrado." });
      }

      if (deleteMyPokemon.deletedCount === 1) {
        return res
          .status(200)
          .json({ message: "Pokémon deletado com sucesso!." });
      }

      res.json(deleteMyPokemon);
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir o pokémon." });
    }
  }

  async show(req, res) {
    try {
      const MyPokemon = await mypokemons.findById(req.params.id);

      if (!MyPokemon) {
        return res.status(404).json({ message: "Pokémon não encontrado." });
      }

      res.json(MyPokemon);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar o pokémon." });
    }
  }

  async updateStatus(req, res) {
    const { gender } = req.body;
    let data;
    if (gender !== undefined) {
      data = { gender };
    } else {
      res.status(409).json({ error: "O campo gender não foi enviado." });
    }
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(402)
        .json({ message: "O id do pokémon não é compativel." });
    }
    const updatedStatusMyPokemon = await mypokemons.updateOne(
      { _id: id },
      data
    );
    if (updatedStatusMyPokemon.modifiedCount !== 0) {
      return res
        .status(200)
        .json({ message: `O pokémon foi editado com sucesso!.` });
    }
    res.json(updatedStatusMyPokemon);
  }
}

module.exports = new myPokemonsController();
