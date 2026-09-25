import BaseService from "./BaseService.js";
import creditOfferRepository from "../database/repositories/CreditOfferRepository.js";

/**
 * Serviço responsável por concentrar a regra de negócio do recurso de Ofertas de Crédito.
 * Extende `BaseService`, herdando as operações fundamentais de dados (`create`, `findAll`, `findById`, `update`, `delete`).
 *
 * @class CreditOfferService
 * @extends {BaseService}
 */
class CreditOfferService extends BaseService {
  /**
   * Instancia o `CreditOfferService` injetando o repositório de ofertas de crédito (`creditOfferRepository`).
   */
  constructor() {
    super(creditOfferRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Ofertas de Crédito.
 * @type {CreditOfferService}
 */
export default new CreditOfferService();
