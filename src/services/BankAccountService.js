import BaseService from "./BaseService.js";
import bankAccountModel from "../models/banking/BankAccount.js";

class BankAccountService extends BaseService {
  constructor() {
    super(bankAccountModel);
  }
}

export default new BankAccountService();
