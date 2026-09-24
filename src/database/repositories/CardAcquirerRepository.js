import BaseRepository from "./BaseRepository.js";
import cardAcquirerModel from "../models/CardAcquirerModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Adquirentes de Cartão.
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class CardAcquirerRepository
 * @extends {BaseRepository}
 */
class CardAcquirerRepository extends BaseRepository {
  /**
   * Instancia o `CardAcquirerRepository` repassando o modelo de dados de adquirentes (`cardAcquirerModel`) para a classe base.
   */
  constructor() {
    super(cardAcquirerModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Adquirentes de Cartão pronta para uso na camada de serviços.
 * @type {CardAcquirerRepository}
 */
export default new CardAcquirerRepository();
