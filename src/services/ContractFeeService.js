import BaseService from "./BaseService.js";
import contractFeeRepository from "../database/repositories/ContractFeeRepository.js";

class ContractFeeService extends BaseService {
  constructor() {
    super(contractFeeRepository);
  }

  /**
   * Cria um novo contrato garantindo que não haja sobreposição de parcelas nas taxas enviadas.
   */
  async create(data) {
    const { fees } = data;

    if (fees && fees.length > 0) {
      this._validateFeeRules(fees);
    }

    return super.create(data);
  }

  /**
   * Valida se existem regras concorrentes para o mesmo método de pagamento com parcelas sobrepostas.
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

export default new ContractFeeService();
