const moves = require("../models/moves");
const mongoose = require("mongoose");

class movesController {
    async create(req, res) {
      try {
        const requiredFields = [
          "number",
          "name",
          "type",
          "category",
          "damage",
          "accuracy",
          "pp",
          "effect",
          "description",
          "isHM",
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
  
        const newMovement = await moves.create(req.body);
        res.json(newMovement);
        console.log(newMovement);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erro ao criar o pokémon.", error });
      }
    }
  
    async index(req, res) {
      const validFields = [
        "number",
        "name",
        "type",
        "category",
        "damage",
        "accuracy",
        "pp",
        "effect",
        "description",
        "isHM",
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
  
      const Movement = await moves.find(query);
  
      if (query.number && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento encontrado com o nome '${query.number}'`,
        });
      }
  
      if (query.name && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento com o nome encontrado '${query.name}'`,
        });
      }
  
      if (query.type && Movement.length === 0) {
        return res.status(404).json({
          error: `O tipo do movimento não foi encontrado '${query.type}'`,
        });
      }
  
      if (query.category && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento foi encontrado com essa categoria '${query.category}'`,
        });
      }
  
      if (query.damage && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento com o dano foi encontrado '${query.damage}'`,
        });
      }
      if (query.accuracy && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento encontrado com essa precisão'${query.accuracy}'`,
        });
      }
      if (query.pp && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento foi encontrado com ${pp} cargas '${query.pp}'`,
        });
      }
      if (query.effect && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento com a % do efeito $ '${query.effect}'`,
        });
      }
      if (query.description && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento com essa descrição '${query.description}'`,
        });
      }
      if (query.isHM && Movement.length === 0) {
        return res.status(404).json({
          error: `Nenhum movimento HM encontrado '${query.isHM}'`,
        });
      }
      res.json(Movement);
    }
  
    async update(req, res) {
      try {
        const { id } = req.params;
        const {
          number,
          name,
          type,
          category,
          damage,
          accuracy,
          pp,
          effect,
          description,
          isHM,
        } = req.body;
  
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res
            .status(402)
            .json({ message: "O id do movimento não é compativel." });
        }
        const requiredFields = [
          "number",
          "name",
          "type",
          "category",
          "damage",
          "accuracy",
          "pp",
          "effect",
          "description",
          "isHM",
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
        const updatedMovement = await moves.updateOne(
          { _id: id },
          {
            number,
            name,
            type,
            category,
            damage,
            accuracy,
            pp,
            effect,
            description,
            isHM,
          }
        );
        if (updatedMovement.matchedCount === 0) {
          return res
            .status(404)
            .json({ message: "Movimento não esta vinculado a base de dados" });
        }
        if (updatedMovement.modifiedCount === 0) {
          return res
            .status(200)
            .json({ message: `O movimento ${name} não teve alteração.` });
        }
        if (updatedMovement.modifiedCount !== 0) {
          return res
            .status(200)
            .json({ message: `O movimento ${name} foi editado com sucesso!.` });
        }
        res.json(updatedMovement);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erro ao excluir o movimento.", error });
      }
    }
  
    async delete(req, res) {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(402).json({ message: "O id do movimento não existe." });
      }
  
      try {
        const deleteMovement = await moves.deleteOne({ _id: id });
  
        if (deleteMovement.deletedCount === 0) {
          return res.status(404).json({ message: "Movimento não encontrado." });
        }
  
        if (deleteMovement.deletedCount === 1) {
          return res
            .status(200)
            .json({ message: "Movimento deletado com sucesso!." });
        }
  
        res.json(deleteMovement);
      } catch (error) {
        res.status(500).json({ message: "Erro ao excluir o movimento." });
      }
    }
  
    async show(req, res) {
      try {
        const Movement = await moves.findById(req.params.id);
  
        if (!Movement) {
          return res.status(404).json({ message: "Movimento não encontrado." });
        }
  
        res.json(Movement);
      } catch (error) {
        res.status(500).json({ message: "Erro ao buscar o movimento." });
      }
    }
  
    async updateStatus(req, res) {
      const { type } = req.body;
      let data;
      if (type !== undefined) {
        data = { type };
      } else {
        res.status(409).json({ error: "O campo type não foi enviado." });
      }
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(402)
          .json({ message: "O id do movimento não é compativel." });
      }
      const updatedStatusMovement = await moves.updateOne(
        { _id: id },
        data
      );
      if (updatedStatusMovement.modifiedCount !== 0) {
        return res
          .status(200)
          .json({ message: `O movimento foi editado com sucesso!.` });
      }
      res.json(updatedStatusMovement);
    }
  }
  
  module.exports = new movesController();
  