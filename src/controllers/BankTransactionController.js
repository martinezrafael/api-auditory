import BaseController from "./BaseController.js";
import bankTransactionService from "../services/BankTransactionService.js";

class BankTransactionController extends BaseController {
  constructor() {
    super(bankTransactionService, "Transação Bancária");
  }
}
export default new BankTransactionController();
