import BaseService from "./BaseService.js";
import userRepository from "../database/repositories/UserRepository.js";

/**
 * Serviço responsável pela regra de negócio relacionada à entidade de Usuários.
 * Herda as funcionalidades genéricas de serviço (`BaseService`) e utiliza o `UserRepository` para persistência.
 *
 * @class UserService
 * @extends {BaseService}
 */
class UserService extends BaseService {
  /**
   * Instancia o `UserService` fornecendo a instância de `UserRepository` para a classe base.
   */
  constructor() {
    super(userRepository);
  }

  /**
   * Sobrescreve o método `getById` da BaseService para buscar um usuário com as empresas populadas
   * e validar sua existência.
   *
   * @param {string} id - Identificador único do usuário.
   * @returns {Promise<Object>} Dados do usuário localizado.
   * @throws {Error} Lança um erro 404 caso o usuário não seja localizado.
   */
  async getById(id) {
    const user = await this.repository.findUserById(id);

    if (!user) {
      const error = new Error("Usuário não encontrado.");
      error.statusCode = 404;
      throw error;
    }

    return user;
  }
}

/**
 * Instância única (Singleton) do serviço de Usuários pronta para ser utilizada pelos controllers.
 * @type {UserService}
 */
export default new UserService();
