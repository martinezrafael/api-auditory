import BaseRepository from "./BaseRepository.js";
import companyModel from "../models/CompanyModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Empresas.
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository` com suporte a Soft Delete.
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
   * Busca todas as empresas ativas (não deletadas) e preenche os dados dos usuários proprietários (`owners`)
   * e criador (`createdBy`) que também estejam ativos.
   *
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de documentos de empresas ativas com usuários populados.
   */
  async findCompanies() {
    return this.model
      .find({ isDeleted: { $ne: true } })
      .populate({
        path: "owners",
        match: { isDeleted: { $ne: true } }, // Traz apenas sócios/proprietários ativos
      })
      .populate({
        path: "createdBy",
        match: { isDeleted: { $ne: true } }, // Traz o criador caso ainda esteja ativo
      });
  }

  /**
   * Busca uma empresa ativa pelo ID e preenche os dados dos usuários proprietários (`owners`) e criador (`createdBy`).
   *
   * @param {string|import("mongoose").Types.ObjectId} id - Identificador único da empresa.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa ativa com os usuários populados ou null.
   */
  async findCompanyById(id) {
    return this.model
      .findOne({ _id: id, isDeleted: { $ne: true } })
      .populate({
        path: "owners",
        match: { isDeleted: { $ne: true } },
      })
      .populate({
        path: "createdBy",
        match: { isDeleted: { $ne: true } },
      });
  }

  /**
   * Busca uma empresa ativa cadastrada pelo seu CNPJ (`documentNumber`).
   *
   * @param {string} cnpj - Número do CNPJ da empresa a ser localizada.
   * @returns {Promise<import("mongoose").Document|null>} Documento da empresa ativa ou null.
   */
  async findByCnpj(cnpj) {
    return this.model.findOne({
      documentNumber: cnpj,
      isDeleted: { $ne: true },
    });
  }

  /**
   * Busca uma empresa ativa cadastrada pela sua Razão Social (`legalName`).
   *
   * @param {string} legalName - Razão social da empresa.
   * @returns {Promise<import("mongoose").Document|null>} Documento da empresa ativa ou null.
   */
  async findByLegalName(legalName) {
    return this.model.findOne({ legalName, isDeleted: { $ne: true } });
  }

  /**
   * Opcional: Busca uma empresa pelo CNPJ independente de estar deletada ou não.
   * Utilize este método caso a regra de negócio impeça o recadastro de um CNPJ
   * que já foi utilizado no passado (mesmo que inativado).
   *
   * @param {string} cnpj - Número do CNPJ.
   * @returns {Promise<import("mongoose").Document|null>}
   */
  async findByCnpjWithDeleted(cnpj) {
    return this.model.findOne({ documentNumber: cnpj });
  }
}

/**
 * Instância única (Singleton) do repositório de Empresas pronta para uso na camada de serviços.
 * @type {CompanyRepository}
 */
export default new CompanyRepository();
