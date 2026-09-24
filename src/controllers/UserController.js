import BaseController from "./BaseController.js";
import userService from "../services/UserService.js";

/**
 * Controller responsável por manipular as requisições HTTP do recurso de Usuários.
 * Herda os métodos genéricos de CRUD (`create`, `getAll`, `getById`, `update`, `delete`) da classe `BaseController`.
 *
 * @class UserController
 * @extends {BaseController}
 */
class UserController extends BaseController {
  /**
   * Instância o `UserController` injetando o serviço de usuários (`userService`).
   */
  constructor() {
    super(userService);
  }
}

/**
 * Instância única (Singleton) do controller de Usuários pronta para uso no roteador Express.
 * @type {UserController}
 */
export default new UserController();
