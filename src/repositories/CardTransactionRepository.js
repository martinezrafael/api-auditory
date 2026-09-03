import BaseRepository from "./BaseRepository.js";
import cardTransactionModel from "../models/acquiring/CardTransaction.js";

class CardTransactionRepository extends BaseRepository {
  constructor() {
    super(cardTransactionModel);
  }
}
export default new CardTransactionRepository();
