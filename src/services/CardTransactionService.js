import BaseService from "./BaseService.js";
import cardTransactionRepository from "../repositories/CardTransactionRepository.js";

class CardTransactionService extends BaseService {
  constructor() {
    super(cardTransactionRepository, [
      { path: "company", select: "legalName documentNumber" },
      { path: "acquirer", select: "acquirerName merchantId" },
      { path: "settlement", select: "settlementDate settlementAmount status" },
    ]);
  }
}
export default new CardTransactionService();
