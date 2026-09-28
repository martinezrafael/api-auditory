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
   *
   * =========================================================================
   * MÉTODOS HERDADOS AUTOMATICAMENTE DO BaseRepository (Módulos Padrão CRUD):
   * =========================================================================
   * - find(filter, options)   -> Busca genérica com suporte a paginação e projeção.
   * - findById(id)            -> Busca genérica por ID considerando `isDeleted: false`.
   * - create(data, options)   -> Criação de um ou mais documentos.
   * - update(id, data)        -> Atualização parcial por ID.
   * - delete(id, options)     -> Exclusão lógica (soft delete via flag `isDeleted`).
   * =========================================================================
   */
  constructor() {
    super(companyModel);
  }

  /* =========================================================================
   * MÉTODOS ESPECÍFICOS / CONSULTAS POPULADAS
   * ========================================================================= */

  /**
   * Busca todas as empresas ativas trazendo relacionamentos populados (`users` e `createdBy`).
   *
   * @async
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de empresas ativas com dados vinculados.
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
   * Busca uma empresa ativa por ID trazendo relacionamentos populados (`users` e `createdBy`).
   *
   * @async
   * @param {string|import("mongoose").Types.ObjectId} id - ID único da empresa.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa localizada ou `null`.
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
   * Busca uma empresa ativa pelo número do CNPJ (`documentNumber`).
   *
   * @async
   * @param {string} cnpj - Número do CNPJ a ser pesquisado.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa ou `null`.
   */
  async findByCnpj(cnpj) {
    return this.model.findOne({
      documentNumber: cnpj,
      isDeleted: { $ne: true },
    });
  }

  /**
   * Busca uma empresa ativa pela Razão Social (`legalName`).
   *
   * @async
   * @param {string} legalName - Razão Social da empresa a ser pesquisada.
   * @returns {Promise<import("mongoose").Document|null>} O documento da empresa ou `null`.
   */
  async findByLegalName(legalName) {
    return this.model.findOne({ legalName, isDeleted: { $ne: true } });
  }
}

/**
 * Instância única (Singleton) do repositório de Empresas.
 * @type {CompanyRepository}
 */
export default new CompanyRepository();
