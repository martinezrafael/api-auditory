import BaseController from "./BaseController.js";
import cardTransactionService from "../services/CardTransactionService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Transações de Cartão.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class CardTransactionController
 * @extends {BaseController}
 */
class CardTransactionController extends BaseController {
  /**
   * Instancia o `CardTransactionController` injetando o serviço de transações de cartão (`cardTransactionService`).
   */
  constructor() {
    super(cardTransactionService);
  }
}

/**
 * Instância única (Singleton) do controller de Transações de Cartão para utilização na camada de rotas.
 * @type {CardTransactionController}
 */
export default new CardTransactionController();
