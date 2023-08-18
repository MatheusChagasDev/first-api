const trainer = require("../models/trainer");
const mongoose = require("mongoose");

class TrainerController {
  async create(req, res) {
    try {
      const requiredFields = [
        "name",
        "gender",
        "region",
        "badge",
        "pokemons",
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

      const newTrainer = await trainer.create(req.body);
      res.json(newTrainer);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar o treinador.", error });
    }
  }

  async index(req, res) {
    const validFields = ['name', 'gender', 'region', 'badge', 'pokemons'];
    const query = req.query;

    const invalidFields = Object.keys(query).filter(field => !validFields.includes(field));

    if (invalidFields.length > 0) {
        return res.status(400).json({
            error: `Campos de consulta inválidos: ${invalidFields.join(', ')}`
        });
    }

    const trainers = await trainer.find(query);

    if (query.name && trainers.length === 0) {
        return res.status(404).json({
            error: `Nenhum treinador encontrado com o nome '${query.name}'`
        });
    }

    if (query.gender && trainers.length === 0) {
        return res.status(404).json({
            error: `Nenhum genero encontrado com o tipo '${query.type}'`
        });
    }

    if (query.region && trainers.length === 0) {
        return res.status(404).json({
            error: `Nenhum treinador encontrado na região '${query.type}'`
        });
    }

    if (query.badge && trainers.length === 0) {
        return res.status(404).json({
            error: `Nenhum treinador encontrado com o badge '${query.type}'`
        });
    }

    if (query.pokemons && trainers.length === 0) {
        return res.status(404).json({
            error: `Nenhum treinador com o pokemon '${query.type}'`
        });
    }
    res.json(trainers);
}

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        gender,
        region,
        badge,
        pokemons,
      } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(402)
          .json({ message: "O id do treinador não é compativel." });
      }
      const requiredFields = [
        "name",
        "gender",
        "region",
        "badge",
        "pokemons",
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
      const updatedTrainer = await trainer.updateOne(
        { _id: id },
        { name, gender, region, badge, pokemons }
      );
      if (updatedTrainer.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "Id não esta vinculado a base de dados" });
      }
      if (updatedTrainer.modifiedCount === 0) {
        return res
          .status(200)
          .json({ message: `O treinador ${name} não teve alteração.` });
      }
      if (updatedTrainer.modifiedCount !== 0) {
        return res
          .status(200)
          .json({ message: `O treinador ${name} foi editado com sucesso!.` });
      }
      res.json(updatedTrainer);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao excluir o treinador.", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(402).json({ message: "O id do treinador não existe." });
    }

    try {
      const deleteTreiner = await trainer.deleteOne({ _id: id });

      if (deleteTreiner.deletedCount === 0) {
        return res.status(404).json({ message: "Treinador não encontrado." });
      }

      if (deleteTreiner.deletedCount === 1) {
        return res.status(200).json({ message: "Treinador deletado com sucesso!." });
      }

      res.json(deleteTreiner);
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir o treinador." });
    }
  }

  async show(req, res) {
    try {
      const trainers = await trainer.findById(req.params.id);

      if (!trainers) {
        return res.status(404).json({ message: "Treinador não encontrado." });
      }

      res.json(trainers);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar o treinador." });
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
    const updatedStatusTrainer = await trainer.updateOne({ _id: id }, data);
    if (updatedStatusTrainer.modifiedCount !== 0) {
        return res
          .status(200)
          .json({ message: `O treinador foi editado com sucesso!.` });
      }
    res.json(updatedStatusTrainer);
  }
}

module.exports = new TrainerController();
