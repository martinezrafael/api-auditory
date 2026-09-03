import BaseController from "./BaseController.js";
import cardTransactionService from "../services/CardTransactionService.js";

class CardTransactionController extends BaseController {
  constructor() {
    super(cardTransactionService, "Venda no Cartão");
  }
}
export default new CardTransactionController();
