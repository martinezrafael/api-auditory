import BaseRepository from "./BaseRepository.js";
import contractFeeModel from "../models/ContractFeeModel.js";

class ContractFeeRepository extends BaseRepository {
  constructor() {
    super(contractFeeModel);
  }

  /**
   * Sobrescreve o método de busca geral respeitando o soft delete e populando as referências.
   */
  async findAll() {
    return this.model
      .find({ isDeleted: { $ne: true } })
      .populate("company", "legalName documentNumber")
      .populate("acquirer", "acquirerName documentNumber");
  }

  /**
   * Localiza o contrato ativo e filtra com $elemMatch a regra de taxa correspondente.
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
   * Adiciona uma nova regra de taxa ao array de um contrato existente.
   */
  async addFeeRule(contractId, feeRule) {
    return this.model.findOneAndUpdate(
      { _id: contractId, isDeleted: { $ne: true } },
      { $push: { fees: feeRule } },
      { new: true, runValidators: true },
    );
  }

  /**
   * Remove uma regra específica do array de taxas.
   */
  async removeFeeRule(contractId, feeRuleId) {
    return this.model.findOneAndUpdate(
      { _id: contractId, isDeleted: { $ne: true } },
      { $pull: { fees: { _id: feeRuleId } } },
      { new: true },
    );
  }
}

export default new ContractFeeRepository();
