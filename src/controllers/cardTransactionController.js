import CardTransactionService from "../services/CardTransactionService.js";

class CardTransactionController {
  static createCardTransaction = async (req, res) => {
    const cardTransaction = await CardTransactionService.create(req.body);
    res.status(201).json({
      message: "Transação criada com sucesso.",
      cardTransaction: cardTransaction,
    });
  };

  static getAllCardTransactions = async (req, res) => {
    const allCardTransactions = await CardTransactionService.getAll();
    res.status(200).json(allCardTransactions);
  };

  static getCardTransactionById = async (req, res) => {
    const cardTransaction = await CardTransactionService.getById(req.params.id);
    res.status(200).json(cardTransaction);
  };

  static updateCardTransaction = async (req, res) => {
    const cardTransaction = await CardTransactionService.update(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: "Dados da transação atualizados com sucesso.",
      cardTransaction: cardTransaction,
    });
  };

  static deleteCardTransaction = async (req, res) => {
    await CardTransactionService.delete(req.params.id);
    res.status(200).json("Dados da transação deletados com sucesso.");
  };
}

export default CardTransactionController;
