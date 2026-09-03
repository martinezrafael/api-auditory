import BaseRepository from "./BaseRepository.js";
import companyModel from "../models/identity/Company.js";

class CompanyRepository extends BaseRepository {
  constructor() {
    super(companyModel);
  }
}
export default new CompanyRepository();
