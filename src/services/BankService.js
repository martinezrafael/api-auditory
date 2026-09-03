import BaseService from "./BaseService.js";
import bankRepository from "../repositories/BankRepository.js";

class BankService extends BaseService {
  constructor() {
    super(bankRepository);
  }
}
export default new BankService();
