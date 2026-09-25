import BaseController from "./BaseController.js";
import creditRequestService from "../services/CreditRequestService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Solicitações de Crédito.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class CreditRequestController
 * @extends {BaseController}
 */
class CreditRequestController extends BaseController {
  /**
   * Instancia o `CreditRequestController` injetando o serviço de solicitações de crédito (`creditRequestService`).
   */
  constructor() {
    super(creditRequestService);
  }
}

/**
 * Instância única (Singleton) do controller de Solicitações de Crédito para utilização na camada de rotas.
 * @type {CreditRequestController}
 */
export default new CreditRequestController();
