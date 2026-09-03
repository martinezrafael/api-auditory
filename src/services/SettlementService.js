import BaseService from "./BaseService.js";
import settlementRepository from "../repositories/SettlementRepository.js";

class SettlementService extends BaseService {
  constructor() {
    super(settlementRepository, [
      { path: "company", select: "legalName documentNumber" },
      { path: "acquirer", select: "acquirerName merchantId" },
      { path: "bankAccount", select: "agencyNumber accountNumber" },
    ]);
  }
}
export default new SettlementService();
