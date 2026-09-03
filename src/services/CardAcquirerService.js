import BaseService from "./BaseService.js";
import cardAcquirerRepository from "../repositories/CardAcquirerRepository.js";

class CardAcquirerService extends BaseService {
  constructor() {
    super(cardAcquirerRepository, [
      { path: "company", select: "legalName documentNumber" },
    ]);
  }
}
export default new CardAcquirerService();
