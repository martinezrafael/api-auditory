import BaseService from "./BaseService.js";
import creditRequestRepository from "../repositories/CreditRequestRepository.js";

class CreditRequestService extends BaseService {
  constructor() {
    super(creditRequestRepository, [
      { path: "company", select: "legalName documentNumber creditScore" },
      { path: "requestedBy", select: "fullName email role" },
    ]);
  }
}
export default new CreditRequestService();
