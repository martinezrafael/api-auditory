import BaseController from "./BaseController.js";
import companyService from "../services/CompanyService.js";

class CompanyController extends BaseController {
  constructor() {
    super(companyService, "Empresa");
  }
}
export default new CompanyController();
