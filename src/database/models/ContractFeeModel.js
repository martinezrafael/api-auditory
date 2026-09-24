import mongoose from "mongoose";

/**
 * Subdocumento com a regra de taxa para uma faixa específica de parcelas.
 */
const FeeRuleSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      required: [true, "O campo 'Método de pagamento' é obrigatório."],
      enum: {
        values: ["CREDIT", "DEBIT", "VOUCHER"],
        message: "O valor '{VALUE}' não é um método de pagamento válido.",
      },
    },
    minInstallments: {
      type: Number,
      default: 1,
      min: [1, "O mínimo de parcelas deve ser no mínimo 1."],
    },
    maxInstallments: {
      type: Number,
      default: 1,
      min: [1, "O máximo de parcelas deve ser no mínimo 1."],
    },
    agreedFeePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa contratual (%)' é obrigatório."],
      min: [0, "A taxa percentual não pode ser negativa."],
    },
  },
  { _id: true },
);

/**
 * Esquema do Mongoose para o Contrato de Taxas (Credenciamento na Adquirente).
 */
const ContractFeeModel = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "O campo 'Adquirente' é obrigatório."],
    },
    merchantId: {
      type: String,
      required: [
        true,
        "O campo 'ID do comerciante (Merchant ID)' é obrigatório.",
      ],
      trim: true,
    },

    // Array com todas as regras de taxas do contrato
    fees: {
      type: [FeeRuleSchema],
      default: [],
    },

    // Soft Delete e Controle de Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

// Índice composto para evitar múltiplos contratos duplicados para o mesmo Merchant ID na mesma adquirente
ContractFeeModel.index(
  { company: 1, acquirer: 1, merchantId: 1 },
  { unique: true },
);

const contractFeeModel = mongoose.model("contractFees", ContractFeeModel);

export default contractFeeModel;
