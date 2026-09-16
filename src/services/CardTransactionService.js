import BaseService from "./BaseService.js";
import cardTransactionRepository from "../repositories/CardTransactionRepository.js";

class CardTransactionService extends BaseService {
  constructor() {
    super(cardTransactionRepository);
  }
}
export default new CardTransactionService();
