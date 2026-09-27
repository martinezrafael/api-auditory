import mongoose from "mongoose";
import BaseService from "./BaseService.js";
import companyRepository from "../database/repositories/CompanyRepository.js";
import userRepository from "../database/repositories/UserRepository.js";

/**
 * Serviço responsável pela lógica de negócios da entidade de Empresas (`Company`).
 * Herda operações genéricas da classe `BaseService` e orquestra transações complexas
 * envolvendo criação, associação e exclusão em cascata de usuários vinculados.
 *
 * @class CompanyService
 * @extends {BaseService}
 */
class CompanyService extends BaseService {
  /**
   * Instancia o `CompanyService` injetando o repositório de empresas (`companyRepository`).
   */
  constructor() {
    super(companyRepository);
  }

  /**
   * Valida se o CNPJ e a Razão Social informados já estão cadastrados na base de dados.
   *
   * @async
   * @param {string} documentNumber - Número do CNPJ da empresa a ser validado.
   * @param {string} legalName - Razão Social da empresa a ser validada.
   * @returns {Promise<void>} Não retorna valor se a validação for bem-sucedida.
   * @throws {Error} Lança um erro com `statusCode = 400` se o CNPJ ou a Razão Social já estiverem em uso.
   */
  async validateCompanyUniqueness(documentNumber, legalName) {
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
  }

  /**
   * Cria uma empresa e seu usuário inicial administrativo dentro de uma única transação ACID no banco de dados.
   *
   * @async
   * @param {Object} [payload={}] - Objeto de dados contendo as informações necessárias.
   * @param {import("../models/CompanyModel.js").ICompany} payload.companyData - Dados de cadastro da empresa.
   * @param {import("../models/UserModel.js").IUser} payload.userData - Dados do usuário inicial a ser associado à empresa.
   * @returns {Promise<{company: import("../models/CompanyModel.js").ICompany, user: import("../models/UserModel.js").IUser}>} Retorna o objeto com a empresa e o usuário recém-criados.
   * @throws {Error} Lança erro 400 em caso de payload incompleto ou campos duplicados (CNPJ/Razão Social/E-mail).
   */
  async createCompanyWithUser(payload = {}) {
    const { companyData, userData } = payload;

    // Validação defensiva do payload de entrada
    if (!companyData || !userData) {
      const error = new Error(
        "Payload inválido. Os objetos 'companyData' e 'userData' são obrigatórios.",
      );
      error.statusCode = 400;
      throw error;
    }

    // Valida unicidade de CNPJ e Razão Social
    await this.validateCompanyUniqueness(
      companyData.documentNumber,
      companyData.legalName,
    );

    // Valida se o e-mail do usuário já existe
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error("Este e-mail de usuário já está em uso.");
      error.statusCode = 400;
      throw error;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const userId = new mongoose.Types.ObjectId();

      // 1. Cria a empresa apontando para o id do usuário que será criado
      const [company] = await this.repository.create(
        [
          {
            ...companyData,
            createdBy: userId,
          },
        ],
        { session },
      );

      // 2. Cria o usuário apontando para o id da empresa criada
      const [user] = await userRepository.create(
        [
          {
            _id: userId,
            ...userData,
            company: company._id,
          },
        ],
        { session },
      );

      await session.commitTransaction();
      session.endSession();

      return { company, user };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  /**
   * Associa e cadastra um novo usuário a uma empresa previamente cadastrada na aplicação.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} companyId - ID único da empresa existente.
   * @param {import("../models/UserModel.js").IUser} userData - Dados do usuário a ser cadastrado e vinculado.
   * @returns {Promise<import("../models/UserModel.js").IUser>} O documento do usuário criado.
   * @throws {Error} Lança erro 400 se `userData` for omitido ou e-mail já estiver em uso, e 404 se a empresa não for encontrada.
   */
  async addUserToCompany(companyId, userData) {
    if (!userData) {
      const error = new Error(
        "Os dados do usuário ('userData') são obrigatórios.",
      );
      error.statusCode = 400;
      throw error;
    }

    const company = await this.getById(companyId);

    // Valida e-mail duplicado
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error("Este e-mail de usuário já está em uso.");
      error.statusCode = 400;
      throw error;
    }

    // Cria o usuário com vínculo na empresa
    const user = await userRepository.create({
      ...userData,
      company: company._id,
    });

    return user;
  }

  /**
   * Retorna a lista de usuários vinculados a uma empresa específica.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} companyId - ID único da empresa.
   * @returns {Promise<import("../models/UserModel.js").IUser[]>} Lista de usuários da empresa.
   * @throws {Error} Lança erro com `statusCode = 404` se a empresa não for encontrada.
   */
  async getUsersByCompanyId(companyId) {
    // Garante que a empresa existe (lança 404 se não encontrada)
    await this.getById(companyId);

    // Busca os usuários vinculados à empresa
    return userRepository.findByCompanyId(companyId);
  }

  /**
   * Busca e lista todas as empresas ativas cadastradas no banco de dados.
   *
   * @async
   * @returns {Promise<import("../models/CompanyModel.js").ICompany[]>} Lista contendo as empresas ativas.
   */
  async getAll() {
    return this.repository.findCompanies();
  }

  /**
   * Busca os dados de uma empresa específica pelo seu ID.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} id - ID da empresa a ser recuperada.
   * @returns {Promise<import("../models/CompanyModel.js").ICompany>} O documento completo da empresa encontrada.
   * @throws {Error} Lança erro com `statusCode = 404` se a empresa não existir ou estiver deletada.
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

  /**
   * Executa a exclusão lógica (Soft Delete) de uma empresa e efetua o descarte em cascata de todos os usuários associados via transação.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} id - ID da empresa a ser excluída.
   * @returns {Promise<import("../models/CompanyModel.js").ICompany>} O documento da empresa que sofreu a exclusão lógica.
   * @throws {Error} Lança erro 404 caso a empresa não seja localizada para exclusão.
   */
  async delete(id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedCompany = await this.repository.delete(id, { session });

      if (!deletedCompany) {
        const error = new Error("Empresa não encontrada para exclusão.");
        error.statusCode = 404;
        throw error;
      }

      // Desativa todos os usuários vinculados à empresa em cascata
      await userRepository.softDeleteByCompany(id, session);

      await session.commitTransaction();
      session.endSession();

      return deletedCompany;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

/**
 * Instância única (Singleton) do serviço de Empresas.
 * @type {CompanyService}
 */
export default new CompanyService();
