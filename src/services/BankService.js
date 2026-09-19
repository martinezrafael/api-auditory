import BaseService from "./BaseService.js";
import bankRepository from "../database/repositories/BankRepository.js";

class BankService extends BaseService {
  constructor() {
    super(bankRepository);
  }
}
export default new BankService();
