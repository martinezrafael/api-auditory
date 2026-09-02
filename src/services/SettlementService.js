import BaseService from "./BaseService.js";
import SettlementModel from "../models/acquiring/Settlement.js";

class SettlementService extends BaseService {
  constructor() {
    super(SettlementModel);
  }
}

export default new SettlementService();
