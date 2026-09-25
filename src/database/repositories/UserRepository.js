import BaseRepository from "./BaseRepository.js";
import userModel from "../models/UserModel.js";

/**
 * Repositório responsável por manipular operações de banco de dados relacionadas à entidade de Usuários (`User`).
 * Extende a classe genérica `BaseRepository`, fornecendo suporte às operações de acesso a dados com filtro de Soft Delete.
 *
 * @class UserRepository
 * @extends {BaseRepository}
 */
class UserRepository extends BaseRepository {
  /**
   * Instancia o `UserRepository` repassando o modelo de dados de usuário (`userModel`) para a classe base.
   */
  constructor() {
    super(userModel);
  }

  /**
   * Busca todos os usuários ativos (não deletados) e preenche os dados da empresa associada que também esteja ativa.
   *
   * @async
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de documentos de usuários ativos com a empresa populada.
   */
  async findUsers() {
    return this.model.find({ isDeleted: { $ne: true } }).populate({
      path: "company",
      match: { isDeleted: { $ne: true } },
    });
  }

  /**
   * Busca um usuário ativo pelo seu ID e preenche os dados da empresa associada caso esteja ativa.
   *
   * @async
   * @param {string|import("mongoose").Types.ObjectId} id - Identificador único do usuário.
   * @returns {Promise<import("mongoose").Document|null>} O documento do usuário localizado ou null se não for encontrado/estiver deletado.
   */
  async findUserById(id) {
    return this.model.findOne({ _id: id, isDeleted: { $ne: true } }).populate({
      path: "company",
      match: { isDeleted: { $ne: true } },
    });
  }

  /**
   * Busca um usuário ativo pelo endereço de e-mail.
   *
   * @async
   * @param {string} email - Endereço de e-mail do usuário a ser localizado.
   * @returns {Promise<import("mongoose").Document|null>} O documento do usuário ativo ou null.
   */
  async findByEmail(email) {
    return this.model.findOne({ email, isDeleted: { $ne: true } });
  }

  /**
   * Busca um usuário pelo e-mail ignorando a flag de exclusão lógica (`isDeleted`).
   * Útil para rotas de autenticação (login) ou verificações de duplicidade de e-mail.
   *
   * @async
   * @param {string} email - Endereço de e-mail do usuário.
   * @returns {Promise<import("mongoose").Document|null>} O documento do usuário (ativo ou deletado) ou null.
   */
  async findByEmailWithDeleted(email) {
    return this.model.findOne({ email });
  }

  /**
   * Executa soft delete em massa nos usuários de uma empresa específica.
   */
  async softDeleteByCompany(companyId, session = null) {
    return this.model.updateMany(
      { company: companyId, isDeleted: { $ne: true } },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
      { session },
    );
  }
}

/**
 * Instância única (Singleton) do repositório de Usuários pronta para ser utilizada pela aplicação.
 * @type {UserRepository}
 */
export default new UserRepository();
