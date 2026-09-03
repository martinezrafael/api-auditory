import BaseRepository from "./BaseRepository.js";
import bankModel from "../models/identity/Bank.js";

class BankRepository extends BaseRepository {
  constructor() {
    super(bankModel);
  }
}
export default new BankRepository();
