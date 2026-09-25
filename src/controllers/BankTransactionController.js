import BaseController from "./BaseController.js";
import bankTransactionService from "../services/BankTransactionService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Transações Bancárias.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class BankTransactionController
 * @extends {BaseController}
 */
class BankTransactionController extends BaseController {
  /**
   * Instancia o `BankTransactionController` injetando o serviço de transações bancárias (`bankTransactionService`).
   */
  constructor() {
    super(bankTransactionService);
  }
}

/**
 * Instância única (Singleton) do controller de Transações Bancárias para utilização na camada de rotas.
 * @type {BankTransactionController}
 */
export default new BankTransactionController();
