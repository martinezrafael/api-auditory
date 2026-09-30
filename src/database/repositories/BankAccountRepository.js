import BaseRepository from "./BaseRepository.js";
import bankAccountModel from "../models/BankAccountModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Conta Bancária (`BankAccount`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class BankAccountRepository
 * @extends {BaseRepository}
 */
class BankAccountRepository extends BaseRepository {
  /**
   * Instancia o `BankAccountRepository` repassando o modelo de dados de contas bancárias (`bankAccountModel`) para a classe base.
   */
  constructor() {
    super(bankAccountModel);
  }

  async findByBankId(bankId) {
    return this.model.find({
      bank: bankId,
      isDeleted: { $ne: true },
    });
  }

  async findByBankIdAndAccountId(bankId, accountId) {
    return this.model.findOne({
      _id: accountId,
      bank: bankId,
      isDeleted: { $ne: true },
    });
  }

  async findOneByBank(bankId, criteria = {}) {
    return this.model.findOne({
      bank: bankId,
      isDeleted: { $ne: true },
      ...criteria,
    });
  }
}

/**
 * Instância única (Singleton) do repositório de Contas Bancárias pronta para uso na camada de serviços.
 * @type {BankAccountRepository}
 */
export default new BankAccountRepository();
