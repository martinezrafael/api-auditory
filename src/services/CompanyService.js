import mongoose from "mongoose";
import bcrypt from "bcrypt";
import BaseService from "./BaseService.js";
import companyRepository from "../database/repositories/CompanyRepository.js";
import userRepository from "../database/repositories/UserRepository.js";

/**
 * Serviço responsável pela lógica de negócios da entidade de Empresas (`Company`).
 * Herda operações genéricas da classe `BaseService` e orquestra transações complexas
 * envolvendo criação, associação e gestão de usuários vinculados.
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
   * Método auxiliar para criação de objetos de Erro com código de status HTTP.
   *
   * @private
   * @param {string} message - Mensagem do erro.
   * @param {number} statusCode - Código de status HTTP.
   * @returns {Error} Objeto de Erro configurado.
   */
  #createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }

  /**
   * Gera o hash de senha utilizando bcrypt.
   *
   * @private
   * @param {string} password - Senha em texto plano.
   * @returns {Promise<string>} Senha criptografada.
   */
  async #hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
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
      throw this.#createError("Este CNPJ já está em uso no sistema.", 400);
    }

    const existingLegalName = await this.repository.findByLegalName(legalName);
    if (existingLegalName) {
      throw this.#createError(
        "Esta Razão Social já está em uso no sistema.",
        400,
      );
    }
  }

  /**
   * Cria uma empresa e seu usuário inicial administrativo dentro de uma única transação ACID no banco de dados.
   *
   * @async
   * @param {Object} [payload={}] - Objeto de dados contendo as informações necessárias.
   * @param {import("../models/CompanyModel.js").ICompany} payload.companyData - Dados de cadastro da empresa.
   * @param {import("../models/UserModel.js").IUser} payload.userData - Dados do usuário inicial a ser associado à empresa.
   * @returns {Promise<{company: import("../models/CompanyModel.js").ICompany, user: import("../models/UserModel.js").IUser}>}
   * @throws {Error} Lança erro 400 em caso de payload incompleto ou campos duplicados.
   */
  async createCompanyWithUser(payload = {}) {
    const { companyData, userData } = payload;

    if (!companyData || !userData) {
      throw this.#createError(
        "Payload inválido. Os objetos 'companyData' e 'userData' são obrigatórios.",
        400,
      );
    }

    await this.validateCompanyUniqueness(
      companyData.documentNumber,
      companyData.legalName,
    );

    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw this.#createError("Este e-mail de usuário já está em uso.", 400);
    }

    if (userData.password) {
      userData.password = await this.#hashPassword(userData.password);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const userId = new mongoose.Types.ObjectId();

      const [company] = await this.repository.create(
        [
          {
            ...companyData,
            createdBy: userId,
          },
        ],
        { session },
      );

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
      return { company, user };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Associa e cadastra um novo usuário a uma empresa previamente cadastrada.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} companyId - ID único da empresa existente.
   * @param {import("../models/UserModel.js").IUser} userData - Dados do usuário a ser cadastrado e vinculado.
   * @returns {Promise<import("../models/UserModel.js").IUser>} O documento do usuário criado.
   * @throws {Error} Lança erro 400 se `userData` for omitido/e-mail já estiver em uso, e 404 se a empresa não for encontrada.
   */
  async addUserToCompany(companyId, userData) {
    if (!userData) {
      throw this.#createError(
        "Os dados do usuário ('userData') são obrigatórios.",
        400,
      );
    }

    const company = await this.getById(companyId);

    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw this.#createError("Este e-mail de usuário já está em uso.", 400);
    }

    if (userData.password) {
      userData.password = await this.#hashPassword(userData.password);
    }

    return userRepository.create({
      ...userData,
      company: company._id,
    });
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
    await this.getById(companyId);
    return userRepository.findByCompanyId(companyId);
  }

  /**
   * Busca um usuário específico vinculado a uma empresa pelo seu ID.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} companyId - ID único da empresa.
   * @param {string|mongoose.Types.ObjectId} userId - ID único do usuário.
   * @returns {Promise<import("../models/UserModel.js").IUser>} Dados do usuário localizado.
   * @throws {Error} Lança erro 404 se a empresa ou o usuário não forem localizados/não estiverem vinculados.
   */
  async getUserByCompanyIdAndUserId(companyId, userId) {
    await this.getById(companyId);

    const user = await userRepository.findByIdAndCompanyId(companyId, userId);
    if (!user) {
      throw this.#createError("Usuário não encontrado nesta empresa.", 404);
    }

    return user;
  }

  /**
   * Atualiza os dados de um usuário vinculado a uma empresa específica.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} companyId - ID único da empresa.
   * @param {string|mongoose.Types.ObjectId} userId - ID único do usuário.
   * @param {Object} updateData - Dados do usuário a serem atualizados.
   * @returns {Promise<import("../models/UserModel.js").IUser>} O documento do usuário atualizado.
   * @throws {Error} Lança erro 404 se o usuário/empresa não for localizado e 400 se o e-mail informado já estiver em uso.
   */
  async updateUserByCompany(companyId, userId, updateData) {
    const user = await this.getUserByCompanyIdAndUserId(companyId, userId);

    if (updateData.email && updateData.email !== user.email) {
      const existingEmail = await userRepository.findByEmail(updateData.email);
      if (existingEmail) {
        throw this.#createError("Este e-mail de usuário já está em uso.", 400);
      }
    }

    if (updateData.password) {
      updateData.password = await this.#hashPassword(updateData.password);
    }

    return userRepository.update(userId, updateData);
  }

  /**
   * Realiza a exclusão lógica (Soft Delete) de um usuário atrelado a uma empresa.
   *
   * @async
   * @param {string|mongoose.Types.ObjectId} companyId - ID único da empresa.
   * @param {string|mongoose.Types.ObjectId} userId - ID único do usuário.
   * @returns {Promise<import("../models/UserModel.js").IUser>} O documento do usuário desativado.
   * @throws {Error} Lança erro 404 caso o usuário/empresa não seja localizado.
   */
  async deleteUserByCompany(companyId, userId) {
    await this.getUserByCompanyIdAndUserId(companyId, userId);
    return userRepository.delete(userId);
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
      throw this.#createError("Empresa não encontrada.", 404);
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
        throw this.#createError("Empresa não encontrada para exclusão.", 404);
      }

      await userRepository.softDeleteByCompany(id, session);

      await session.commitTransaction();
      return deletedCompany;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

/**
 * Instância única (Singleton) do serviço de Empresas.
 * @type {CompanyService}
 */
export default new CompanyService();
