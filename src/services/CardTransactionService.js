import BaseService from "./BaseService.js";
import cardTransactionRepository from "../database/repositories/CardTransactionRepository.js";

/**
 * Serviço responsável por concentrar as regras de negócio relativas às Transações de Cartão.
 * Herda os métodos genéricos de serviço (`BaseService`) e utiliza o `CardTransactionRepository` para persistência de dados.
 *
 * @class CardTransactionService
 * @extends {BaseService}
 */
class CardTransactionService extends BaseService {
  /**
   * Instancia o `CardTransactionService` fornecendo o `cardTransactionRepository` para a classe base.
   */
  constructor() {
    super(cardTransactionRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Transações de Cartão pronta para ser utilizada pelos controllers.
 * @type {CardTransactionService}
 */
export default new CardTransactionService();
