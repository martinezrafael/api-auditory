import BaseService from "./BaseService.js";
import creditRequestRepository from "../database/repositories/CreditRequestRepository.js";

/**
 * Serviço responsável por concentrar a regra de negócio do recurso de Solicitações de Crédito.
 * Extende `BaseService`, herdando as operações fundamentais de dados (`create`, `findAll`, `findById`, `update`, `delete`).
 *
 * @class CreditRequestService
 * @extends {BaseService}
 */
class CreditRequestService extends BaseService {
  /**
   * Instancia o `CreditRequestService` injetando o repositório de solicitações de crédito (`creditRequestRepository`).
   */
  constructor() {
    super(creditRequestRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Solicitações de Crédito.
 * @type {CreditRequestService}
 */
export default new CreditRequestService();
