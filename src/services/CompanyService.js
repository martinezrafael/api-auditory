import BaseService from "./BaseService.js";
import companyRepository from "../database/repositories/CompanyRepository.js";

class CompanyService extends BaseService {
  constructor() {
    super(companyRepository);
  }
}

export default new CompanyService();
