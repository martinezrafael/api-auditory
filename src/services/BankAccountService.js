import BaseService from "./BaseService.js";
import bankAccountRepository from "../database/repositories/BankAccountRepository.js";

/**
 * Serviço responsável por conter as regras de negócio relativas às Contas Bancárias.
 * Herda os métodos genéricos da camada de serviço (`BaseService`) e utiliza o `BankAccountRepository` para persistência.
 *
 * @class BankAccountService
 * @extends {BaseService}
 */
class BankAccountService extends BaseService {
  /**
   * Instancia o `BankAccountService` fornecendo o `bankAccountRepository` para a classe base.
   */
  constructor() {
    super(bankAccountRepository);
  }
}

/**
 * Instância única (Singleton) do serviço de Contas Bancárias pronta para ser utilizada pelos controllers.
 * @type {BankAccountService}
 */
export default new BankAccountService();
