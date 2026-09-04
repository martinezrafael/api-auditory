import BaseRepository from "./BaseRepository.js";
import contractFeeModel from "../models/acquiring/ContractFeeModel.js";

class ContractFeeRepository extends BaseRepository {
  constructor() {
    super(contractFeeModel);
  }
}

export default new ContractFeeRepository();
