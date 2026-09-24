import BaseController from "./BaseController.js";
import bankService from "../services/BankService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Bancos.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class BankController
 * @extends {BaseController}
 */
class BankController extends BaseController {
  /**
   * Instancia o `BankController` injetando o serviço de bancos (`bankService`).
   */
  constructor() {
    super(bankService);
  }
}

/**
 * Instância única (Singleton) do controller de Bancos para utilização na camada de rotas.
 * @type {BankController}
 */
export default new BankController();
