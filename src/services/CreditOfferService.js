import BaseService from "./BaseService.js";
import creditOfferRepository from "../repositories/CreditOfferRepository.js";

class CreditOfferService extends BaseService {
  constructor() {
    super(creditOfferRepository);
  }
}
export default new CreditOfferService();
