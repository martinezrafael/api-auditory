import BaseRepository from "./BaseRepository.js";
import cardTransactionModel from "../models/CardTransactionModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Transação de Cartão (`CardTransaction`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class CardTransactionRepository
 * @extends {BaseRepository}
 */
class CardTransactionRepository extends BaseRepository {
  /**
   * Instancia o `CardTransactionRepository` repassando o modelo de dados de transações de cartão (`cardTransactionModel`) para a classe base.
   */
  constructor() {
    super(cardTransactionModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Transações de Cartão pronta para uso na camada de serviços.
 * @type {CardTransactionRepository}
 */
export default new CardTransactionRepository();
