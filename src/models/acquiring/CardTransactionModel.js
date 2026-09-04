import mongoose from "mongoose";

const CardTransactionModel = new mongoose.Schema(
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
    settlement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "settlements",
      default: null,
    },
    transactionDate: {
      type: Date,
      required: [true, "O campo 'Data da transação' é obrigatório."],
    },
    grossAmount: {
      type: Number,
      required: [true, "O campo 'Valor bruto' é obrigatório."],
    },
    feePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa cobrada (%)' é obrigatório."],
    },
    expectedFeePercentage: {
      type: Number,
      required: [true, "O campo 'Taxa contratual esperada (%)' é obrigatório."],
    },
    netAmount: {
      type: Number,
      required: [true, "O campo 'Valor líquido cobrado' é obrigatório."],
    },
    expectedNetAmount: {
      type: Number,
      required: [true, "O campo 'Valor líquido esperado' é obrigatório."],
    },
    paymentMethod: {
      type: String,
      required: [true, "O campo 'Método de pagamento' é obrigatório."],
      trim: true,
      enum: {
        values: ["CREDIT", "DEBIT", "VOUCHER"],
        message: "O valor '{VALUE}' não é um método de pagamento válido.",
      },
    },
    installments: {
      type: Number,
      required: [true, "O campo 'Número de parcelas' é obrigatório."],
      default: 1,
    },
    authorizationCode: {
      type: String,
      required: [true, "O campo 'Código de autorização' é obrigatório."],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "O campo 'Status' é obrigatório."],
      trim: true,
      enum: {
        values: ["AUTHORIZED", "CAPTURED", "CANCELED", "CHARGEBACK"],
        message: "O valor '{VALUE}' não é um status de transação válido.",
      },
    },
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
