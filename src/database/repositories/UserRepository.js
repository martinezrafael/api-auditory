import BaseRepository from "./BaseRepository.js";
import userModel from "../models/UserModel.js";

/**
 * Repositório responsável por manipular operações de banco de dados relacionadas à entidade de Usuários.
 * Extende o repositório base genérico (`BaseRepository`), fornecendo acesso aos métodos padrão de CRUD com suporte a Soft Delete.
 *
 * @class UserRepository
 * @extends {BaseRepository}
 */
class UserRepository extends BaseRepository {
  /**
   * Cria uma instância de `UserRepository`, passando o modelo de usuário (`userModel`) para a classe base.
   */
  constructor() {
    super(userModel);
  }

  /**
   * Busca todos os usuários ativos (não deletados) e preenche apenas as empresas também ativas.
   *
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de usuários ativos com empresas ativas populadas.
   */
  async findUsers() {
    return this.model.find({ isDeleted: { $ne: true } }).populate({
      path: "companies",
      match: { isDeleted: { $ne: true } }, // Traz apenas empresas ativas
    });
  }

  /**
   * Busca um usuário ativo pelo ID e preenche apenas as empresas ativas associadas.
   *
   * @param {string|import("mongoose").Types.ObjectId} id - Identificador único do usuário.
   * @returns {Promise<import("mongoose").Document|null>} Usuário localizado ou null se estiver deletado.
   */
  async findUserById(id) {
    return this.model.findOne({ _id: id, isDeleted: { $ne: true } }).populate({
      path: "companies",
      match: { isDeleted: { $ne: true } }, // Traz apenas empresas ativas
    });
  }

  /**
   * Busca um usuário ativo pelo e-mail.
   *
   * @param {string} email - Endereço de e-mail do usuário a ser localizado.
   * @returns {Promise<import("mongoose").Document|null>} O documento do usuário ativo ou null.
   */
  async findByEmail(email) {
    return this.model.findOne({ email, isDeleted: { $ne: true } });
  }

  /**
   * Opcional: Busca um usuário pelo e-mail incluindo os deletados.
   * Útil para rotas de Login ou validações de cadastro que precisam saber
   * se o e-mail já pertenceu a uma conta desativada.
   *
   * @param {string} email - Endereço de e-mail do usuário.
   * @returns {Promise<import("mongoose").Document|null>} O documento do usuário (deletado ou não).
   */
  async findByEmailWithDeleted(email) {
    return this.model.findOne({ email });
  }
}

/**
 * Instância única (Singleton) do repositório de Usuários pronta para ser utilizada pela aplicação.
 * @type {UserRepository}
 */
export default new UserRepository();
