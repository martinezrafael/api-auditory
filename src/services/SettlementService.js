import BaseService from "./BaseService.js";
import settlementRepository from "../database/repositories/SettlementRepository.js";

class SettlementService extends BaseService {
  constructor() {
    super(settlementRepository);
  }
}
export default new SettlementService();
