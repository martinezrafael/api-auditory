import NotFoundError from "../errors/NotFoundError.js";
import cardTransactionModel from "../models/acquiring/CardTransaction.js";

class CardTransactionController {
  static createCardTransaction = async (req, res, next) => {
    try {
      const cardTransactionCreated = new cardTransactionModel(req.body);
      const cardTransactionSaved = await cardTransactionCreated.save();

      res.status(201).json({
        message: "Transação criada com sucesso.",
        cardTransaction: cardTransactionSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllCardTransactions = async (req, res, next) => {
    try {
      const allCardTransactions = await cardTransactionModel.find();
      res.status(200).json(allCardTransactions);
    } catch (error) {
      next(error);
    }
  };

  static getCardTransactionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cardTransaction = await cardTransactionModel.findById(id);

      if (!cardTransaction) {
        return next(new NotFoundError("Transação não localizada."));
      }

      res.status(200).json(cardTransaction);
    } catch (error) {
      next(error);
    }
  };

  static updateCardTransaction = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const cardTransaction = await cardTransactionModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!cardTransaction) {
        return next(new NotFoundError("Transação não localizada."));
      }

      res.status(200).json({
        message: "Dados da transação atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteCardTransaction = async (req, res, next) => {
    try {
      const { id } = req.params;

      const cardTransaction = await cardTransactionModel.findByIdAndDelete(id);

      if (!cardTransaction) {
        return next(new NotFoundError("Transação não localizada."));
      }

      res.status(200).json({
        message: "Transação deletada com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CardTransactionController;
