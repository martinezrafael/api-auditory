import BaseService from "./BaseService.js";
import contractFeeRepository from "../repositories/ContractFeeRepository.js";

class ContractFeeService extends BaseService {
  constructor() {
    const defaultPopulate = [
      { path: "company", select: "legalName tradeName documentNumber" },
      { path: "acquirer", select: "acquirerName documentNumber merchantId" },
    ];
    super(contractFeeRepository, defaultPopulate);
  }
}

export default new ContractFeeService();
