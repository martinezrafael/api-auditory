import BaseRepository from "./BaseRepository.js";
import creditRequestModel from "../models/CreditRequestModel.js";

class CreditRequestRepository extends BaseRepository {
  constructor() {
    super(creditRequestModel);
  }
}
export default new CreditRequestRepository();
