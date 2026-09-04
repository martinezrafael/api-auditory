import BaseController from "./BaseController.js";
import contractFeeService from "../services/ContractFeeService.js";

class ContractFeeController extends BaseController {
  constructor() {
    super(contractFeeService, "Taxa contratual");
  }
}

export default new ContractFeeController();
