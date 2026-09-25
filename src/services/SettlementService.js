import BaseService from "./BaseService.js";
import settlementRepository from "../database/repositories/SettlementRepository.js";

/**
 * Serviço responsável por concentrar a regra de negócio do recurso de Liquidações Financeiras (`Settlement`).
 * Extende `BaseService`, herdando as operações fundamentais de dados (`create`, `findAll`, `findById`, `update`, `delete`).
 *
 * @class SettlementService
 * @extends {BaseService}
 */
class SettlementService extends BaseService {
  /**
   * Instancia o `SettlementService` injetando o repositório de liquidações financeiras (`settlementRepository`).
   */
  constructor() {
    super(settlementRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Liquidações Financeiras.
 * @type {SettlementService}
 */
export default new SettlementService();
