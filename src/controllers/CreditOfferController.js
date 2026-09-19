import BaseController from "./BaseController.js";
import creditOfferService from "../services/CreditOfferService.js";

class CreditOfferController extends BaseController {
  constructor() {
    super(creditOfferService);
  }
}
export default new CreditOfferController();
