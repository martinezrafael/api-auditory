import BaseRepository from "./BaseRepository.js";
import userModel from "../models/UserModel.js";

/**
 * Repositório responsável por manipular operações de banco de dados relacionadas à entidade de Usuários.
 * Extende o repositório base genérico (`BaseRepository`), fornecendo acesso aos métodos padrão de CRUD.
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
   * Busca todos os usuários cadastrados e preenche os dados das empresas associadas (`populate`).
   *
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de documentos de usuários com as empresas populadas.
   */
  async findUsers() {
    return this.model.find().populate("companies");
  }

  /**
   * Busca um usuário pelo ID e preenche os dados das empresas associadas (`populate`).
   *
   * @param {string|import("mongoose").Types.ObjectId} id - Identificador único do usuário.
   * @returns {Promise<import("mongoose").Document|null>} O documento do usuário localizado com as empresas populadas ou null.
   */
  async findUserById(id) {
    return this.model.findById(id).populate("companies");
  }

  /**
   * Busca um usuário cadastrado pelo e-mail.
   *
   * @param {string} email - Endereço de e-mail do usuário a ser localizado.
   * @returns {Promise<import("mongoose").Document|null>} Promessa contendo o documento do usuário ou null.
   */
  async findByEmail(email) {
    return this.model.findOne({ email });
  }
}

/**
 * Instância única (Singleton) do repositório de Usuários pronta para ser utilizada pela aplicação.
 * @type {UserRepository}
 */
export default new UserRepository();
