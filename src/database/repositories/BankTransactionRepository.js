import BaseRepository from "./BaseRepository.js";
import bankTransactionModel from "../models/BankTransactionModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Transação Bancária (`BankTransaction`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class BankTransactionRepository
 * @extends {BaseRepository}
 */
class BankTransactionRepository extends BaseRepository {
  /**
   * Instancia o `BankTransactionRepository` repassando o modelo de dados de transações bancárias (`bankTransactionModel`) para a classe base.
   */
  constructor() {
    super(bankTransactionModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Transações Bancárias pronta para uso na camada de serviços.
 * @type {BankTransactionRepository}
 */
export default new BankTransactionRepository();
