import BaseService from "./BaseService.js";
import creditRequestModel from "../models/credit/CreditRequest.js";

class CreditRequestService extends BaseService {
  constructor() {
    super(creditRequestModel);
  }
}

export default new CreditRequestService();
