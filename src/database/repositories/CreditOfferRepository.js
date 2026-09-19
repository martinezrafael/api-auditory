import BaseRepository from "./BaseRepository.js";
import creditOfferModel from "../models/CreditOfferModel.js";

class CreditOfferRepository extends BaseRepository {
  constructor() {
    super(creditOfferModel);
  }
}
export default new CreditOfferRepository();
