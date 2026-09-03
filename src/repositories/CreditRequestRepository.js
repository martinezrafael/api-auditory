import BaseRepository from "./BaseRepository.js";
import creditRequestModel from "../models/credit/CreditRequest.js";

class CreditRequestRepository extends BaseRepository {
  constructor() {
    super(creditRequestModel);
  }
}
export default new CreditRequestRepository();
