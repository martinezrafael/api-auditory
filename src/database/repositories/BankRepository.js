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

  /**
   * Busca um banco ativo (não marcado com soft delete) pelo número do CNPJ.
   *
   * @param {string} cnpj - Número do CNPJ a ser consultado (`documentNumber`).
   * @returns {Promise<import("mongoose").Document|null>} O documento do banco localizado ou null.
   */
  async findByCnpj(cnpj) {
    return this.model.findOne({
      documentNumber: cnpj,
      isDeleted: { $ne: true },
    });
  }

  /**
   * Busca um banco ativo (não marcado com soft delete) pelo código bancário.
   *
   * @param {string} bankCode - Código COMPE/ISPB do banco.
   * @returns {Promise<import("mongoose").Document|null>} O documento do banco localizado ou null.
   */
  async findByBankCode(bankCode) {
    return this.model.findOne({ bankCode: bankCode, isDeleted: { $ne: true } });
  }
}

/**
 * Instância única (Singleton) do repositório de Bancos pronta para uso na camada de serviços.
 * @type {BankRepository}
 */
export default new BankRepository();
