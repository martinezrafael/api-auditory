import BaseService from "./BaseService.js";
import companyModel from "../models/identity/Company.js";

class CompanyService extends BaseService {
  constructor() {
    super(companyModel);
  }
}

export default new CompanyService();
