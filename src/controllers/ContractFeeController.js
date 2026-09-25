import BaseController from "./BaseController.js";
import contractFeeService from "../services/ContractFeeService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Taxas Contratuais (`ContractFee`).
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class ContractFeeController
 * @extends {BaseController}
 */
class ContractFeeController extends BaseController {
  /**
   * Instancia o `ContractFeeController` injetando o serviço de taxas contratuais (`contractFeeService`).
   */
  constructor() {
    super(contractFeeService);
  }
}

/**
 * Instância única (Singleton) do controller de Taxas Contratuais para utilização na camada de rotas.
 * @type {ContractFeeController}
 */
export default new ContractFeeController();
