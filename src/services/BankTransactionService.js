import BaseService from "./BaseService.js";
import bankTransactionRepository from "../repositories/BankTransactionRepository.js";

class BankTransactionService extends BaseService {
  constructor() {
    super(bankTransactionRepository, [
      { path: "company", select: "legalName documentNumber" },
      { path: "bankAccount", select: "agencyNumber accountNumber accountType" },
    ]);
  }
}
export default new BankTransactionService();
