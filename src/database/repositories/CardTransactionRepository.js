import BaseRepository from "./BaseRepository.js";
import cardTransactionModel from "../models/CardTransactionModel.js";

class CardTransactionRepository extends BaseRepository {
  constructor() {
    super(cardTransactionModel);
  }
}
export default new CardTransactionRepository();
