import BaseService from "./BaseService.js";
import bankModel from "../models/identity/Bank.js";

class BankService extends BaseService {
  constructor() {
    super(bankModel);
  }
}

export default new BankService();
