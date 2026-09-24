import BaseController from "./BaseController.js";
import cardAcquirerService from "../services/CardAcquirerService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Adquirentes de Cartão.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class CardAcquirerController
 * @extends {BaseController}
 */
class CardAcquirerController extends BaseController {
  /**
   * Instancia o `CardAcquirerController` injetando o serviço de adquirentes (`cardAcquirerService`).
   */
  constructor() {
    super(cardAcquirerService);
  }
}

/**
 * Instância única (Singleton) do controller de Adquirentes de Cartão para utilização na camada de rotas.
 * @type {CardAcquirerController}
 */
export default new CardAcquirerController();
