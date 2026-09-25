import BaseService from "./BaseService.js";
import bankTransactionRepository from "../database/repositories/BankTransactionRepository.js";

/**
 * Serviço responsável por concentrar a regra de negócio do recurso de Transações Bancárias.
 * Extende `BaseService`, herdando as operações fundamentais de dados (`create`, `findAll`, `findById`, `update`, `delete`).
 *
 * @class BankTransactionService
 * @extends {BaseService}
 */
class BankTransactionService extends BaseService {
  /**
   * Instancia o `BankTransactionService` injetando o repositório de transações bancárias (`bankTransactionRepository`).
   */
  constructor() {
    super(bankTransactionRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Transações Bancárias.
 * @type {BankTransactionService}
 */
export default new BankTransactionService();
