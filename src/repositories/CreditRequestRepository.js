import BaseRepository from "./BaseRepository.js";
import creditRequestModel from "../models/credit/CreditRequestModel.js";

class CreditRequestRepository extends BaseRepository {
  constructor() {
    super(creditRequestModel);
  }
}
export default new CreditRequestRepository();
