import BaseController from "./BaseController.js";
import bankAccountService from "../services/BankAccountService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Contas Bancárias.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class BankAccountController
 * @extends {BaseController}
 */
class BankAccountController extends BaseController {
  /**
   * Instancia o `BankAccountController` injetando o serviço de contas bancárias (`bankAccountService`).
   */
  constructor() {
    super(bankAccountService);
  }
}

/**
 * Instância única (Singleton) do controller de Contas Bancárias para utilização na camada de rotas.
 * @type {BankAccountController}
 */
export default new BankAccountController();
