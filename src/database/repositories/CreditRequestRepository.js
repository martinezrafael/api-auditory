import BaseRepository from "./BaseRepository.js";
import creditRequestModel from "../models/CreditRequestModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Solicitação de Crédito (`CreditRequest`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class CreditRequestRepository
 * @extends {BaseRepository}
 */
class CreditRequestRepository extends BaseRepository {
  /**
   * Instancia o `CreditRequestRepository` repassando o modelo de dados de solicitações de crédito (`creditRequestModel`) para a classe base.
   */
  constructor() {
    super(creditRequestModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Solicitações de Crédito pronta para uso na camada de serviços.
 * @type {CreditRequestRepository}
 */
export default new CreditRequestRepository();
