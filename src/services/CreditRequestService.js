import BaseService from "./BaseService.js";
import creditRequestRepository from "../repositories/CreditRequestRepository.js";

class CreditRequestService extends BaseService {
  constructor() {
    super(creditRequestRepository);
  }
}
export default new CreditRequestService();
