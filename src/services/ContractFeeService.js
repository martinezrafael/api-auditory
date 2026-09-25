import BaseService from "./BaseService.js";
import contractFeeRepository from "../database/repositories/ContractFeeRepository.js";

/**
 * Serviço responsável por gerenciar as regras de negócio associadas aos Contratos de Taxas.
 * Herda as funcionalidades genéricas de `BaseService` e aplica validações específicas para
 * integridade das faixas de parcelamento e métodos de pagamento.
 *
 * @class ContractFeeService
 * @extends {BaseService}
 */
class ContractFeeService extends BaseService {
  /**
   * Instancia o `ContractFeeService` injetando o repositório de contratos de taxas (`contractFeeRepository`).
   */
  constructor() {
    super(contractFeeRepository);
  }

  /**
   * Cria um novo contrato de taxas garantindo previamente que não existam inconsistências
   * no intervalo das parcelas ou sobreposições de faixas para o mesmo método de pagamento.
   *
   * @param {Object} data - Dados do contrato de taxas a ser cadastrado.
   * @param {string} data.company - ID da empresa contratante.
   * @param {string} data.acquirer - ID da adquirente/credenciadora.
   * @param {string} data.merchantId - Código de identificação do estabelecimento na adquirente.
   * @param {Array<Object>} [data.fees] - Lista de regras de taxas e parcelamentos.
   * @returns {Promise<Object>} Documento do contrato de taxas criado.
   * @throws {Error} Lança erro com status 400 se houver inconsistência nos intervalos de parcelas ou sobreposição de faixas.
   */
  async create(data) {
    const { fees } = data;

    if (fees && fees.length > 0) {
      this._validateFeeRules(fees);
    }

    return super.create(data);
  }

  /**
   * Valida internamente o conjunto de regras de taxas fornecido.
   * Verifica se a parcela mínima é menor ou igual à máxima e certifica-se de que não
   * haja faixas de parcelas concorrentes ou sobrepostas para o mesmo método de pagamento.
   *
   * @private
   * @param {Array<Object>} fees - Lista de regras de taxas a serem validadas.
   * @param {"CREDIT"|"DEBIT"|"VOUCHER"} fees[].paymentMethod - Método de pagamento da regra.
   * @param {number} fees[].minInstallments - Mínimo de parcelas da faixa.
   * @param {number} fees[].maxInstallments - Máximo de parcelas da faixa.
   * @param {number} fees[].agreedFeePercentage - Taxa percentual contratada.
   * @returns {void}
   * @throws {Error} Lança erro HTTP 400 se minInstallments > maxInstallments ou se houver intersecção de intervalos.
   */
  _validateFeeRules(fees) {
    const rulesByMethod = {};

    for (const rule of fees) {
      if (rule.minInstallments > rule.maxInstallments) {
        const error = new Error(
          `O mínimo de parcelas (${rule.minInstallments}) não pode ser maior que o máximo (${rule.maxInstallments}).`,
        );
        error.statusCode = 400;
        throw error;
      }

      const method = rule.paymentMethod;
      if (!rulesByMethod[method]) {
        rulesByMethod[method] = [];
      }

      // Checa sobreposição de faixas
      for (const existing of rulesByMethod[method]) {
        const hasOverlap =
          rule.minInstallments <= existing.maxInstallments &&
          rule.maxInstallments >= existing.minInstallments;

        if (hasOverlap) {
          const error = new Error(
            `Conflito de faixas de parcelamento para o método ${method}: ` +
              `[${rule.minInstallments}-${rule.maxInstallments}] sobrepõe [${existing.minInstallments}-${existing.maxInstallments}].`,
          );
          error.statusCode = 400;
          throw error;
        }
      }

      rulesByMethod[method].push(rule);
    }
  }
}

/**
 * Instância única (Singleton) do serviço de Contratos de Taxa pronta para ser utilizada pelos controllers.
 * @type {ContractFeeService}
 */
export default new ContractFeeService();
