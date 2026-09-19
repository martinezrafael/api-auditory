import BaseController from "./BaseController.js";
import creditRequestService from "../services/CreditRequestService.js";

class CreditRequestController extends BaseController {
  constructor() {
    super(creditRequestService);
  }
}
export default new CreditRequestController();
