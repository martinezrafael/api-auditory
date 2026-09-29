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
   * Busca todos os bancos ativos vinculados a uma determinada empresa.
   *
   * @async
   * @param {string|import("mongoose").Types.ObjectId} companyId - Identificador único da empresa.
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de documentos de usuários vinculados à empresa.
   */
  async findByCompanyId(companyId) {
    return this.model.find({
      company: companyId,
      isDeleted: { $ne: true },
    });
  }

  /**
   * Busca um banco ativo vinculado a uma empresa com base em um critério específico.
   *
   * @param {string|import("mongoose").Types.ObjectId} companyId - ID da empresa.
   * @param {Object} criteria - Critérios adicionais de busca (ex: bankCode, documentNumber).
   * @returns {Promise<import("mongoose").Document|null>}
   */
  async findOneByCompany(companyId) {
    return this.model.findOne({
      company: companyId,
      isDeleted: { $ne: true },
    });
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
