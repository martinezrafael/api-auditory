import BaseRepository from "./BaseRepository.js";
import contractFeeModel from "../models/ContractFeeModel.js";

/**
 * Repositório responsável por manipular as operações de banco de dados da entidade Contrato de Taxas (`ContractFee`).
 * Herda os métodos genéricos de acesso a dados da classe `BaseRepository`.
 *
 * @class ContractFeeRepository
 * @extends {BaseRepository}
 */
class ContractFeeRepository extends BaseRepository {
  /**
   * Instancia o `ContractFeeRepository` repassando o modelo de dados de contrato de taxas (`contractFeeModel`) para a classe base.
   */
  constructor() {
    super(contractFeeModel);
  }

  /**
   * Sobrescreve o método de busca geral para retornar todos os contratos ativos (sem soft delete),
   * populando as informações resumidas da empresa e da adquirente associadas.
   *
   * @returns {Promise<Array<import("mongoose").Document>>} Lista de contratos com dados de empresa e adquirente populados.
   */
  async findAll() {
    return this.model
      .find({ isDeleted: { $ne: true } })
      .populate("company", "legalName documentNumber")
      .populate("acquirer", "acquirerName documentNumber");
  }

  /**
   * Localiza um contrato de taxas ativo e retorna especificamente a regra de taxa aplicável
   * com base nas condições da transação (empresa, adquirente, merchantId, método de pagamento e quantidade de parcelas).
   *
   * Utiliza a projeção `fees.$` para retornar apenas o subdocumento de taxa correspondente.
   *
   * @param {Object} params - Parâmetros para localização da taxa aplicável.
   * @param {string|import("mongoose").Types.ObjectId} params.companyId - ID da empresa.
   * @param {string|import("mongoose").Types.ObjectId} params.acquirerId - ID da adquirente.
   * @param {string} [params.merchantId] - Código do estabelecimento (Merchant ID) na adquirente.
   * @param {"CREDIT"|"DEBIT"|"VOUCHER"} params.paymentMethod - Método de pagamento da transação.
   * @param {number} [params.installmentsCount=1] - Quantidade de parcelas da transação.
   * @returns {Promise<import("mongoose").Document|null>} Contrato contendo apenas a regra de taxa correspondente em `fees[0]`, ou `null` caso nenhuma taxa atenda aos critérios.
   */
  async findApplicableFee({
    companyId,
    acquirerId,
    merchantId,
    paymentMethod,
    installmentsCount = 1,
  }) {
    const query = {
      company: companyId,
      acquirer: acquirerId,
      isDeleted: { $ne: true },
      isActive: true,
      fees: {
        $elemMatch: {
          paymentMethod: paymentMethod,
          minInstallments: { $lte: installmentsCount },
          maxInstallments: { $gte: installmentsCount },
        },
      },
    };

    if (merchantId) {
      query.merchantId = merchantId;
    }

    return this.model.findOne(query, {
      _id: 1,
      company: 1,
      acquirer: 1,
      merchantId: 1,
      "fees.$": 1, // Traz apenas o subdocumento que casou com a busca
    });
  }

  /**
   * Adiciona uma nova regra de taxa ao array `fees` de um contrato existente.
   *
   * @param {string|import("mongoose").Types.ObjectId} contractId - ID do contrato de taxas.
   * @param {Object} feeRule - Objeto contendo os dados da nova regra de taxa.
   * @param {"CREDIT"|"DEBIT"|"VOUCHER"} feeRule.paymentMethod - Método de pagamento.
   * @param {number} [feeRule.minInstallments] - Quantidade mínima de parcelas.
   * @param {number} [feeRule.maxInstallments] - Quantidade máxima de parcelas.
   * @param {number} feeRule.agreedFeePercentage - Taxa percentual contratada.
   * @returns {Promise<import("mongoose").Document|null>} O documento do contrato atualizado ou `null` se não localizado.
   */
  async addFeeRule(contractId, feeRule) {
    return this.model.findOneAndUpdate(
      { _id: contractId, isDeleted: { $ne: true } },
      { $push: { fees: feeRule } },
      { new: true, runValidators: true },
    );
  }

  /**
   * Remove uma regra específica do array `fees` do contrato pelo seu sub-ID (`_id`).
   *
   * @param {string|import("mongoose").Types.ObjectId} contractId - ID do contrato de taxas.
   * @param {string|import("mongoose").Types.ObjectId} feeRuleId - ID da regra de taxa a ser removida.
   * @returns {Promise<import("mongoose").Document|null>} O documento do contrato atualizado ou `null` se não localizado.
   */
  async removeFeeRule(contractId, feeRuleId) {
    return this.model.findOneAndUpdate(
      { _id: contractId, isDeleted: { $ne: true } },
      { $pull: { fees: { _id: feeRuleId } } },
      { new: true },
    );
  }
}

/**
 * Instância única (Singleton) do repositório de Contratos de Taxa pronta para uso na camada de serviços.
 * @type {ContractFeeRepository}
 */
export default new ContractFeeRepository();
