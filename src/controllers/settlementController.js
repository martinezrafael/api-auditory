import BaseController from "./BaseController.js";
import settlementService from "../services/SettlementService.js";

class SettlementController extends BaseController {
  constructor() {
    super(settlementService, "Liquidação / Repasse");
  }
}
export default new SettlementController();
