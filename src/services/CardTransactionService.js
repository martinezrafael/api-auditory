import BaseService from "./BaseService.js";
import cardTransactionModel from "../models/acquiring/CardTransaction.js";

class CardTransactionService extends BaseService {
  constructor() {
    super(cardTransactionModel);
  }
}

export default new CardTransactionService();
