import BaseController from "./BaseController.js";
import contractFeeService from "../services/ContractFeeService.js";

class ContractFeeController extends BaseController {
  constructor() {
    super(contractFeeService);
  }
}

export default new ContractFeeController();
