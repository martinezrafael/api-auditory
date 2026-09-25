import BaseController from "./BaseController.js";
import creditOfferService from "../services/CreditOfferService.js";

/**
 * Controller responsável por gerenciar as requisições HTTP do recurso de Ofertas de Crédito.
 * Extende `BaseController`, herdando as implementações padrão de CRUD (`create`, `getAll`, `getById`, `update`, `delete`).
 *
 * @class CreditOfferController
 * @extends {BaseController}
 */
class CreditOfferController extends BaseController {
  /**
   * Instancia o `CreditOfferController` injetando o serviço de ofertas de crédito (`creditOfferService`).
   */
  constructor() {
    super(creditOfferService);
  }
}

/**
 * Instância única (Singleton) do controller de Ofertas de Crédito para utilização na camada de rotas.
 * @type {CreditOfferController}
 */
export default new CreditOfferController();
