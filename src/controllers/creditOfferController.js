import BaseController from "./BaseController.js";
import creditOfferService from "../services/CreditOfferService.js";

class CreditOfferController extends BaseController {
  constructor() {
    super(creditOfferService, "Proposta de Crédito");
  }
}
export default new CreditOfferController();
