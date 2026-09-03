import BaseService from "./BaseService.js";
import bankAccountRepository from "../repositories/BankAccountRepository.js";

class BankAccountService extends BaseService {
  constructor() {
    super(bankAccountRepository, [
      { path: "company", select: "legalName documentNumber" },
      { path: "bank", select: "bankCode legalName" },
    ]);
  }
}
export default new BankAccountService();
