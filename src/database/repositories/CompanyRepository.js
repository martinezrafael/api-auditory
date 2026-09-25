import BaseRepository from "./BaseRepository.js";
import companyModel from "../models/CompanyModel.js";

class CompanyRepository extends BaseRepository {
  constructor() {
    super(companyModel);
  }

  /**
   * Busca todas as empresas ativas com seus usuários e criador populados.
   */
  async findCompanies() {
    return this.model
      .find({ isDeleted: { $ne: true } })
      .populate("users")
      .populate({
        path: "createdBy",
        match: { isDeleted: { $ne: true } },
      });
  }

  /**
   * Busca uma empresa ativa por ID com usuários e criador.
   */
  async findCompanyById(id) {
    return this.model
      .findOne({ _id: id, isDeleted: { $ne: true } })
      .populate("users")
      .populate({
        path: "createdBy",
        match: { isDeleted: { $ne: true } },
      });
  }

  async findByCnpj(cnpj) {
    return this.model.findOne({
      documentNumber: cnpj,
      isDeleted: { $ne: true },
    });
  }

  async findByLegalName(legalName) {
    return this.model.findOne({ legalName, isDeleted: { $ne: true } });
  }
}

export default new CompanyRepository();
