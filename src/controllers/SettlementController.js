import BaseController from "./BaseController.js";
import settlementService from "../services/SettlementService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Liquidações Financeiras (`Settlement`).
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class SettlementController
 * @extends {BaseController}
 */
class SettlementController extends BaseController {
  /**
   * Instancia o `SettlementController` injetando o serviço de liquidações financeiras (`settlementService`).
   */
  constructor() {
    super(settlementService);
  }
}

/**
 * Instância única (Singleton) do controller de Liquidações Financeiras para utilização na camada de rotas.
 * @type {SettlementController}
 */
export default new SettlementController();
