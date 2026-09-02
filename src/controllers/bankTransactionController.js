import bankTransactionService from "../services/BankTransactionService.js";

class BankTransactionController {
  static createBankTransaction = async (req, res) => {
    const bankTransactionSaved = await bankTransactionService.create(req.body);
    res.status(201).json({
      message: "Transação bancária cadastrada com sucesso.",
      bankTransaction: bankTransactionSaved,
    });
  };

  static getAllBankTransactions = async (req, res) => {
    const allBankTransactions = await bankTransactionService.getAll();
    res.status(200).json(allBankTransactions);
  };

  static getBankTransactionById = async (req, res) => {
    const bankTransaction = await bankTransactionService.getById(req.params.id);
    res.status(200).json(bankTransaction);
  };

  static updateBankTransaction = async (req, res) => {
    const bankTransaction = await bankTransactionService.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Dados da transação bancária atualizados com sucesso.",
      bankTransaction: bankTransaction,
    });
  };

  static deleteBankTransaction = async (req, res) => {
    await bankTransactionService.delete(req.params.id);
    res.status(200).json({
      message: "Transação bancária excluída com sucesso.",
    });
  };
}

export default BankTransactionController;
