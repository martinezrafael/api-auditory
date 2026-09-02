import BaseService from "./BaseService.js";
import bankTransactionModel from "../models/banking/BankTransaction.js";

class BankTransactionService extends BaseService {
  constructor() {
    super(bankTransactionModel);
  }
}

export default new BankTransactionService();
