import BaseService from "./BaseService.js";
import userRepository from "../database/repositories/UserRepository.js";
import bcrypt from "bcrypt";

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
   * Cria um novo usuário no sistema realizando a verificação de e-mail duplicado e a criptografia da senha.
   *
   * @param {Object} data - Dados do usuário para cadastro.
   * @param {string} data.email - E-mail do usuário.
   * @param {string} data.password - Senha em texto puro a ser criptografada.
   * @returns {Promise<Object>} Dados do usuário criado (sem a senha).
   * @throws {Error} Lança um erro 400 caso o e-mail já esteja em uso.
   */
  async create(data) {
    const { email, password } = data;

    const existing = await this.repository.findByEmail(email);
    if (existing) {
      const error = new Error("Este e-mail já está em uso no sistema.");
      error.statusCode = 400;
      throw error;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const preparedUserData = {
      ...data,
      password: hashedPassword,
    };

    const user = await super.create(preparedUserData);

    const userObject = user.toObject ? user.toObject() : user;
    delete userObject.password;

    return userObject;
  }

  /**
   * Sobrescreve o método `getAll` da BaseService para buscar todos os usuários com as empresas populadas.
   *
   * @returns {Promise<Array<Object>>} Lista de usuários com relacionamentos.
   */
  async getAll() {
    return this.repository.findUsers();
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
