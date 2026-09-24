import BaseRepository from "./BaseRepository.js";
import bankModel from "../models/BankModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Bancos.
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class BankRepository
 * @extends {BaseRepository}
 */
class BankRepository extends BaseRepository {
  /**
   * Instancia o `BankRepository` repassando o modelo de dados de banco (`bankModel`) para a classe base.
   */
  constructor() {
    super(bankModel);
  }

  async findByCnpj(cnpj) {
    return this.model.findOne({ documentNumber: cnpj });
  }

  async findByBankCode(bankCode) {
    return this.model.findOne({ bankCode: bankCode });
  }
}

/**
 * Instância única (Singleton) do repositório de Bancos pronta para uso na camada de serviços.
 * @type {BankRepository}
 */
export default new BankRepository();
