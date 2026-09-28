import BaseRepository from "./BaseRepository.js";
import companyModel from "../models/CompanyModel.js";

/**
 * Repositório responsável por manipular operações de banco de dados da entidade Empresa (`Company`).
 * Extende `BaseRepository` para suporte a CRUD genérico com exclusão lógica.
 *
 * @class CompanyRepository
 * @extends {BaseRepository}
 */
class CompanyRepository extends BaseRepository {
  /**
   * Instancia o `CompanyRepository` passando o modelo `companyModel` para a classe base.
   */
  constructor() {
    super(companyModel);
  }

  /**
   * Busca todas as empresas ativas com seus usuários e criador populados.
   *
   * @async
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de empresas ativas.
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
   * Busca uma empresa ativa por ID com usuários e criador populados.
   *
   * @async
   * @param {string|import("mongoose").Types.ObjectId} id - ID da empresa.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa ou null.
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

  /**
   * Busca uma empresa ativa pelo número do CNPJ.
   *
   * @async
   * @param {string} cnpj - Número do CNPJ.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa ou null.
   */
  async findByCnpj(cnpj) {
    return this.model.findOne({
      documentNumber: cnpj,
      isDeleted: { $ne: true },
    });
  }

  /**
   * Busca uma empresa ativa pela Razão Social.
   *
   * @async
   * @param {string} legalName - Razão Social da empresa.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa ou null.
   */
  async findByLegalName(legalName) {
    return this.model.findOne({ legalName, isDeleted: { $ne: true } });
  }
}

export default new CompanyRepository();
