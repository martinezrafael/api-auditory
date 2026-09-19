import BaseController from "./BaseController.js";
import settlementService from "../services/SettlementService.js";

class SettlementController extends BaseController {
  constructor() {
    super(settlementService);
  }
}
export default new SettlementController();
