import BaseController from "./BaseController.js";
import bankAccountService from "../services/BankAccountService.js";

class BankAccountController extends BaseController {
  constructor() {
    super(bankAccountService, "Conta Bancária");
  }
}
export default new BankAccountController();
