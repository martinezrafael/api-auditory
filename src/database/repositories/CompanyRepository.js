import BaseRepository from "./BaseRepository.js";
import companyModel from "../models/CompanyModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Empresas.
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class CompanyRepository
 * @extends {BaseRepository}
 */
class CompanyRepository extends BaseRepository {
  /**
   * Instancia o `CompanyRepository` repassando o modelo de dados de empresa (`companyModel`) para a classe base.
   */
  constructor() {
    super(companyModel);
  }

  /**
   * Busca todas as empresas cadastradas e preenche os dados dos usuários proprietários (`owners`) e criador (`createdBy`).
   *
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de documentos de empresas com os usuários populados.
   */
  async findCompanies() {
    return this.model.find().populate("owners").populate("createdBy");
  }

  /**
   * Busca uma empresa pelo ID e preenche os dados dos usuários proprietários (`owners`) e criador (`createdBy`).
   *
   * @param {string|import("mongoose").Types.ObjectId} id - Identificador único da empresa.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa localizada com os usuários populados ou null.
   */
  async findCompanyById(id) {
    return this.model.findById(id).populate("owners").populate("createdBy");
  }

  /**
   * Busca uma empresa cadastrada pelo seu CNPJ (`documentNumber`).
   *
   * @param {string} cnpj - Número do CNPJ da empresa a ser localizada.
   * @returns {Promise<import("mongoose").Document|null>} Promessa contendo o documento da empresa encontrada ou null.
   */
  async findByCnpj(cnpj) {
    return this.model.findOne({ documentNumber: cnpj });
  }

  /**
   * Busca uma empresa cadastrada pela sua Razão Social (`legalName`).
   *
   * @param {string} legalName - Razão social da empresa.
   * @returns {Promise<import("mongoose").Document|null>}
   */
  async findByLegalName(legalName) {
    return this.model.findOne({ legalName });
  }
}

/**
 * Instância única (Singleton) do repositório de Empresas pronta para uso na camada de serviços.
 * @type {CompanyRepository}
 */
export default new CompanyRepository();
