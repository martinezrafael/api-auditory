import BaseService from "./BaseService.js";
import companyRepository from "../database/repositories/CompanyRepository.js";

/**
 * Serviço responsável por conter as regras de negócio relativas à entidade de Empresas.
 * Herda os métodos genéricos da camada de serviço (`BaseService`) e utiliza o `CompanyRepository` para persistência.
 *
 * @class CompanyService
 * @extends {BaseService}
 */
class CompanyService extends BaseService {
  /**
   * Instancia o `CompanyService` fornecendo o `companyRepository` para a classe base.
   */
  constructor() {
    super(companyRepository);
  }

  /**
   * Sobrescreve o método `create` para validar se o CNPJ e a Razão Social já estão cadastrados antes de salvar.
   *
   * @param {Object} data - Dados da empresa a ser criada.
   * @param {string} data.documentNumber - CNPJ da empresa.
   * @param {string} data.legalName - Razão social da empresa.
   * @returns {Promise<Object>} Documento da empresa criada.
   * @throws {Error} Lança erro 400 caso o CNPJ ou a Razão Social já estejam em uso.
   */
  async create(data) {
    const { documentNumber, legalName } = data;

    const existingCnpj = await this.repository.findByCnpj(documentNumber);
    if (existingCnpj) {
      const error = new Error("Este CNPJ já está em uso no sistema.");
      error.statusCode = 400;
      throw error;
    }

    const existingLegalName = await this.repository.findByLegalName(legalName);
    if (existingLegalName) {
      const error = new Error("Esta Razão Social já está em uso no sistema.");
      error.statusCode = 400;
      throw error;
    }

    const company = await super.create(data);
    return company;
  }

  /**
   * Sobrescreve o método `getAll` da BaseService para buscar todas as empresas com os usuários populados.
   *
   * @returns {Promise<Array<Object>>} Lista de empresas contendo os dados dos usuários associados.
   */
  async getAll() {
    return this.repository.findCompanies();
  }
  s;

  /**
   * Sobrescreve o método `getById` da BaseService para buscar uma empresa com os usuários populados
   * e validar sua existência.
   *
   * @param {string} id - Identificador único da empresa.
   * @returns {Promise<Object>} Dados da empresa localizada.
   * @throws {Error} Lança um erro com statusCode 404 caso a empresa não seja encontrada.
   */
  async getById(id) {
    const company = await this.repository.findCompanyById(id);

    if (!company) {
      const error = new Error("Empresa não encontrada.");
      error.statusCode = 404;
      throw error;
    }

    return company;
  }
}

/**
 * Instância única (Singleton) do serviço de Empresas pronta para ser utilizada pelos controllers.
 * @type {CompanyService}
 */
export default new CompanyService();
