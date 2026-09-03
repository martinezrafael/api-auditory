import BaseService from "./BaseService.js";
import companyRepository from "../repositories/CompanyRepository.js";

class CompanyService extends BaseService {
  constructor() {
    super(companyRepository);
  }
}
export default new CompanyService();
