import BaseService from "./BaseService.js";
import creditOfferRepository from "../repositories/CreditOfferRepository.js";

class CreditOfferService extends BaseService {
  constructor() {
    super(creditOfferRepository, [
      {
        path: "creditRequest",
        select: "requestedAmount status requestDate",
        populate: { path: "company", select: "legalName documentNumber" },
      },
      { path: "bank", select: "bankCode legalName customerServicePhone" },
    ]);
  }
}
export default new CreditOfferService();
