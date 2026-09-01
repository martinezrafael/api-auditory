import NotFoundError from "../errors/NotFoundError.js";
import cardAcquirerModel from "../models/acquiring/CardAcquirer.js";

class CardAcquirerController {
  static createCardAcquirer = async (req, res, next) => {
    try {
      const cardAcquirerCreated = new cardAcquirerModel(req.body);
      const cardAcquirerSaved = await cardAcquirerCreated.save();

      res.status(201).json({
        message: "Adquirente criado com sucesso.",
        cardAcquirer: cardAcquirerSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllCardAcquirers = async (req, res, next) => {
    try {
      const allCardAcquirers = await cardAcquirerModel.find();
      res.status(200).json(allCardAcquirers);
    } catch (error) {
      next(error);
    }
  };

  static getCardAcquirerById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cardAcquirer = await cardAcquirerModel.findById(id);

      if (!cardAcquirer) {
        return next(new NotFoundError("Adquirente não localizado."));
      }

      res.status(200).json(cardAcquirer);
    } catch (error) {
      next(error);
    }
  };

  static updateCardAcquirer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const cardAcquirer = await cardAcquirerModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!cardAcquirer) {
        return next(new NotFoundError("Adquirente não localizado."));
      }

      res.status(200).json({
        message: "Dados do adquirente atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteCardAcquirer = async (req, res, next) => {
    try {
      const { id } = req.params;

      const cardAcquirer = await cardAcquirerModel.findByIdAndDelete(id);

      if (!cardAcquirer) {
        return next(new NotFoundError("Adquirente não localizado."));
      }

      res.status(200).json({
        message: "Adquirente deletado com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CardAcquirerController;
