import BaseService from "./BaseService.js";
import companyRepository from "../repositories/CompanyRepository.js";
import userRepository from "../repositories/UserRepository.js";

class CompanyService extends BaseService {
  constructor() {
    super(companyRepository);
  }
}

export default new CompanyService();
