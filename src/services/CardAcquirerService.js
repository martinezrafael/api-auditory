import BaseService from "./BaseService.js";
import cardAcquirerModel from "../models/acquiring/CardAcquirer.js";

class CardAcquirerService extends BaseService {
  constructor() {
    super(cardAcquirerModel);
  }
}

export default new CardAcquirerService();
