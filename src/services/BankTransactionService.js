import BaseService from "./BaseService.js";
import bankTransactionRepository from "../database/repositories/BankTransactionRepository.js";

class BankTransactionService extends BaseService {
  constructor() {
    super(bankTransactionRepository);
  }
}
export default new BankTransactionService();
