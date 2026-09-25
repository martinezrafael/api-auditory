import BaseRepository from "./BaseRepository.js";
import creditOfferModel from "../models/CreditOfferModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Oferta de Crédito (`CreditOffer`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class CreditOfferRepository
 * @extends {BaseRepository}
 */
class CreditOfferRepository extends BaseRepository {
  /**
   * Instancia o `CreditOfferRepository` repassando o modelo de dados de ofertas de crédito (`creditOfferModel`) para a classe base.
   */
  constructor() {
    super(creditOfferModel);
  }
}

/**
 * Instância única (Singleton) do repositório de Ofertas de Crédito pronta para uso na camada de serviços.
 * @type {CreditOfferRepository}
 */
export default new CreditOfferRepository();
