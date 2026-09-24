import BaseService from "./BaseService.js";
import cardAcquirerRepository from "../database/repositories/CardAcquirerRepository.js";

/**
 * Serviço responsável por conter as regras de negócio relativas à entidade de Adquirentes de Cartão.
 * Herda os métodos genéricos da camada de serviço (`BaseService`) e utiliza o `CardAcquirerRepository` para persistência.
 *
 * @class CardAcquirerService
 * @extends {BaseService}
 */
class CardAcquirerService extends BaseService {
  /**
   * Instancia o `CardAcquirerService` fornecendo o `cardAcquirerRepository` para a classe base.
   */
  constructor() {
    super(cardAcquirerRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Adquirentes de Cartão pronta para ser utilizada pelos controllers.
 * @type {CardAcquirerService}
 */
export default new CardAcquirerService();
