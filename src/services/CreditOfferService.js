import BaseService from "./BaseService.js";
import creditOfferRepository from "../database/repositories/CreditOfferRepository.js";

class CreditOfferService extends BaseService {
  constructor() {
    super(creditOfferRepository);
  }
}
export default new CreditOfferService();
