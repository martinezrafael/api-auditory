import BaseController from "./BaseController.js";
import cardAcquirerService from "../services/CardAcquirerService.js";

class CardAcquirerController extends BaseController {
  constructor() {
    super(cardAcquirerService);
  }
}
export default new CardAcquirerController();
