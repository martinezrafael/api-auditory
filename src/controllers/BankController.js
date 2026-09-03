import BaseController from "./BaseController.js";
import bankService from "../services/BankService.js";

class BankController extends BaseController {
  constructor() {
    super(bankService, "Instituição Bancária");
  }
}
export default new BankController();
