import BaseRepository from "./BaseRepository.js";
import bankTransactionModel from "../models/banking/BankTransactionModel.js";

class BankTransactionRepository extends BaseRepository {
  constructor() {
    super(bankTransactionModel);
  }
}
export default new BankTransactionRepository();
