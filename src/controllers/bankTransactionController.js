import NotFoundError from "../errors/NotFoundError.js";
import bankTransactionModel from "../models/identity/BankTransaction.js";

class BankTransactionController {
  static createBankTransaction = async (req, res, next) => {
    try {
      const bankTransactionCreated = new bankTransactionModel(req.body);
      const bankTransactionSaved = await bankTransactionCreated.save();

      res.status(201).json({
        message: "Transação bancária cadastrada com sucesso.",
        bankTransaction: bankTransactionSaved,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllBankTransactions = async (req, res, next) => {
    try {
      const allBankTransactions = await bankTransactionModel.find();
      res.status(200).json(allBankTransactions);
    } catch (error) {
      next(error);
    }
  };

  static getBankTransactionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const bankTransaction = await bankTransactionModel.findById(id);

      if (!bankTransaction) {
        return next(new NotFoundError("Transação bancária não localizada."));
      }

      res.status(200).json(bankTransaction);
    } catch (error) {
      next(error);
    }
  };

  static updateBankTransaction = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const bankTransaction = await bankTransactionModel.findByIdAndUpdate(id, {
        $set: payload,
      });

      if (!bankTransaction) {
        return next(new NotFoundError("Transação bancária não localizada."));
      }

      res.status(200).json({
        message: "Dados da transação bancária atualizados com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };

  static deleteBankTransaction = async (req, res, next) => {
    try {
      const { id } = req.params;

      const bankTransaction = await bankTransactionModel.findByIdAndDelete(id);

      if (!bankTransaction) {
        return next(new NotFoundError("Transação bancária não localizada."));
      }

      res.status(200).json({
        message: "Transação bancária excluída com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BankTransactionController;
