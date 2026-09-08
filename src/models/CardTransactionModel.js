import mongoose from "mongoose";

const CardTransactionModel = new mongoose.Schema(
  {
    // EMPRESA VINCULADA A TRANSAÇÃO
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: [true, "O campo 'Empresa' é obrigatório."],
    },
    // ADQUIRENTE VINCULADA A TRANSAÇÃO
    acquirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cardAcquirers",
      required: [true, "O campo 'Adquirente' é obrigatório."],
    },
    // REPASSE VINCULADO A TRANSAÇÃO
    settlement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "settlements",
      default: null,
    },
    // DATA DA TRANSAÇÃO
    transactionDate: {
      type: Date,
      required: [true, "O campo 'Data da transação' é obrigatório."],
    },
    // VALOR BRUTO DA TRANSAÇÃO (ANTES DE QUALQUER DEDUÇÃO)
    grossAmount: {
      type: Number,
      required: [true, "O campo 'Valor bruto' é obrigatório."],
    },
    // PERCENTUAL DE TAXA COBRADO PELA TRANSAÇÃO
    feePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa cobrada (%)' é obrigatório."],
    },
    // PERCENTUAL DE TAXA CONTRATADA
    expectedFeePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa contratual esperada (%)' é obrigatório."],
    },
    // VALOR LIQUIDO COBRADO DA TRANSAÇÃO (APÓS AS DEDUÇÕES)
    netAmount: {
      type: Number,
      required: [true, "O campo 'Valor líquido cobrado' é obrigatório."],
    },
    // VALOR LIQUIDO ESPERADO DA TRANSAÇÃO (COM BASE NA TAXA CONTRATADA)
    expectedNetAmount: {
      type: Number,
      required: [true, "O campo 'Valor líquido esperado' é obrigatório."],
    },
    // MÉTODO DE PAGAMENTO UTILIZADO NA TRANSAÇÃO
    paymentMethod: {
      type: String,
      required: [true, "O campo 'Método de pagamento' é obrigatório."],
      trim: true,
      enum: {
        values: ["CREDIT", "DEBIT", "VOUCHER"],
        message: "O valor '{VALUE}' não é um método de pagamento válido.",
      },
    },
    // QUANTIDADE DE PARCELAS DA TRANSAÇÃO
    installments: {
      type: Number,
      required: [true, "O campo 'Número de parcelas' é obrigatório."],
      default: 1,
    },
    // CÓDIGO DE AUTORIZAÇÃO DA OPERADORA
    authorizationCode: {
      type: String,
      required: [true, "O campo 'Código de autorização' é obrigatório."],
      trim: true,
    },
    // STATUS DA TRANSAÇÃO
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      trim: true,
      enum: {
        values: ["AUTHORIZED", "CAPTURED", "CANCELED", "CHARGEBACK"],
        message: "O valor '{VALUE}' não é um status de transação válido.",
      },
    },
    // STATUS DA TRANSAÇÃO NA AUDITORIA
    auditStatus: {
      type: String,
      required: [true, "O campo 'Status da auditoria' é obrigatório."],
      enum: {
        values: [
          "PENDING",
          "APPROVED",
          "DIVERGENT_FEE",
          "MISSING_SETTLEMENT",
          "MISSING_BANK_DEPOSIT",
        ],
        message: "O valor '{VALUE}' não é um status de auditoria válido.",
      },
      default: "PENDING",
    },
    // VALOR DA DIVERGÊNCIA APONTADO NA AUDITORIA
    discrepancyAmount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

const cardTransactionModel = mongoose.model(
  "cardTransactions",
  CardTransactionModel,
);

export default cardTransactionModel;
