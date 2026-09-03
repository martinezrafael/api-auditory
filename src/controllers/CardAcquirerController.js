import BaseController from "./BaseController.js";
import cardAcquirerService from "../services/CardAcquirerService.js";

class CardAcquirerController extends BaseController {
  constructor() {
    super(cardAcquirerService, "Adquirente de Cartão");
  }
}
export default new CardAcquirerController();
