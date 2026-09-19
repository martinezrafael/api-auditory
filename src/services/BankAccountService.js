import BaseService from "./BaseService.js";
import bankAccountRepository from "../database/repositories/BankAccountRepository.js";

class BankAccountService extends BaseService {
  constructor() {
    super(bankAccountRepository);
  }
}
export default new BankAccountService();
