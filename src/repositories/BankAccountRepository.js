import BaseRepository from "./BaseRepository.js";
import bankAccountModel from "../models/banking/BankAccountModel.js";

class BankAccountRepository extends BaseRepository {
  constructor() {
    super(bankAccountModel);
  }
}
export default new BankAccountRepository();
