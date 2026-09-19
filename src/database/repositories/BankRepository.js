import BaseRepository from "./BaseRepository.js";
import bankModel from "../models/BankModel.js";

class BankRepository extends BaseRepository {
  constructor() {
    super(bankModel);
  }
}
export default new BankRepository();
