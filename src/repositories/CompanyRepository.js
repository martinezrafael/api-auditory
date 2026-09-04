import BaseRepository from "./BaseRepository.js";
import companyModel from "../models/CompanyModel.js";

class CompanyRepository extends BaseRepository {
  constructor() {
    super(companyModel);
  }
}
export default new CompanyRepository();
