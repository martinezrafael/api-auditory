import BaseService from "./BaseService.js";
import creditOfferModel from "../models/credit/CreditOffer.js";

class CreditOfferService extends BaseService {
  constructor() {
    super(creditOfferModel);
  }
}

export default new CreditOfferService();
