import BaseRepository from "./BaseRepository.js";
import settlementModel from "../models/SettlementModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Liquidação Financeira (`Settlement`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class SettlementRepository
 * @extends {BaseRepository}
 */
class SettlementRepository extends BaseRepository {
  /**
   * Instancia o `SettlementRepository` repassando o modelo de dados de liquidações financeiras (`settlementModel`) para a classe base.
   */
  constructor() {
    super(settlementModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Liquidações Financeiras pronta para uso na camada de serviços.
 * @type {SettlementRepository}
 */
export default new SettlementRepository();
