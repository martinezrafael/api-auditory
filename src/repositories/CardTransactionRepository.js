import BaseRepository from "./BaseRepository.js";
import cardTransactionModel from "../models/acquiring/CardTransactionModel.js";

class CardTransactionRepository extends BaseRepository {
  constructor() {
    super(cardTransactionModel);
  }
}
export default new CardTransactionRepository();
