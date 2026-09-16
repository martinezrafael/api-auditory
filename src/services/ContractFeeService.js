import BaseService from "./BaseService.js";
import contractFeeRepository from "../repositories/ContractFeeRepository.js";

class ContractFeeService extends BaseService {
  constructor() {
    super(contractFeeRepository);
  }
}

export default new ContractFeeService();
