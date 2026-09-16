import BaseService from "./BaseService.js";
import cardAcquirerRepository from "../repositories/CardAcquirerRepository.js";

class CardAcquirerService extends BaseService {
  constructor() {
    super(cardAcquirerRepository);
  }
}
export default new CardAcquirerService();
